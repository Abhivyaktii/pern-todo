const express = require('express')
const cors = require('cors')
const pool = require("./db")
const app = express()

const port = 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//post todos
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body

        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING * ", [description])
        console.log(newTodo.rows[0]);
        res.json(newTodo.rows[0])

    } catch (error) {
        console.error(error.message);
    }

})

// get todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message);
    }
})

// get a specific todo

app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todos = await pool.query(`SELECT * FROM todo WHERE todo_id=${id}`)
        res.json(todos.rows[0])
    } catch (error) {
        console.error(error.message);
    }
})

//update a todo

app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {description}=req.body;
        const updateTodo = await pool.query(`UPDATE todo SET description=($1)  WHERE todo_id=${id}`,[description])
        res.json('todo was updated')
    } catch (error) {
        console.error(error.message);
    }
})

// delete

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        const deleteTodo = await pool.query('DELETE FROM   todo  WHERE todo_id= $1',[id])
        res.json('todo was deleted')
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${5000}`)
})