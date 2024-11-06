


export interface UserProps {
    username: string
    email: string
}

export interface UserContextProps {
    user: UserProps | undefined;
    setUser: Dispatch<SetStateAction<UserProps | undefined>>;
} 