import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Follow from './Follow';
import ProfileStats from './ProfileStats';
import Message from './Message';

const ProfileDetails = ({ username, loggedInUser }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    

    // Get user profile data
    useEffect(() => {
        fetch(`/users/${username}/`)
            .then(response => response.json())
            .then(data => {
                setUser(data);
            });
    }, [username]);

    if (!user) {
        return <div>Loading...</div>;
    }

    const handleFollowChange = (newCount) => {
        user.followers_count = newCount;
        setUser({ ...user })
    };
    
    return (
        <div>
            <div>
                <img 
                    src={user.profile_image} 
                    className='profile-image' 
                    alt={`${user.username}'s profile`}
                />
                <h1>{user.username}</h1>
                <small>{user.first_name} {user.last_name}</small>
                <p>{user.bio}</p>
            </div>
            <ProfileStats 
                postsCount={user.posts_count} 
                followersCount={user.followers_count} 
                followingsCount={user.followings_count} 
            />
            <div>
                {user.username === loggedInUser.username && (
                    <button onClick={() => navigate(`/users/${username}/edit/`)}>Edit Profile</button>
                )}
                {user.username !== loggedInUser.username && (
                    <>
                        <Follow 
                            username={user.username} 
                            loggedInUser={loggedInUser}
                            onFollowChange={handleFollowChange}
                        />
                        <Message username={user.username} />
                    </>
                )}
                <button onClick={() => navigate(`/users/${username}/share/`)}>Share Profile</button>
            </div>
        </div>
    );
};

export default ProfileDetails;