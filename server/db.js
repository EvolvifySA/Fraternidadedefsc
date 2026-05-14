require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const hasSupabaseConfig = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY);

const supabase = hasSupabaseConfig
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
  : null;

module.exports = { supabase, hasSupabaseConfig };
