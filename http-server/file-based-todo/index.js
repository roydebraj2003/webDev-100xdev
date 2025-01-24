const express = require('express');
const app = express();
const crypto = require('crypto');
const fs = require('fs');
const jsonData = require('./todo.json');
const path = './todo.json';

app.get("/", (req, res) => {
  res.status(200).json(todo);
});

app.post("/todo-add/:title/:todo", (req, res) => {
  const input = req.params;
  console.log(input);
  const newTodo = { id: crypto.randomUUID(), title: input.title, todo: input.todo }
  jsonData.push(newTodo)
  fs.writeFile(path, JSON.stringify(jsonData), 'utf-8', (err) => {
    if (err) {
      console.error('Error in adding todo:', err);
      return res.status(500).json({ message: "Failed to add todo" });
    }
    console.log('Successfully added a todo');
    res.status(201).json({ message: "Todo added successfully!" });
  });
});

app.delete("/todo-delete/:id", (req, res)=>{
    const {id} = req.params
    const updatedTodo = jsonData.filter((todo)=> todo.id != id)
    fs.writeFile(path, JSON.stringify(updatedTodo), 'utf-8', (err) => {
        if (err) {
          console.error('Error in deleting todo:', err);
          return res.status(500).json({ message: "Failed to delete a todo" });
        }
        console.log('Successfully deleted a todo');
        res.status(201).json({ message: "Todo deleted" });
      });
})

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
