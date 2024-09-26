import React, { useEffect, useState } from 'react';
import { calcTime } from "../utils";
import { useNavigate } from 'react-router-dom';

export default function GetMessage({ receiver }) {
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);


    useEffect(() => {
        fetch(`/direct_messages/get_chat_messages/${receiver}?page=${page}`)
            .then(response => {
                if (!response.ok) return null;
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data.messages)) {
                    const newMessages = data.messages.filter(message => !messages.some(existingMessage => existingMessage.id === message.id));
                    const filteredMessages = [...messages, ...newMessages].filter((chat, index, self) => 
                        index === self.findIndex((p) => p.id === chat.id)
                    );
                    setMessages(filteredMessages);
                    setHasMore(data.messages.length === 10);
                } else {
                    setMessages([]);
                }
            })
            .catch(error => console.error('Error fetching messages:', error));
    }, [receiver, page]);

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
        <div>
            {messages.map((message, index) => (
                <div key={index} className="chat-message">
                    <h2>
                        <a href="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/users/${message.sender}`); }}>
                            {message.sender}
                        </a>
                    </h2>
                    <p>{message.text}</p>
                    <sub>{calcTime({ timestamp:message.timestamp })}</sub>
                </div>
            ))}
        </div>
    );
}