import { useParams } from "react-router-dom";
import getCSRFToken from "../utils";
import { useState } from "react";
import GetMessage from "./GetMessage";

export default function ChatWindow() {
    const [message, setMessage] = useState('');
    const receiver = useParams();

    function sendChat() {
        if (!message || message === '') {
            alert('Message is empty!');
            return;
        }
        const csrfToken = getCSRFToken();
        const formData = new FormData();
        formData.append('message', message);
        formData.append('receiver', receiver.username);

        fetch('/direct_messages/send_messages', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken
            },
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'error') alert(data.message);
        });
    }

    return (
        <div className="chat-container">
            <div id="chat-messages">
                <GetMessage receiver={receiver.username} />
            </div>
            <div className="chat-textarea">
                <textarea 
                    type="text" 
                    placeholder="Type your message..." 
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}    
                />
                <button onClick={sendChat}>Send</button>
            </div>
        </div>
    );
}