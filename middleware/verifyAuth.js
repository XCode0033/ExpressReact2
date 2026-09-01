import jwt from 'jsonwebtoken'
import {query} from '../db/db.js'


export async function requireAuth(req, res, next) {
    try{
        const header = req.headers.authorization || ''
        const token = header.startsWith('Bearer ') ? header.slice(7) : null
        if(!token){
            return res.status(401).json({error: 'missing token.'})
        }
        
        // throws if expired tampered or wrong secret
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        // optional but recommended: confirm the user still exists
    const { rows } = await query(
      'SELECT id, username, email FROM users WHERE id = $1',
      [payload.id]
    )
    if (rows.length === 0) {
      return res.status(401).json({ error: 'user no longer exists' })
    }

        req.user = rows[0]
        next()
    }catch(err) {
        return res.status(401).json({error: 'invalid or expired token.'})
    }
}