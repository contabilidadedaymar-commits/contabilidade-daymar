export default async function handler(req, res) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;

  const headers = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  };

  try {
    if (req.method === 'GET') {
      const r = await fetch(
        `${SUPABASE_URL}/rest/v1/daymar_contribuintes?select=*&order=nome.asc`,
        { headers }
      );
      const data = await r.json();
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/daymar_contribuintes`, {
        method: 'POST',
        headers,
        body: JSON.stringify(req.body),
      });
      const data = await r.json();
      return res.status(200).json(data);
    }

    if (req.method === 'PUT') {
      const { id, ...rest } = req.body;
      const r = await fetch(
        `${SUPABASE_URL}/rest/v1/daymar_contribuintes?id=eq.${id}`,
        { method: 'PATCH', headers, body: JSON.stringify(rest) }
      );
      const data = await r.json();
      return res.status(200).json(data);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await fetch(`${SUPABASE_URL}/rest/v1/daymar_contribuintes?id=eq.${id}`, {
        method: 'DELETE',
        headers,
      });
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
