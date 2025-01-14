import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';

export default function Register() {
    // Form object to send to view
    const [formData, setFormData] = useState({});

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

    // TODO
    const handleSubmit = (event) => {
        event.preventDefault();
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
            {imagePreview && <Image src={imagePreview} alt="Selected" className='register-image' width={100} height={100} />}
            <button type="submit">Register</button>
            <Link href="/login">Already have an account?</Link>
        </form>  
    );
}