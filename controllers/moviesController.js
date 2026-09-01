import {query} from '../db/db.js'


export const getMoviesController = async(req, res) => {
    const result = await query(`
        SELECT * FROM movies ORDER BY id
        `)
        console.log('Movies route hit')
        res.status(200).json({movies: result.rows})
}

export const findMovieById = async(req, res) => {
const { id } = req.body;

const result = await query(`SELECT * FROM movies WHERE id = $1`, [id])
}

export const postMoviesController = async(req, res) => {
    const { title, director, year } = req.body;

    const result = await query(
        `
        INSERT INTO movies(title, director, year)
        VALUES ($1, $2, $3)
        RETURNING*
        `, [title, director, year]
    )

    res.status(200).json({movie: result.rows[0]})
}

export const deleteMoviesController = async(req, res) => {
    const { id } = req.params

    const result = await query(
        `
        DELETE FROM movies WHERE id = $1
        RETURNING*
        `, [id]

    )
    if(result.rowCount === 0) res.json({error: 'No id found for movie deletion.'})
    res.status(200).json({delete: result.rows[0]})
}