export interface User {
    id: number;
    telegram_id: number;
    username: string;
    first_name?: string;
    phone: string;
    photo: string | null;
    photo_url?: string;
    subscription: boolean;
    created_at: string;
}

export interface UserResponse {
    message: string;
    user: User;
} 