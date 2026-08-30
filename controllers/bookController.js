import {query} from '../db/db.js'


export const getBooks = async(req, res) => {
    const result = await query(`
        SELECT * FROM books ORDER BY id
        `)

    res.status(200).json({books: result.rows})
}

export const postBooks = async(req, res) => {
    const {title, author, year, genre } = req.body

    const result = await query(
        `
        INSERT INTO books (title, author, year, genre)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `, [title, author, year, genre]
    )

    res.status(200).json({book: result.rows[0]})
}

export const deleteBooks = async(req, res) => {
    const {id} = req.params

    const result = await query(`
        DELETE FROM books WHERE id = $1
        `, [id])

    if(result.rowCount === 0) 'No book found for deletion.'

    res.status(200).json({delete: result.rows[0]})
}