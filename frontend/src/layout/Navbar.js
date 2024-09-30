import { useNavigate } from 'react-router-dom';

export default function Navbar({ username }) {
    const navigate = useNavigate();

    return (
        <nav className='navbar'>
            {username ? (
                <>
                <button onClick={() => navigate('/')}><i className="fa fa-home"></i></button>
                <button onClick={() => navigate('/posts')}><i className="fa fa-plus"></i></button>
                <button onClick={() => navigate('/search')}><i className="fa fa-search"></i></button>
                <button onClick={() => navigate(`/users/${username}`)}><i className="fa fa-user"></i></button>
                </>
            ) : (
                <>
                    <button><i className="fa fa-home"></i></button>
                    <button><i className="fa fa-plus"></i></button>
                    <button><i className="fa fa-search"></i></button>
                    <button><i className="fa fa-user"></i></button>    
                </>
            )}
        </nav>
    )
}
