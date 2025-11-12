import { useEffect, useState } from "react";
import { calcTime } from "../utils";
import { useNavigate } from "react-router-dom";
import './ChatList.css'

export default function ChatList() {
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetch(`/direct_messages/?page${page}`)
        .then(response => response.json())
        .then(data => {
            const newChats = data.chats.filter(chat => !chats.some(existingChat => existingChat.id === chat.id));
            const filteredChats = [...chats, ...newChats].filter((chat, index, self) => 
                index === self.findIndex((p) => p.id === chat.id)
            );
            
            setChats(filteredChats);
            setHasMore(data.chats.length === 10);
        });
    }, [page]);
    
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== 
                document.documentElement.offsetHeight 
            || !hasMore) {
                return
            };
        setPage(prevPage => prevPage + 1);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore]);
    
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