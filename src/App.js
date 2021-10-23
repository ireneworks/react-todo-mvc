import React, { useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

const todoContent = [
  {
    id: 1,
    todoValue: "모찌랑 놀러가기",
  },
  {
    id: 2,
    todoValue: "일본가고 싶당",
  },
  {
    id: 3,
    todoValue: "이게 모야아아 -ㅅ-",
  },
];

export default function App() {
  const onAdd = (todo) => {};

  useState();

  return (
    <div className="todo-app">
      <header>
        <h1 className="todo-app__header">Todo List</h1>
        <TodoForm />
      </header>
      <div className="todo-app__main">
        <ul className="todo-list">
          {todoContent.map((todo) => (
            <Todo todo={todo} />
          ))}
        </ul>
      </div>
      <footer className="footer">
        <span className="todo-count">
          <strong>1</strong>
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
