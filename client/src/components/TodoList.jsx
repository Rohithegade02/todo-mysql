import { useState, useEffect } from 'react'
import {
  Button,
  TextField,
  Modal,
  Box,
  Select,
  MenuItem,
  Autocomplete,
} from '@mui/material'
import TodoItem from './TodoItem' // Ensure you have the correct import for your TodoItem component
import {
  addTodo,
  updateTodoItem,
  deleteTodoItem,
  getAllTodoRecord,
} from '../api' // Adjust the import as necessary

const TodoList = () => {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const [activityType, setActivityType] = useState('')
  const [activityPriority, setActivityPriority] = useState('')
  const [open, setOpen] = useState(false)
  const [todoError, setTodoError] = useState('')
  const priorities = ['High', 'Medium', 'Low']
  const [filterTask, setFilterTask] = useState('all')
  const [updateIndex, setUpdatedIndex] = useState(null)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const handleAddOrUpdateTodoItem = async e => {
    e.preventDefault()

    if (!title || !activityType || !activityPriority) {
      setTodoError('Add all conditions')
      return
    }

    handleClose()
    setTodoError('')

    if (updateIndex !== null) {
      // Update existing todo item
      const updatedTask = {
        title,
        isCompleted,
        activityType,
        activityPriority,
      }

      await updateTodoItem(updateIndex, updatedTask)
      setUpdatedIndex(null) // Reset the update index
    } else {
      // Add new todo item
      const id = Date.now()
      const newTask = {
        id,
        title,
        isCompleted,
        activityType,
        activityPriority,
      }

      await addTodo(newTask)
    }

    setTitle('')
    setActivityType('')
    setActivityPriority('')
    getAllTasks()
  }

  const handleDelete = async id => {
    await deleteTodoItem(id)
    getAllTasks()
  }

  const handleComplete = async id => {
    const item = tasks.find(item => item.id === id)
    console.log(item)
    await updateTodoItem(id, { ...item, isCompleted: !item.isCompleted })
    getAllTasks() // Refresh the tasks list
  }

  const getAllTasks = async () => {
    const response = await getAllTodoRecord()
    setTasks(response)
  }

  const handleUpdate = id => {
    const handleUpdateItem = tasks.find(item => item.id === id)
    setTitle(handleUpdateItem.title)
    setActivityPriority(handleUpdateItem.activityPriority)
    setActivityType(handleUpdateItem.activityType)
    setIsCompleted(handleUpdateItem.isCompleted)
    setUpdatedIndex(id)
    handleOpen()
  }

  useEffect(() => {
    getAllTasks()
  }, [])

  const sortedTasks = tasks.sort(
    (a, b) =>
      priorities.indexOf(a.activityPriority) -
      priorities.indexOf(b.activityPriority),
  )

  const finishedTask = tasks.filter(task => task.isCompleted)
  const unfinishedTask = tasks.filter(task => !task.isCompleted)

  return (
    <div
      style={{
        background: 'linear-gradient(to right, #8AB1E2, #3F75B1, #3970AB)',
        minHeight: '100vh',
      }}
    >
      <div className='flex flex-col justify-center items-center gap-x-10'>
        <div className='mt-10 font-extrabold text-white text-[30px]'>
          <p>TODO APP</p>
        </div>
        <div className='flex justify-between items-center w-[80vw] lg:w-[30vw] gap-10 mt-10'>
          <Button
            sx={{
              background: 'black',
              color: '#fff',
              padding: '15px',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'black',
              },
            }}
            onClick={handleOpen}
          >
            Add a Task
          </Button>
          <Select
            value={filterTask}
            label='Filter'
            sx={{
              backgroundColor: 'white',
              width: '10vw',
              '@media (max-width: 768px )': { width: '30vw' },
              '@media (max-width:1024px )': { width: '30vw' },
            }}
            onChange={e => setFilterTask(e.target.value)}
          >
            <MenuItem value='all'>All</MenuItem>
            <MenuItem value='finished'>Finished</MenuItem>
            <MenuItem value='in-progress'>In-Progress</MenuItem>
          </Select>
        </div>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              backgroundColor: 'white',
              width: '70vw',
              '@media (min-width: 600px)': { width: '30vw' },
              '@media (max-width: 768px )': { width: '60vw' },
              '@media (max-width:1024px )': { width: '60vw' },
            }}
          >
            <form
              onSubmit={handleAddOrUpdateTodoItem}
              className='flex flex-col'
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleAddOrUpdateTodoItem(e)
                }
              }}
            >
              <div className='flex flex-col items-center gap-1'>
                <p className='text-[20px] font-bold ml-[40px]'>Task</p>
                <TextField
                  type='text'
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder='Add a task'
                  label='Add a task'
                  className='bg-white rounded-md lg:w-[20vw] md:w-[20vw] w-[50vw]'
                />
                <Autocomplete
                  options={priorities}
                  value={activityPriority}
                  onChange={(e, value) => setActivityPriority(value)}
                  renderInput={params => (
                    <TextField {...params} label='Priority' />
                  )}
                  className='bg-white rounded-md lg:w-[20vw] md:w-[20vw] w-[50vw]'
                />
                <Autocomplete
                  options={['Outdoor', 'Indoor']}
                  value={activityType}
                  onChange={(e, value) => setActivityType(value)}
                  renderInput={params => (
                    <TextField {...params} label='Activity Type' />
                  )}
                  className='bg-white rounded-md lg:w-[20vw] md:w-[20vw] w-[50vw]'
                />
                <p className='text-[#cc0000] mx-3'>{todoError}</p>
                <Button
                  type='submit'
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    padding: '10px',
                    width: '20vw',
                  }}
                >
                  {updateIndex ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          </Box>
        </Modal>
        <div>
          {filterTask === 'all' &&
            sortedTasks.map(item => (
              <TodoItem
                key={item.id}
                handleUpdate={handleUpdate}
                handleComplete={handleComplete}
                handleDelete={handleDelete}
                {...item}
              />
            ))}
          {filterTask === 'finished' &&
            finishedTask.map(item => (
              <TodoItem
                key={item.id}
                handleUpdate={handleUpdate}
                handleComplete={handleComplete}
                handleDelete={handleDelete}
                {...item}
              />
            ))}
          {filterTask === 'in-progress' &&
            unfinishedTask.map(item => (
              <TodoItem
                key={item.id}
                handleUpdate={handleUpdate}
                handleComplete={handleComplete}
                handleDelete={handleDelete}
                {...item}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default TodoList
