import db from "../config/db.js"


// get all Todo Item
export const getAllTodo = async(req,res) => {
    try {
        const [data] = await db.query('SELECT * FROM Todo')
        res.status(200).json(data)
    } catch(err) {
        console.log(err)
    }
}
//add new Todo Item
export const addTodo = async (req, res) => {

    const { title, activityPriority, activityType ,isCompleted} = req.body;
    try {
        const [data] = await db.query(`insert into Todo (title, activityPriority, activityType,isCompleted) Values (?,?,?,?) `, [title, activityPriority, activityType,isCompleted])
        res.json(data)
    } catch(err) {
        console.log(err)
    }
}
//delete todo item
export const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(`SELECT * FROM Todo WHERE id= ?`, id)
        const todo = rows[0];
        if (!todo) {
            return res.status(500).json({
                success: false,
                message:'No todo found to delete'
            })
        }

        await db.query('DELETE FROM Todo where id=?', id)
        res.status(200).json({
            success: true,
            message:"Deleted successfully"
        })
    } catch (err) {
        res.status(500).json({
                success: false,
                message:err
        })
    }
}
//update todo item
export const updateTodo = async (req, res) => {

  try {
    const { title, activityPriority, activityType,isCompleted } = req.body;
    const [rows] = await db.query('SELECT * FROM Todo WHERE id = ?', [req.params.id]);
    const todo = rows[0];

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const fieldsToUpdate = {};
    if (title !== undefined) fieldsToUpdate.title = title;
    if (activityPriority !== undefined) fieldsToUpdate.activityPriority = activityPriority;
    if (activityType !== undefined) fieldsToUpdate.activityType = activityType;
    if (isCompleted !== undefined) fieldsToUpdate.isCompleted = isCompleted;
    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    const setClause = Object.keys(fieldsToUpdate)
      .map(field => `${field} = ?`)
      .join(', ');

    const values = Object.values(fieldsToUpdate);
    values.push(req.params.id);

    const updateQuery = `UPDATE Todo SET ${setClause} WHERE id = ?`;
    await db.query(updateQuery, values);

    const [updatedRows] = await db.query('SELECT * FROM Todo WHERE id = ?', [req.params.id]);
    const updatedTodo = updatedRows[0];
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


