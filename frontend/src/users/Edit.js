import { useState, useEffect } from 'react'
import { useCustomNavigate } from '../utils';
import getCSRFToken from '../utils';
import { useParams } from 'react-router-dom';
import '../posts/Posts.css'

export default function Edit() {
    const [formData, setFormData] = useState({ bio: '', image: null });
    const customNavigate = useCustomNavigate();
    const { username } = useParams();

    // Get user info
    useEffect(() => {
        fetch(`/users/${username}`)
        .then(response => response.json())
        .then(data => {
            setFormData({ bio: data.bio, image:null })
        });
    }, [username]);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
    
        if (name === 'image' && files[0]) {
            const imageUrl = URL.createObjectURL(files[0]);
            setFormData((prevData) => ({
                ...prevData,
                imagePreview: imageUrl,
                image: files[0]
            }));
        } 
        else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Create a Form
        const formPayLoad = new FormData();
        formPayLoad.append('image', formData.image);
        formPayLoad.append('bio', formData.bio);
        
        const csrfToken = getCSRFToken();
        

        // Edit user info
        fetch(`/users/${username}/edit/`, {
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
                customNavigate(`/users/${username}/`)
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" name="image" onChange={handleChange} />
            {formData.imagePreview && <img src={formData.imagePreview} alt="Selected" className='post-image' />}
            <textarea
                name='bio'
                placeholder='Bio'
                value={formData.bio}
                onChange={handleChange}
            />
            <button type='submit'>Submit Changes</button>
        </form>
    );
}