import React, { useMemo, useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, value: "이게 뭐시당께?", isCompleted: false },
    { id: 2, value: "오늘은 한번에 끝내자", isCompleted: false },
  ]);
  const [filter, setFilter] = useState("All");

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
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, value, isCompleted };
        } else {
          return todo;
        }
      })
    );
  };

  const computedTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "Active") {
        return todo.isCompleted === false;
      } else if (filter === "Completed") {
        return todo.isCompleted === true;
      } else {
        return todo;
      }
    });
  }, [filter, todos]);

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
        </span>
        <ul className="todo-filters">
          <li>
            <a
              className={`${filter === "All" ? "selected" : ""}`}
              onClick={() => {
                setFilter("All");
                console.log(filter);
              }}
            >
              All
            </a>
          </li>
          <li>
            <a
              className={`${filter === "Active" ? "selected" : ""}`}
              onClick={() => {
                setFilter("Active");
                console.log(filter);
              }}
            >
              Active
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setFilter("Completed");
                console.log(filter);
              }}
              className={`${filter === "Completed" ? "selected" : ""}`}
            >
              Completed
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
