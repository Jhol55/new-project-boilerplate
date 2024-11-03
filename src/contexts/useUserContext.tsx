"use client";

import React, { createContext, Dispatch, SetStateAction, useState } from "react";

interface IUser {
    username: string
    email: string
}

interface IUserContext {
    user: IUser | undefined;
    setUser: Dispatch<SetStateAction<IUser | undefined>>;
} 

export const UserContext = createContext<IUserContext>({
    user: undefined,
    setUser: () => {}
});

interface IUserProvider {
    children: React.ReactNode | React.ReactNode[]
}

export const UserProvider = ({ children } : IUserProvider) => {
    const [user, setUser] = useState<IUser | undefined>(undefined);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
};

