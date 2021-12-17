import React, { useMemo, useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, value: "아 이제 나오네 ^^;;", isCompleted: false },
    { id: 2, value: "배불러", isCompleted: false },
  ]);
  const [filter, setFilter] = useState("all");

  const computedTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "active") {
        return todo.isCompleted == false;
      } else if (filter === "done") {
        return todo.isCompleted == true;
      } else {
        return todo;
      }
    });
  });

  const onAdd = (value) => {
    setTodos(todos.concat({ id: todos.length + 1, value, isCompleted: false }));
  };

  const onUpdate = (id, value, isCompleted) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, value, isCompleted };
        } else {
          return todo;
        }
      })
    );
  };
  const onDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

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
              onUpdate={onUpdate}
              onDelete={onDelete}
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
              onClick={() => setFilter("all")}
            >
              All
            </a>
          </li>
          <li>
            <a
              className={`${filter === "active" ? "selected" : ""}`}
              onClick={() => setFilter("active")}
            >
              Active
            </a>
          </li>
          <li>
            <a
              className={`${filter === "done" ? "selected" : ""}`}
              onClick={() => setFilter("done")}
            >
              Completed
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
