
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

export const findGameById = async(req, res) => {
    const { id } = req.params;
    const result = await query(`SELECT * FROM games WHERE id = $1`, [id])
    if(result.rowCount === 0) 'No game found by this id.'
    res.status(200).json({game: result.rows[0]})
}

export const patchGame = async(req, res) => {
    const { id } = req.params;

    const body = req.body ?? {}

    const allowed = ['title', 'genre']


    const fields = Object.keys(body).filter((k) => allowed.includes(k))

    if(fields.length === 0) {
        return res.status(404).json({error: 'No Game Found.'})
    }

    const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
    const values = fields.map((f) => body[f])

    const result = await query(`
        UPDATE games
        SET ${setClause} WHERE id = $${fields.length + 1} 
        RETURNING *
        `, [...values, id])

    if(result.rows.length === 0) {
        return res.status(404).json({error: 'Game not found'})
    }

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