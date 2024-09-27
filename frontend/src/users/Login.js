import React, { useState } from 'react'
import { useCustomNavigate } from '../utils';
import getCSRFToken from '../utils';
import { useUser } from '../userContext/UserContext';
import './Register.css'
import { useNavigate } from 'react-router-dom';

export default function Login({ setHeaderKey }) {
    const navigate = useNavigate();
     // Form object to send to view
     const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const customNavigate = useCustomNavigate();
    const { setUser } = useUser();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add logic to send data to users/login view
        const formDataToSubmit = new FormData();

        for (const key in formData) {
            formDataToSubmit.append(key, formData[key]);
        }

        const csrfToken = getCSRFToken();
    
        fetch('/users/login', {
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
                customNavigate(`/users/${username}`);
                setHeaderKey(prevKey =>  prevKey + 1); // re-render the Header
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
        <a href="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/users/register`); }}>Don't have an account?</a>
      </form>
    );
}