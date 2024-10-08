import pg from 'pg';
import 'dotenv/config';

const {Client} = pg;

const SQL = `
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
        first_name VARCHAR(15) CHECK(first_name <> ''),
        last_name VARCHAR(15) CHECK(last_name <> ''),
        username VARCHAR(15) CHECK(username <> ''),
        password TEXT CHECK(password <> ''), 
        role TEXT CHECK(role IN ('user', 'admin', 'member')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS posts (
            post_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            title VARCHAR( 50 ),
            content VARCHAR( 500 ),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        
   CREATE TABLE IF NOT EXISTS users_posts (
            user_id INTEGER REFERENCES users ON DELETE CASCADE,  
            post_id INTEGER REFERENCES posts ON DELETE CASCADE
       );
`;


async function main() {
    const client = new Client({
        connectionString: process.env.DB_URL
    });
    try {
        await client.connect();
        await client.query(SQL);
        await client.end();
    } catch (err) {
        console.error(err);
    }
}

main();