import React, { useEffect} from 'react';
import { useUser } from '../userContext/UserContext';
import './Layout.css'
import Header from './Header';
import Navbar from './Navbar';

export default function Layout({ headerKey, children }) {
    
    const { user } = useUser();

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
                <Header key={headerKey} username={user ? user.username : ''} />
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