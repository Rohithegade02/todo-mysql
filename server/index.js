import express from 'express';
import TodoRoutes from './routes/TodoRoutes.js'
import Todo from './model/Todo.js';
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const PORT=process.env.PORT ||5000
const app = express()

app.use(cors())

app.use(express.json());



app.use('/todo',TodoRoutes)         //todo route

app.listen(PORT, () => {
  console.log(`listening to server on ${PORT}`)
  try {
    Todo.createTable().then(() => {       //checks whether table is created or not
      console.log('Todo table created or already exists.');
    }).catch(err => {
      console.error('Error creating activities table:', err);
    });
  } catch (err) {
    console.log(err)
  }
})