import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { username, data } = req.body;
    if (!username) return res.status(400).json({ error: 'Username required' });

    try {
        await sql`CREATE TABLE IF NOT EXISTS fitquest_users (username VARCHAR(255) PRIMARY KEY, data JSONB);`;
        await sql`
            INSERT INTO fitquest_users (username, data)
            VALUES (${username}, ${JSON.stringify(data)})
            ON CONFLICT (username) DO UPDATE SET data = EXCLUDED.data;
        `;
        return res.status(200).json({ success: true });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}
