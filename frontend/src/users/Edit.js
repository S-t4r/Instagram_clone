import { useState, useEffect } from 'react'
import { useCustomNavigate } from '../utils';
import getCSRFToken from '../utils';

export default function Edit() {
    const [formData, setFormData] = useState({ bio: '', image: null });
    const customNavigate = useCustomNavigate();

    useEffect(() => {
        fetch('/users/profile')
        .then(response => response.json())
        .then(data => {
            setFormData({ bio: data.bio, image:null })
        });
    }, []);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Create a Form
        const formPayLoad = new FormData();
        formPayLoad.append('image', formData.image);
        formPayLoad.append('bio', formData.bio);
        
        const csrfToken = getCSRFToken();

        fetch('/users/profile', {
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
        <form onSubmit={handleSubmit}>
            <input type='file' name='image' onChange={handleChange} />
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