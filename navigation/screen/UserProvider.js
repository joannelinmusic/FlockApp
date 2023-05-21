import React, { useState } from 'react';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        major: '',
        id: '',
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
