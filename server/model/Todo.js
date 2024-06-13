import db from '../config/db.js';

//create Todo Table
const Todo = {
  createTable: async () => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Todo (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        activityPriority VARCHAR(255) NOT NULL,
        activityType VARCHAR(255) NOT NULL,
        isCompleted BOOLEAN DEFAULT false
      )
    `;
    await db.query(createTableQuery);
  }
};


export default Todo;
