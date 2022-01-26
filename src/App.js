import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import axios from "axios";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("/api/todos")
      .then((res) => {
        if (res.data !== null) {
          console.log(res.data);
          return setTodos(res.data);
        } else {
          return setTodos([]);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  // useEffect(() => {
  //   const getData = JSON.parse(localStorage.getItem("todoData")) || [
  //     { userId: 1, id: 1, title: "ㅇㅅㅇ테스트중", completed: false },
  //     { userId: 1, id: 2, title: "왜 안나와?", completed: false },
  //   ];
  //   setTodos(getData);
  // }, [setTodos]);
  //
  // useEffect(() => {
  //   localStorage.setItem("todoData", JSON.stringify(todos));
  // }, [todos]);

  const [filter, setFilter] = useState("All");

  const onAdd = (value) => {
    const addValue = {
      id: todos.length + 1,
      text: value,
      completed: false,
    };

    axios
      .post("/api/todos", {
        ...addValue,
      })
      .then((res) => console.log(res));
    setTodos(todos.concat(addValue));
  };
  const onDelete = (id) => {
    axios
      .delete(`/api/todos/${id}`)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const onUpdate = (id, text, completed) => {
    axios
      .put(`/api/todos/${id}`, {
        id,
        text,
        completed,
      })
      .then(function (res) {
        console.log(res);
      });
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text, completed };
        } else {
          return todo;
        }
      })
    );
  };

  const computedTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "Active") {
        return todo.completed === false;
      } else if (filter === "Completed") {
        return todo.completed === true;
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
              }}
            >
              Active
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setFilter("Completed");
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
