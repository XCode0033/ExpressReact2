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

export const patchDream = async(req, res) => {
    const { id } = req.params
    const body = req.body ?? {};

    const allowed = ['title', 'description', 'mood']

    const fields = Object.keys(body).filter((k) => allowed.includes(k))

    if(fields.length === 0) {
        return res.status(404).json({error:'No dream found to target for update.'})
    }

    const setClause = fields.map((f, i) => `${f} =$${i + 1}`).join(', ');
    const values = fields.map((f) => body[f])

    const result = await query(`
        UPDATE dreams
        SET ${setClause} WHERE id = $${fields.length + 1}
        RETURNING *
        `, [...values, id])

    if(result.rows.length === 0){
       return res.status(404).json({message: 'No dream found when checked for update success.'})
    }
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