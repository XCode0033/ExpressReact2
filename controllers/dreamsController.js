import {query} from '../db/db.js'

export const getDreamsController = async(req, res) => {
    const result = await query(
        `
        SELECT * FROM dreams ORDER BY id
        `
    )
    res.status(200).json({dreams: result.rows})
}