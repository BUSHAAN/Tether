export interface User {
    id: string;
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