import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Search.css';

export default function Search() {
    const [searchUser, setSearchUser] = useState('');
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (searchUser) {
            fetch(`/search/?query=${searchUser}`)
                .then(response => response.json())
                .then(data => {  
                    setUserList(data.results);
                });
        } else {
            setUserList([]);
        }
    }, [searchUser]);

    const handleSearch = (event) => {
        setSearchUser(event.target.value);   
    }

    return (
        <div className="search">
            <input 
                type="text"
                placeholder="Search for Users"
                value={searchUser}
                onChange={handleSearch}
                autoFocus
            />
            <ul>
                {userList.map((user, index) => (
                    <li key={index} className="search-link">
                        <a href="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/users/${user.username}`); }}>
                            <img
                                src={`${user.profile_image_url}`}
                                alt={`${user.username}'s profile`}
                                className="search-profile-image"
                            />
                        </a>
                        <a href="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/users/${user.username}`); }}>{user.username}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}