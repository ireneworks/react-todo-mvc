import React, { useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

export default function App() {
  const [todos, setTodo] = useState([
    {
      id: 1,
      value: "모찌랑 놀러가기",
    },
    {
      id: 2,
      value: "일본가고 싶당",
    },
  ]);

  const onAdd = (value) => {
    setTodo(
      todos.concat({
        id: todos.length + 1,
        value,
      })
    );
  };

  const onDelete = (id) => {
    setTodo(todos.filter((todo) => todo.id !== id));
  };

  const onUpdate = (id, value) => {
    setTodo(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            value,
          };
        }
        return todo;
      })
    );
  };

  return (
    <div className="todo-app">
      <header>
        <h1 className="todo-app__header">Todo List</h1>
        <TodoForm onAdd={onAdd} />
      </header>
      <div className="todo-app__main">
        <ul className="todo-list">
          {todos.map((todo) => (
            <Todo
              todo={todo}
              key={todo.id}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </ul>
      </div>
      <footer className="footer">
        <span className="todo-count">
          <strong>{todos.length}</strong>
          <span>item</span>
          left
        </span>
        <ul className="todo-filters">
          <li>
            <a href="#none">All</a>
          </li>
          <li>
            <a href="#none">Active</a>
          </li>
          <li>
            <a href="#none">Completed</a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
