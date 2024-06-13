const baseUrl = 'http://localhost:4000/todo'
// //api to fetch all dns record
export async function getAllTodoRecord() {
  try {
    const response = await fetch(`${baseUrl}/`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error.message)
  }
}
//api to create DNS record
export async function addTodo(data) {
  console.log(data)
  try {
    const response = await fetch(`${baseUrl}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = response.json()
    return result
  } catch (error) {
    console.error(error.message)
  }
}
// //api to update dns record
export async function updateTodoItem(id, data) {
  try {
    const response = await fetch(`${baseUrl}/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data),
    })
    const result = response.json()
    return result
  } catch (error) {
    console.error(error.message)
  }
}
// //api to delete DNS Record
export async function deleteTodoItem(id) {
  console.log(id)
  try {
    const response = await fetch(`${baseUrl}/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = response.json()
    return result
  } catch (error) {
    console.error(error.message)
  }
}
