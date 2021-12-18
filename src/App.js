import React from "react";
import "./App.css";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

export default function App() {
  return (
    <div className="todo-app">
      <header>
        <h1 className="todo-app__header">Todo List</h1>
        <TodoForm />
      </header>
      <div className="todo-app__main">
        <ul className="todo-list">
          <Todo />
        </ul>
      </div>
      <footer className="footer">
        <span className="todo-count">
          <strong>0개</strong>
          <span>item</span>
          left
        </span>
        <ul className="todo-filters">
          <li>
            <a>All</a>
          </li>
          <li>
            <a>Active</a>
          </li>
          <li>
            <a>Completed</a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
