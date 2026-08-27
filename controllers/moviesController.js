import {query} from '../db/db.js'


export const getMoviesController = async(req, res) => {
    const result = await query(`
        SELECT * FROM movies ORDER BY id
        `)
        console.log('Movies route hit')
        res.status(200).json({movies: result.rows})
}