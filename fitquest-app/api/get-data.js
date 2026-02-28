import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    const { username } = req.query;
    if (!username) return res.status(400).json({ error: 'Username required' });

    try {
        await sql`CREATE TABLE IF NOT EXISTS fitquest_users (username VARCHAR(255) PRIMARY KEY, data JSONB);`;
        const { rows } = await sql`SELECT data FROM fitquest_users WHERE username = ${username};`;
        if (rows.length > 0) {
            return res.status(200).json(rows[0].data);
        }
        return res.status(200).json(null);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}
