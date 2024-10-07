import pg from "pg";

const {Pool} = pg;

const pool = new Pool({
    connectionString: process.env.DB_URL
});

export const query = async (query: string, params?: Array<string | number>) => {
    return await pool.query(query, params);
};

