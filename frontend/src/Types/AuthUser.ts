export interface User {
    _id: string;
    fullName: string;
    email: string;
    profilePic: string | "";
    createdAt: string;
    updatedAt: string;
}

export interface SignupUser {
    fullName: string;
    email: string;
    password: string;
}

export interface SidebarUser {
    _id: string;
    fullName: string;
    profilePic: string | null;
}

export interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    image?: string;
    createdAt: string;
    updatedAt: string;
}