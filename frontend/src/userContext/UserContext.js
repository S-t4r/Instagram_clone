import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Simulate fetching user data
        fetch('/api/get_user_data')
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);