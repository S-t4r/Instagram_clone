import React, { useState, useEffect} from 'react';

export default function UserProfile() {
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
        <>
            <div>
                <img/>
                <h1>{user.username}</h1>
            </div>
            <div>
                <p>Posts: 0</p>
                <p>Followers: 0</p>
                <p>Followings: 0</p>
            </div>
            <button>edit</button>
            
        </>
    )
}