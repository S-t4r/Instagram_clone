import React, { useState } from 'react'
import './Register.css'
import getCSRFToken from '../utils'

export default function Register() {
    // Form object to send to view
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
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
    
        const email = event.target['email'].value;
        const username = event.target['username'].value;
        const password = event.target['password'].value;
        const confirmPassword = event.target['confirmPassword'].value;
    
        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
    
        const csrfToken = getCSRFToken();
        
        fetch('/users/register', {
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
                window.location.href = ('/users/')
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Register</button>
        <a href="login">Already have an account?</a>
      </form>  
    );
}