import React, { useEffect, useState } from 'react';
import { calcTime } from "../utils";
import { useNavigate } from 'react-router-dom';

export default function GetMessage({ receiver }) {
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/direct_messages/get_chat_messages/${receiver}`)
            .then(response => response.json())
            .then(data => setMessages(data))
            .catch(error => console.error('Error fetching messages:', error));
    }, [receiver]);

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