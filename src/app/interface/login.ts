export interface Login {
    email: string;
    password: string;
}
export interface Token {
    access_token: string|null;
}
export interface Register {
    name: string;
    email: string;
    password: string;
}
export interface Logout {
    access_token: string|null;
}