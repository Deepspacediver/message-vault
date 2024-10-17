export type CreatePost = {
    title: string,
    content: string,
    userId: number
}

export type Post = {
    user_full_name: string,
    created_at: Date,
    post_id: number,
    title: string,
    content: string,
}

export type PostLimitedUserInfo = Omit<Post, 'user_full_name' | 'created_at'>