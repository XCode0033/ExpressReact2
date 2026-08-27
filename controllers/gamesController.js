
import {query} from '../db/db.js'
export const getGamesController = async(req, res) => {
    const result = await query(`SELECT * FROM games ORDER BY id `)
    res.status(200).json({games: result.rows})

}
