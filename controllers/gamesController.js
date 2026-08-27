
import {query} from '../db/db.js'
export const getGamesController = async(req, res) => {
    const result = await query(`SELECT * FROM games ORDER BY id `)
    res.status(200).json({games: result.rows})

}

export const postGameController = async(req ,res ) => {
    const {title, genre} = req.body
    const result = await query(
        `
        INSERT INTO games(title, genre)
        VALUES ($1, $2)
        RETURNING*
        `, [title, genre]
    )

    res.status(200).json({game: result.rows[0]})
}

export const deleteGamesController = async(req, res) => {
    const { id } =  req.params

    const result = await query(
        `
        DELETE FROM games WHERE id = $1 RETURNING *
        `, [id]
    )
    if(result.rowCount === 0){
        res.error('No id found for deletion.')
    }
    res.status(200).json({delete: result.rows[0]})
}