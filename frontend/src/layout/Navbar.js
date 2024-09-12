import { useNavigate } from 'react-router-dom';

export default function Navbar({ username }) {
    const navigate = useNavigate();

    return (
        <nav className='navbar'>
            {username ? (
                <>
                <button onClick={() => navigate('/')}>Home</button>
                <button onClick={() => navigate('/posts')}>Post</button>
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
