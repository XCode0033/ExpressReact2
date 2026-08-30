import bcrypt from 'bcrypt'
import { query } from '../db/db.js'
import jwt from 'jsonwebtoken'


const SALT_ROUNDS = 10
const JWT_SECRET = process.env.JWT_SECRET;

export const showUsers = async(req, res) => {
  
}
// POST /api/users/register
// body: { username, email, password }
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body ?? {}

  // --- validation ---
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'username, email and password are required' })
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'password must be at least 8 characters' })
  }

  try {
    // --- duplicate check (case-insensitive) ---
    const existing = await query(
      `SELECT 1 FROM users WHERE lower(email) = lower($1) OR lower(username) = lower($2)`,
      [email, username]
    )
    if (existing.rowCount > 0) {
      return res.status(409).json({ error: 'username or email already taken' })
    }

    // --- hash + insert ---
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS)

    const result = await query(
      `INSERT INTO users (username, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, username, email, created_at`,   // never return password_hash
      [username, email, password_hash]
    )

    return res.status(201).json({ user: result.rows[0] })
  } catch (err) {
    // 23505 = unique_violation, in case of a race between the check and the insert
    if (err.code === '23505') {
      return res.status(409).json({ error: 'username or email already taken' })
    }
    console.error('registerUser failed:', err)
    return res.status(400).json({ error: 'could not create account' })
  }
}

export const login = async(req, res) => {
  const {email, password} = req.body
  try{
    if(!email || !password) {
      return res.status(400).json({message:'Email and password required.'})
    }
    const result = await query(`
      SELECT id, username, password_hash FROM users WHERE lower(email) = lower($1)
      `, [email])
  
    const user = result.rows[0]
  
    if(!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({error: 'Invlaid Credentials.'})
    }
  
    res.json({token: jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '7d'})})

  }catch(err){
    console.error('err occured from login block')
    return res.status(500).json({error: 'Could not log in.'})
  }
}

