import * as db from "../db/pool.js";
import {CreatePost} from "../types/post-types.js";

export const createPost = async ({userId, title, content}: CreatePost) => {
    const {rows} = await db.query(`INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING post_id`,
        [title, content]);

    const postId = rows[0].post_id;
    await db.query(`INSERT INTO users_posts (user_id, post_id) VALUES ($1, $2)`, [userId, postId]);

    return;
};