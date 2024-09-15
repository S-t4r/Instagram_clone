import React, { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostObject from '../posts/PostObject';
import ProfileDetails from './ProfileDetails';
import './UserProfile.css'

export default function UserProfile() {
    const navigate = useNavigate();

    const { username } = useParams();
    const [loggedInUser, setLoggedInUser] = useState({ username: '', followings: [] });

    // Set Logged in user
    useEffect(() => {
        fetch('/api/get_user_data')
            .then(response => response.json())
            .then(data => {
                setLoggedInUser(data);
            });
    }, []);

    return (
        <div className='user-profile'>
            <ProfileDetails username={username} loggedInUser={loggedInUser} />
            <div>
                <PostObject />
            </div>
        </div>
    );
}