import { useContext } from 'react';
import { UserContext } from '../UserProvider/UserContext';

export const useWebSocketRequest = () => {
    const { socket } = useContext(UserContext);

    const sendWebSocketRequest = ({ data, onResponse }) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(data));

            socket.onmessage = (event) => {
                const response = JSON.parse(event.data);
                onResponse(response);
            };
        }
    };

    return sendWebSocketRequest;
};