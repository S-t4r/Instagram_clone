import { useEffect, useState } from "react";
import { calcTime } from "../utils";
import { useNavigate } from "react-router-dom";
import './ChatList.css'

export default function ChatList() {
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/direct_messages/')
        .then(response => response.json())
        .then(data => {
            setChats(data)
        })
    }, []);
    
    
    return (
        <div className="chat-container">
            {chats.map((chat, index) => (
                <div 
                    key={index} 
                    className="chat-listing" 
                    onClick={() => navigate(`/direct_messages/${chat.other_user}`)}
                >
                    <h2>
                    <a href="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/users/${chat.other_user}`); }}>
                        {chat.other_user}
                    </a>
                    </h2>
                    <p>{chat.last_message}</p>
                    <sub>{calcTime({ timestamp:chat.timestamp })}</sub>
                </div>
            ))}
        </div>
    );
}