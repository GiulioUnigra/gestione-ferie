import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
      'https://sauahmyekejigpbjrdug.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhdWFobXlla2VqaWdwYmpyZHVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0Njc2OTcsImV4cCI6MjA2NzA0MzY5N30.JetFvFBwg1dy9AqyeSnTYalAuuIrPAyaFWzc8SRaxYo'
    );

(async () => {
  await supabase.auth.signOut();
  localStorage.removeItem("utenteLoggato");
  window.location.href = "index.html";
})();
