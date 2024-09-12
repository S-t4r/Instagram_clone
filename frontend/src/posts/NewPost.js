import { useState } from 'react';
import getCSRFToken from '../utils';
import { useCustomNavigate } from '../utils';

export default function NewPost() {
    const [formData, setFormData] = useState({ image: null, caption: '' });
    const customNavigate = useCustomNavigate();

    const handleChange = (event) => {
        const { name, value, files } = event.target;
    
        if (name === 'image' && files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({ ...prevData, imagePreview: reader.result, image: files[0] }));
            };
            reader.readAsDataURL(files[0]);
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Create a Form
        const formPayLoad = new FormData();
        formPayLoad.append('image', formData.image);
        formPayLoad.append('caption', formData.caption);
        
        const csrfToken = getCSRFToken();

        fetch('/posts/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken
            },
            body: formPayLoad,
        })
        .then(() => {
            // Fetch messages after form submission
            return fetch('/api/get_messages');
        })
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                alert(data[0].message);
            }
            else {
                customNavigate('/users/profile')
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input 
                type="file"
                name="image"
                onChange={handleChange}
                required
            />
            {formData.imagePreview && <img src={formData.imagePreview} alt="Selected" className='post-image' />}
            <textarea
                name='caption'
                placeholder='Caption'
                onChange={handleChange}
            />
            <button type='submit'>Submit Post</button>
        </form>   
    )
}