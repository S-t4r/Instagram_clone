import React, { useState } from 'react'
import { useCustomNavigate } from '../utils';
import getCSRFToken from '../utils'
import { useUser } from '../userContext/UserContext';
import './Register.css'
import '../posts/Posts.css'

export default function Register({ setHeaderKey }) {
    // Form object to send to view
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const customNavigate = useCustomNavigate();
    const { user, setUser } = useUser();


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Image
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setImagePreview(URL.createObjectURL(selectedFile))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const email = event.target['email'].value;
        const username = event.target['username'].value;
        const password = event.target['password'].value;
        const confirmPassword = event.target['confirmPassword'].value;
    
        const formData = new FormData();
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('image', file);
    
        const csrfToken = getCSRFToken();
        
        fetch('/users/register', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken
            },
            body: formData,
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
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
        />
        <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
        />
        <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
        />
        <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
        />
        <input
            type="file"
            name="image"
            onChange={handleFileChange}
        />
        {imagePreview && <img src={imagePreview} alt="Selected" className='post-image' />}
        <button type="submit">Register</button>
        <a href="login">Already have an account?</a>
      </form>  
    );
}