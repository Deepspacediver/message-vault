import * as db from "../db/pool.js";
import {CreatePost, Post, PostLimitedUserInfo} from "../types/post-types.js";

export const createPost = async ({userId, title, content}: CreatePost) => {
    const {rows} = await db.query(`INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING post_id`,
        [title, content]);

    const postId = rows[0].post_id;
    await db.query(`INSERT INTO users_posts (user_id, post_id) VALUES ($1, $2)`, [userId, postId]);

    return;
};

export const getPostsForUser = async (): Promise<PostLimitedUserInfo[]> => {
    const {rows} = await db.query(`SELECT posts.post_id, posts.content, posts.title FROM posts JOIN users_posts AS rel
                                    ON posts.post_id = rel.post_id 
                                    JOIN users ON users.user_id = rel.user_id
                                    ORDER BY posts.created_at`);
    return rows;
};

export const getPostsForMemberAndAdmin = async (): Promise<Post[]> => {
    const {rows} = await db.query(`SELECT posts.post_id, posts.content, posts.title, posts.created_at, 
                                    CONCAT(users.first_name, ' ', users.last_name) AS user_full_name
                                    FROM posts JOIN users_posts AS rel ON posts.post_id = rel.post_id 
                                    JOIN users ON users.user_id = rel.user_id ORDER BY posts.created_at`);
    return rows.map((post) => ({
        ...post,
        created_at: new Date(post.created_at).toLocaleString()
    }));
};

export const deletePost = async (postId: number) => {
        await db.query('DELETE FROM posts WHERE post_id =$1', [postId]);
    }
;