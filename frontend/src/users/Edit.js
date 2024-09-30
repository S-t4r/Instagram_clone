import { useState, useEffect } from 'react'
import { useCustomNavigate } from '../utils';
import getCSRFToken from '../utils';
import { useParams } from 'react-router-dom';
import '../posts/Posts.css'

export default function Edit() {
    const [formData, setFormData] = useState({ 
        first_name: '',
        last_name: '',
        bio: '',
        image: null,
    });

    const customNavigate = useCustomNavigate();
    const { username } = useParams();

    // Get user info
    useEffect(() => {
        fetch(`/users/${username}`)
        .then(response => response.json())
        .then(data => {
            setFormData({ 
                first_name: data.first_name,
                last_name: data.last_name,
                bio: data.bio,
                image:null,
            });
        });
    }, [username]);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
    
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'image' && files[0] ? files[0] : value,
            ...(name === 'image' && files[0] && { imagePreview: URL.createObjectURL(files[0]) })
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Create a Form
        const formPayLoadToSubmit = new FormData();

        for (const key in formData) {
            formPayLoadToSubmit.append(key, formData[key]);
        }

        const csrfToken = getCSRFToken();
        

        // Edit user info
        fetch(`/users/${username}/edit/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken
            },
            body: formPayLoadToSubmit,
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
            <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
            />
            <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
            />
            <textarea
                name='bio'
                placeholder='Bio'
                value={formData.bio}
                onChange={handleChange}
            />
            <div className='edit-button'>
                <button type='submit'>Submit Changes</button>
                <button type='button' onClick={() => customNavigate(`/users/${username}/`)}>Cancel</button>
            </div>
        </form>
    );
}