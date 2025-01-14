"use client"
import React, { createContext, useState, useEffect, useRef } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const socketRef = useRef(null);

    // TODO
    useEffect(() => {
        socketRef.current = new WebSocket('ws://your-websocket-url');

        socketRef.current.onopen = () => {
            console.log('WebSocket connected');
        };

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'USER_LOGIN') {
                setUser(data.user);
            } else if (data.type === 'USER_LOGOUT') {
                setUser(null);
            }
        };

        return () => {
            socketRef.current.close();
        };
    }, []);

    return (
        <UserContext.Provider value={{ user, socket: socketRef.current }}>
            {children}
        </UserContext.Provider>
    );
};