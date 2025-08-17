// pages/test-supabase.js
import { supabase } from '../lib/supabaseClient';

export default function TestSupabase({ data, error }) {
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <h1>Conexión a Supabase</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    // Vamos a consultar una tabla ficticia (cambia 'test' por alguna tabla que tengas)
    const { data, error } = await supabase.from('test').select('*');
    return { props: { data, error: error?.message || null } };
  } catch (err) {
    return { props: { data: null, error: err.message } };
  }
}
