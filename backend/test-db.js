require('dotenv').config();
const { Pool } = require('pg');

console.log('Testing connection to:', process.env.DATABASE_URL?.substring(0, 50) + '...');

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: false  // Disable SSL (corporate proxy interferes)
});

pool.query('SELECT 1 as test')
  .then((result) => {
    console.log('✅ Connection works!', result.rows);
    pool.end();
  })
  .catch((e) => {
    console.log('❌ Error:', e.message);
    console.log('Code:', e.code);
    pool.end();
  });
