import { useState, useEffect } from 'react';
import getCSRFToken from '../utils'

const Follow = ({ username, loggedInUser, onFollowChange }) => {

    // Check if already following
    const [isFollowing, setIsFollowing] = useState(false);
    useEffect(() => {
        if (loggedInUser && loggedInUser.following) {
            setIsFollowing(loggedInUser.following.includes(username));
        }
    }, [loggedInUser, username]);


    const onFollow = () => {
        const csrfToken = getCSRFToken();
        const formData = new FormData();
        formData.append('username', username);

        fetch('/users/follow', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
            },
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            setIsFollowing(prevState => !prevState);
            onFollowChange(data.followers_count);
        });
    }

    return (
        <button onClick={() => onFollow()}>
            {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
    );

};

export default Follow;