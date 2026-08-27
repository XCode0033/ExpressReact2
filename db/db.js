import 'dotenv/config'
import pg from 'pg'

const { Pool } = pg

// Connection comes from DATABASE_URL in .env, with a local fallback.
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL || 'postgres://xavier@localhost:5432/expressreact2db',
})

pool.on('error', (err) => {
  console.error('Unexpected PG pool error', err)
})

/**
 * Run a parameterised query.
 *   const { rows } = await query('SELECT * FROM games WHERE id = $1', [id])
 * Always pass values as the second arg — never string-concat them into the SQL.
 */
export function query(text, params) {
  return pool.query(text, params)
}

export { pool }
