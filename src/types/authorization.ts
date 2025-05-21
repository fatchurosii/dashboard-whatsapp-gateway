export interface ILoginPayload {
    username: string,
    password: string,    
}

export interface IUserProfile {
    authorized: boolean,
    id: string,    
    name: string,
}