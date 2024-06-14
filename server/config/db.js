import mysql from 'mysql2/promise';
import dotenv from 'dotenv'
dotenv.config()

//mysql db connection
const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQL_DATABASE,
  insecureAuth: true
});


export default db;
