export interface User {
    id: number;
    fullName: string;
    email: string;
}

export interface UserRegisterResponse {
    user: User;
    token: string;
}