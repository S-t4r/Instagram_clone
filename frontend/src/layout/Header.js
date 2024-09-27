import getCSRFToken from '../utils';
import { useCustomNavigate } from '../utils';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../userContext/UserContext';
import { useState, useEffect } from 'react';

export default function Header({ username }) {
    const { setUser } = useUser();
    const customNavigate = useCustomNavigate();
    // Logout
    function logout(event) {
        event.preventDefault();
        

        const csrfToken = getCSRFToken();
        
        fetch('/users/logout', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
            },
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
                setUser({ username:null })
                customNavigate('/');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
    // Fetch notifications and alert user every 60 seconds
    const [notificationCount, setNotificationCount] = useState(0);
    useEffect(() => {
        if (username) {
            
            const interval = setInterval(() => {
                fetch("/notifications/notifications_count")
                    .then(response => response.json())
                    .then(data => {
                        setNotificationCount(data.unread_count);
                    });
            }, 60000);
            return () => clearInterval(interval); // Cleanup on unmount
        }
    }, [username]);
    
    const navigate = useNavigate();    
    return (
        <header className='header-secondary'>
            <h1>Instagram</h1>
            {username ? (
            <>
                <h1>
                    <Link to={`/users/${username}/`}>
                        {username}
                    </Link>
                </h1>
                <button onClick={() => navigate('/direct_messages')}><i className="fa fa-envelope"></i></button>
                <button onClick={() => { setNotificationCount(0); navigate('/notifications'); }}>
                    <i className="fa fa-bell" style={notificationCount > 0 ? { color: 'red' } : {}}>
                    </i>
                </button>
                <button onClick={logout}>Logout</button>
            </>
            ) : (
             <>
             <h1>Welcome</h1>
             <button onClick={() => navigate('/users/login')}>Login</button>
             <button onClick={() => navigate('/users/register')}>Register</button>
             </>
            )}
        </header>
    );
}