import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  'https://lhwdoxwqhzskksjcuirj.supabase.co',
  'YOUR_PUBLIC_ANON_KEY'
);

(async () => {
  await supabase.auth.signOut();
  localStorage.removeItem("utenteLoggato");
  window.location.href = "index.html";
})();
