import getCSRFToken from '../utils';
import { useCustomNavigate } from '../utils';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../userContext/UserContext';

export default function Header({ setHeaderKey, username }) {
    const { user, setUser } = useUser();
    const customNavigate = useCustomNavigate();
    // Logout
    function logout(event) {
        event.preventDefault();
        

        const csrfToken = getCSRFToken();
        
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
                setUser({ username:null })
                customNavigate('/');
                setHeaderKey(prevKey =>  prevKey + 1); // re-render the Header
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
            {username ? (
            <>
                <h2>
                    <Link to='/users/profile'>
                        {username}
                    </Link>
                </h2>
                <button>Direct</button>
                <button onClick={logout}>Logout</button>
            </>
            ) : (
             <>
             <h2>Welcome</h2>
             <button onClick={() => navigate('/users/login')}>Login</button>
             <button onClick={() => navigate('/users/register')}>Register</button>
             </>
            )}
        </header>
    );
}