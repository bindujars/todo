import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.log(error));
  }, []);

  const addTodo = () => {
    axios
      .post("http://localhost:5000/todos", { text })
      .then((response) => {
        setTodos([...todos, response.data]);
        setText("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1
        style={{
          color: "green",
          fontSize: "3em",
          textAlign: "center",
          textShadow: "2px 2px 4px #aaa",
          margin: "30px 0",
          fontFamily: "Arial, sans-serif",
        }}
      >
        To-Do List
      </h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
