require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function test() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .eq('status', 'PENDENTE');

  if (error) {
    console.log('--- ERROR START ---');
    console.log(error);
    console.log('--- ERROR END ---');
  } else {
    console.log('Data count:', data.length);
  }
}

test();
