import mysql from 'mysql2/promise';
import dotenv from 'dotenv'
dotenv.config()
//mysql db connection
const db = mysql.createPool({
  host: "localhost",
  user: 'root',
  password: `${process.env.Password}`,
  database: 'Todo',
  insecureAuth: true
});


export default db;
