import React, { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostObject from '../posts/PostObject';
import './UserProfile.css'

export default function UserProfile() {
    const navigate = useNavigate();

    const { username } = useParams();
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [user, setUser] = useState(null);

    // Profile user
    useEffect(() => {
        fetch(`/users/${username}/`)
        .then(response => response.json())
        .then(data => {
            setUser(data);
        });
    }, [username]);

    // Set Logged in user
    useEffect(() => {
        fetch('/api/get_user_data')
            .then(response => response.json())
            .then(data => {
                setLoggedInUser(data.username);
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
                <img src={user.profile_image} className='profile-image' />
                <h1>{user.username}</h1>
                <p>{user.bio}</p>
            </div>
            <div className='profile-details'>
                <p><span>0</span>Posts</p>
                <p><span>0</span>Followers</p>
                <p><span>0</span>Followings</p>
            </div>
            <div>
                {user.username === loggedInUser && (
                    <button onClick={() => navigate(`/users/${username}/edit/`)}>Edit Profile</button>
                )}
                <button onClick={() => navigate(`/users/${username}/share`)}>Share Profile</button>
            </div>
            <div>
                <PostObject />
            </div>
        </div>
    )
}