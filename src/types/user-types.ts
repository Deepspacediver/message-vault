export enum UserRoles {
    ADMIN = 'admin',
    MEMBER = 'member',
    USER = 'user',
}

export type User = {
    user_id: number,
    user_name: string,
    first_name: string,
    last_name: string,
    password: string,
    role: UserRoles;
    created_at: Date
}

export type CreateUserRequest = {
    userName: string,
    firstName: string,
    lastName: string,
    password: string,
}
