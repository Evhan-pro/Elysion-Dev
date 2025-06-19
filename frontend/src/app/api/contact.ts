import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { nom, prenom, email, telephone, objet, message, terms } = req.body;

  // Validation rapide côté serveur
  if (!nom || !prenom || !email || !objet || !message || !terms) {
    return res.status(400).json({ error: 'Champs obligatoires manquants.' });
  }

  try {
    await pool.execute(
      `INSERT INTO contact_messages 
       (nom, prenom, email, telephone, objet, message, terms_ok) 
       VALUES (?,?,?,?,?,?,?)`,
      [nom, prenom, email, telephone || null, objet, message, 1]
    );

    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
