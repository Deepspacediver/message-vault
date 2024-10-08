import * as db from '../db/pool.js';
import {CreateUserRequest, User} from "../types/user-types.js";


export const createUser = async ({
                                     userName,
                                     password,
                                     firstName,
                                     lastName,
                                 }: CreateUserRequest
): Promise<User> => {
    const {rows} = await db.query(`INSERT INTO users 
            (username, password, first_name, last_name, role) 
            VALUES ($1, $2, $3, $4, 'user') RETURNING *`,
        [userName, password, firstName, lastName]);

    return rows[0];
};

export const changeUserRole = async (userId: number, role: 'admin' | 'member') => {
    await db.query(`UPDATE users SET role = $1 WHERE user_id = $2 RETURNING *`, [role, userId]);
};

