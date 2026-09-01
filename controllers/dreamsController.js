import {query} from '../db/db.js'

export const getDreamsController = async(req, res) => {
    const result = await query(
        `
        SELECT * FROM dreams ORDER BY id
        `
    )
    res.status(200).json({dreams: result.rows})
}

export const postDreamController = async(req, res) => {
    const { title, description, mood} = req.body
    const result = await query(
        `
        INSERT INTO dreams (title, description, mood)
        VALUES ($1, $2, $3)
        RETURNING *
        `, [title, description, mood]
    );
    res.status(201).json({dream: result.rows[0]})
}

export const findDreamById = async(req, res) => {
    const { id } = req.params;

    const result = await query(`SELECT * FROM dreams WHERE id = $1`, [id])
    if(result.rowCount === 0) 'No dream found with this id'
    res.status(200).json({dream: result.rows[0]})
}
export const deleteDreamController = async(req,res ) => {
   const { id } = req.params;

   const result = await query(`
    DELETE FROM dreams WHERE id = $1 RETURNING *
    `, [id]);

    if(result.rowCount === 0) {
        return res.status(404).json({error: 'Dream not found.'})
    }
    res.status(200).json({deleted: result.rows[0]})
}