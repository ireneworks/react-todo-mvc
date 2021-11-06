import React, { useMemo, useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

export default function App() {
  const [filter, setFilter] = useState("all");
  const [todos, setTodo] = useState([
    {
      id: 1,
      value: "모찌랑 놀러가기",
      isCompleted: false,
    },
    {
      id: 2,
      value: "일본가고 싶당",
      isCompleted: false,
    },
  ]);

  const onAdd = (value) => {
    setTodo(
      todos.concat({
        id: todos.length + 1,
        value,
        isCompleted: false,
      })
    );
  };

  const onDelete = (id) => {
    setTodo(todos.filter((todo) => todo.id !== id));
  };

  const onUpdate = (id, value, isCompleted) => {
    setTodo(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            value,
            isCompleted,
          };
        }
        return todo;
      })
    );
  };

  const filterTodos = useMemo(() => {
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
          <strong>{filterTodos.length}</strong>
          <span>item</span>
          left
        </span>
        <ul className="todo-filters">
          <li>
            <a
              href="#none"
              className={`${filter === "all" ? "selected" : ""}`}
              onClick={() => {
                setFilter("all");
              }}
            >
              All
            </a>
          </li>
          <li>
            <a
              href="#none"
              className={`${filter === "active" ? "selected" : ""}`}
              onClick={() => {
                setFilter("active");
              }}
            >
              Active
            </a>
          </li>
          <li>
            <a
              href="#none"
              className={`${filter === "completed" ? "selected" : ""}`}
              onClick={() => {
                setFilter("completed");
              }}
            >
              Completed
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
