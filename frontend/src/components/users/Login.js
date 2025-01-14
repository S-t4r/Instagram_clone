import Link from 'next/link';
import React, { useState } from 'react'
import { useWebSocketRequest } from '../utils/WebSocketRequest';

export default function Login() {
     // Form object to send to view
    const [formData, setFormData] = useState({});
    const sendWebSocketRequest = useWebSocketRequest();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // TODO
    const handleSubmit = (event) => {
        event.preventDefault();
        const formDataToSubmit = new FormData();

        for (const key in formData) {
            formDataToSubmit.append(key, formData[key]);
        }
        // Appending endpoint
        formDataToSubmit.append('endpoint', '/users/login');
    
        const requestData = Object.fromEntries(formDataToSubmit);

        sendWebSocketRequest({
            data: requestData,
            onResponse: (response) => {
                console.log('Server response:', response);
            }
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
        <Link href="/register">Don't have an account?</Link>
    </form>
    );
}