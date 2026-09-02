import {query} from '../db/db.js'


export const getBooks = async(req, res) => {
    const result = await query(`
        SELECT * FROM books ORDER BY id
        `)

    res.status(200).json({books: result.rows})
}

export const getBookById = async(req, res) => {
    const { id } = req.params

    const result = await query(
        `SELECT * FROM books WHERE id = $1`,
        [id]
    )

    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Book not found' })
    }

    res.status(200).json({ book: result.rows[0] })
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

    res.status(201).json({book: result.rows[0]})
}

export const patchBook = async(req, res) => {
  const { id } = req.params;

  // if no body was sent, use {} so Object.keys() below doesn't crash.
  const body = req.body ?? {}

  // defining allows values
  const allowed = ['title', 'author', 'year', 'genre']

    // Object.keys(body)  -> the property names the client sent, e.g. ['title', 'bogus']
    // .filter(...)       -> keep only names that are in `allowed`      -> ['title']
    // `fields` = the columns the client asked to change AND that we permit.
  const fields = Object.keys(body).filter((k) => allowed.includes(k))

  if(fields.length === 0) {
    return res.status(400).json({error: 'No valid fields to update'})
  }

// f = a field name, i = its index (0,1,2...). $${i+1} -> $1, $2 (PG placeholders start at 1).
  // .join(', ') stitches multiple assignments: "title = $1, author = $2"

  const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
 
  // for each field name, pull its VALUE out of the body.
  // fields = ['title','author'], body = {title:'X', author:'Y'}  ->  values = ['X','Y']
  // values[0] pairs with $1, values[1] with $2 — same order as setClause because
  // both .map() over the same `fields` array.
  const values = fields.map((f) => body[f])

  // ${setClause} drops in literally: "title = $1, author = $2"  (no extra $)
    // id's placeholder is the NEXT number after the field values:
    //   2 fields -> $3.  hence fields.length + 1
    // params array: all field values first ($1..$n), then id ($n+1). Order is everything.

    // clause is our "column" and fields is the placeholder now?, then returning its results and spreading the previous existing values/id

  const result = await query(`
    UPDATE books SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *
    `, [...values, id]);

    if(result.rows.length === 0) {
        return res.status(404).json({error: 'Book not found.'})
    }

    res.json({book: result.rows[0]})
}

export const deleteBooks = async(req, res) => {
    const {id} = req.params

    const result = await query(
        `DELETE FROM books WHERE id = $1 RETURNING *`,
        [id]
    )

    if(result.rowCount === 0) {
        return res.status(404).json({ error: 'No book found for deletion.' })
    }

    res.status(200).json({delete: result.rows[0]})
}



