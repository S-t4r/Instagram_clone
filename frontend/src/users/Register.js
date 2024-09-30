import React, { useState } from 'react'
import { useCustomNavigate } from '../utils';
import getCSRFToken from '../utils'
import { useUser } from '../userContext/UserContext';
import './Register.css'
import '../posts/Posts.css'
import { useNavigate } from 'react-router-dom';

export default function Register({ setHeaderKey }) {
    const navigate = useNavigate();
    // Form object to send to view
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        first_name: '',
        last_name: '',
        password: '',
        confirmPassword: '',
        image: null,
    });
    const customNavigate = useCustomNavigate();
    const { setUser } = useUser();

    // Image preview
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (files) {
            const selectedFile = files[0];
            setFormData({
                ...formData,
                [name]: selectedFile,
            });
            setImagePreview(URL.createObjectURL(selectedFile));
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formDataToSubmit = new FormData();
        
        for (const key in formData) {
            formDataToSubmit.append(key, formData[key]);
        }
    
        const csrfToken = getCSRFToken();
        
        fetch('/users/register', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken
            },
            body: formDataToSubmit,
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
                const username = formData.username
                setUser({ username })
                customNavigate(`/users/${username}/`)
                setHeaderKey(prevKey =>  prevKey + 1); // re-render the Header
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
          />
        <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete='off'
        />
        <input
            type="text"
            name="first_name"
            placeholder="First Name(opt)"
            value={formData.first_name}
            onChange={handleChange}
        />
        <input
            type="text"
            name="last_name"
            placeholder="Last Name(opt)"
            value={formData.last_name}
            onChange={handleChange}
        />
        <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
        />
        <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
        />
        <input
            type="file"
            name="image"
            onChange={handleChange}
        />
        {imagePreview && <img src={imagePreview} alt="Selected" className='post-image' />}
        <button type="submit">Register</button>
        <a href="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/users/login`); }}>Already have an account?</a>
      </form>  
    );
}