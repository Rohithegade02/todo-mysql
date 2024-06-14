import mysql from 'mysql2/promise';
import dotenv from 'dotenv'
dotenv.config()

//mysql db connection
const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.Password,
  database: process.env.DATABASE,
  insecureAuth: true
});


export default db;
