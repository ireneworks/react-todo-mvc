import React, { useMemo, useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

export default function App() {
  const [filter, setFilter] = useState("all"); // "all" | "active" | "completed"
  const [todos, setTodos] = useState([]);
  const onAdd = (value) => {
    setTodos(
      todos.concat({
        id: todos.length + 1,
        value,
        isCompleted: false,
      })
    );
  };
  const onDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const onUpdate = (id, value, isCompleted) => {
    setTodos(
      todos.map((todos) => {
        if (todos.id === id) {
          return {
            ...todos,
            value,
            isCompleted,
          };
        }
        return todos;
      })
    );
  };

  const computedTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (filter) {
        case "active":
          return !todo.isCompleted;
        case "completed":
          return todo.isCompleted;
        default:
          return todo;
      }
    });
  }, [todos, filter]);

  return (
    <div className="todo-app">
      <header>
        <h1 className="todo-app__header">Todo List</h1>
        <TodoForm onAdd={onAdd} />
      </header>
      <div className="todo-app__main">
        <ul className="todo-list">
          {computedTodos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </ul>
      </div>
      <footer className="footer">
        <span className="todo-count">
          <strong>{computedTodos.length}</strong>
          <span>item</span>
          left
        </span>
        <ul className="todo-filters">
          <li>
            <a
              className={`${filter === "all" ? "selected" : ""}`}
              href="#none"
              onClick={() => setFilter("all")}
            >
              All
            </a>
          </li>
          <li>
            <a
              className={`${filter === "active" ? "selected" : ""}`}
              href="#none"
              onClick={() => setFilter("active")}
            >
              Active
            </a>
          </li>
          <li>
            <a
              className={`${filter === "completed" ? "selected" : ""}`}
              href="#none"
              onClick={() => setFilter("completed")}
            >
              Completed
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
