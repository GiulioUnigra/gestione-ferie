import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  const { email, password, ...profilo } = req.body;

const { data: user, error: authError } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: false, 
  user_metadata: { attivo: true } 
});

  if (authError) {
    return res.status(400).json({ error: 'Errore creazione Auth: ' + authError.message });
  }

  // Inserisce anche nella tabella "dipendenti"
  const { error: dbError } = await supabase.from('dipendenti').insert({
    id: user.user.id,
    email,
    password,
    ...profilo,
    attivo: true
  });

  if (dbError) {
    return res.status(500).json({ error: 'Errore salvataggio DB: ' + dbError.message });
  }

  return res.status(200).json({ success: true });
}
