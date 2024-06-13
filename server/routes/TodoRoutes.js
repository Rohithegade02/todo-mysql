import express from "express";
import { addTodo, deleteTodo, getAllTodo, updateTodo } from "../controller/TodoController.js";

const router = express.Router()

router.get('/', getAllTodo)      // router for get All Todo Item
router.post('/add', addTodo)    // router for add  new Todo Item
router.delete('/delete/:id', deleteTodo) //router for delete Todo Item
router.put('/update/:id',updateTodo)    //router for update Todo Item

export default router;