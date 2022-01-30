import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import axios from "axios";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get("/api/todos");
        setTodos(res.data);
      } catch (error) {
        alert("잠시후 다시 시도해주세요.");
        console.log(error);
      }
    })();
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

  const onAdd = async (value) => {
    const res = await axios.post("/api/todos", { text: value });
    if (res.status === 200) {
      setTodos(todos.concat(res.data));
    }
  };

  const onDelete = async (id) => {
    const res = await axios.delete(`/api/todos/${id}`);
    if (res.status === 200) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const onUpdate = async (id, text, completed) => {
    const res = await axios.put(`/api/todos/${id}`, {
      id,
      text,
      completed,
    });
    if (res.status === 200) {
      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, text, completed };
          } else {
            return todo;
          }
        })
      );
    }
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
          {computedTodos.length > 0 &&
            computedTodos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
          {computedTodos.length === 0 && filter === "All" && (
            <p>만들어진 테스크가 없습니다.</p>
          )}
          {computedTodos.length === 0 && filter === "Active" && (
            <p>진행할 테스크가 없습니다.</p>
          )}
          {computedTodos.length === 0 && filter === "Completed" && (
            <p>완료된 테스크가 없습니다.</p>
          )}
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
