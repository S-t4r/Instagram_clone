import React, { useState } from 'react'
import getCSRFToken from '../utils';
import './Register.css'

export default function Login() {
     // Form object to send to view
     const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

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
        const username = event.target['username'].value;
        const password = event.target['password'].value;
    
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        const csrfToken = getCSRFToken();
    
        fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': csrfToken
            },
            body: formData.toString()
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
                window.location.href = '/users/';
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
        <a href="register">Don't have an account?</a>
      </form>
    );
}