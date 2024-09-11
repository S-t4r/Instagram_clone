import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css'

export default function UserProfile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null)
    useEffect(() => {
        fetch('/users/profile')
        .then(response => response.json())
        .then(data => {
            setUser(data);
        });
    }, []);
    
    
    if (!user) {
        return (
            <>
                LOADING...
            </>
        )
    }

    
    return (
        <div className='user-profile'>
            <div>
                <img src={user.profile_image}/>
                <h1>{user.username}</h1>
                <p>{user.bio}</p>
            </div>
            <div className='profile-details'>
                <p><span>0</span>Posts</p>
                <p><span>0</span>Followers</p>
                <p><span>0</span>Followings</p>
            </div>
            <div>
                <button onClick={() => navigate('/users/edit')}>Edit Profile</button>
                <button onClick={() => navigate('/users/share')}>Share Profile</button>
            </div>
        </div>
    )
}