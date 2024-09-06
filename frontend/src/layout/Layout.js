import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import getCSRFToken from '../utils';
import { useUser } from '../userContext/UserContext';
import './Layout.css'

export default function Layout({ children }) {
    const { user, setUser } = useUser();

    useEffect(() => {
        fetch('/api/get_user_data')
            .then(response => response.json())
            .then(data => {
                setUser(data);
            });
    }, [setUser]);

    useEffect(() => {
        fetch('http://localhost:8000/api/send_csrf')
            .then(response => response.json())
            .then(data => {
                document.cookie = `csrftoken=${data.csrfToken}; path=/`;
            });
    }, []);

    return (
        <div>
            <header className='header'>
                <Header username={user ? user.username : ''}/>
            </header>
            <main className='main'>
                {children}
            </main>
            <footer className="footer">
                <Navbar username={user ? user.username : ''} />
            </footer>
        </div>
    );
}

function Navbar({ username }) {
    const navigate = useNavigate();

    return (
        <nav className='navbar'>
            {username ? (
                <>
                <button onClick={() => navigate('/')}>Home</button>
                <button onClick={() => navigate('/post')}>Post</button>
                <button onClick={() => navigate('/search')}>Search</button>
                <button onClick={() => navigate('/users/profile')}>Profile</button>
                </>
            ) : (
                <>
                    <button>Home</button>
                    <button>Post</button>
                    <button>Search</button>
                    <button>Profile</button>    
                </>
            )}
        </nav>
    )
}

function Header({ username }) {
    // Logout
    function logout(event) {
        event.preventDefault()

        const csrfToken = getCSRFToken()
        
        fetch('/users/logout', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/x-www-form-urlencoded',
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
                window.location.href = ('/')
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    const navigate = useNavigate();
    return (
        <header className='header-secondary'>
            <h1>Instagram Clone</h1>
            <h3>Welcome, {username}</h3>
            {username ? (
            <>
                <button>Direct</button>
                <button onClick={logout}>Logout</button>
            </>
            ) : (
             <>
             <button onClick={() => navigate('/users/login')}>Login</button>
             <button onClick={() => navigate('/users/register')}>Register</button>
             </>
            )}
        </header>
    );
}