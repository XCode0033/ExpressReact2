import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import {query} from '../db/db.js'

passport.use(
    "google",
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/auth/google/callback",
        userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo",
    }, async(accessToken, refreshToken, profile, cb) => {
        try{
          const googleId = profile.id
          const email = profile.emails[0].value
          const name = profile.displayName
            let found = await query(`SELECT  * FROM users WHERE google_id = $1`, [googleId])
            if(found.rows.length > 0) return cb(null, found.rows[0])
            
            //2 same email registered with a password already? link google id onto it.
            let byEmail = await query(`SELECT * FROM users WHERE lower(email) = lower($1)`, [email])
            if(byEmail.rows.length > 0){
                const linked = await query(
                    `
                    UPDATE users SET google_id = $1 WHERE id = $2 RETURNING *
                    `,[googleId, byEmail.rows[0].id]
                )
                return cb(null, linked.rows[0])
            }

            //brand new user
            const newUser = await query(
                `
                INSERT INTO users(username, email, google_id)
                VALUES ($1, $2, $3)
                RETURNING *
                `, [name, email, googleId]
            )
            return cb(null, newUser.rows[0])
        }catch(err) {
            return cb(err)
        }
    })
)


export default passport;