import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://sauahmyekejigpbjrdug.supabase.co',
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password, ...profilo } = req.body;

  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  });

  if (authError) return res.status(400).json({ error: authError.message });

  const id = authData.user.id;

  const { error: insertError } = await supabase.from("dipendenti").insert([{ id, email, password, ...profilo }]);

  if (insertError) return res.status(400).json({ error: insertError.message });

  return res.status(200).json({ message: "Utente creato", id });
}
