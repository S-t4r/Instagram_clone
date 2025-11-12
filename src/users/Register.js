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
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                required
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete='off'
            />
          </div>
          <div className="name-fields-container">
            <div className="input-container">
              <label htmlFor="first_name">First name (optional)</label>
              <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="Enter your first name"
                  value={formData.first_name}
                  onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="last_name">Last name (optional)</label>
              <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="Enter your last name"
                  value={formData.last_name}
                  onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter a password"
                value={formData.password}
                onChange={handleChange}
                required
            />
          </div>
          <div className="input-container">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
            />
          </div>
          <div className="input-container">
            <label htmlFor="image">Profile picture (optional)</label>
            <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
            />
          </div>
          {imagePreview && <img src={imagePreview} alt="Selected" className='post-image' />}
          <button type="submit">Create account</button>
          <a href="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/users/login`); }}>Sign in instead</a>
        </form>
      </div>
    );
}