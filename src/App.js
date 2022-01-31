import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import { requester } from "./configures/requestConfigure";
import { isSuccess } from "./utilities/requestUtilities";
import { isEmpty } from "./utilities/typeGuards";
import { ACTIVE, ALL, COMPLETED } from "./constants/todoFilterConstants";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const res = await requester.get("/todos");
        setTodos(res.data);
      } catch (error) {
        alert("잠시후 다시 시도해주세요.");
        console.log(error);
      }
    })();
  }, []);

  const [filter, setFilter] = useState("All");

  const onAdd = async (value) => {
    const res = await requester.post("/todos", { text: value });
    if (isSuccess(res)) {
      setTodos(todos.concat(res.data));
    }
  };

  const onDelete = async (id) => {
    const res = await requester.delete(`/todos/${id}`);
    if (isSuccess(res)) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const onUpdate = async (id, text, completed) => {
    const res = await requester.put(`/todos/${id}`, {
      id,
      text,
      completed,
    });
    if (isSuccess(res)) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text, completed } : todo
        )
      );
    }
  };

  const computedTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === ACTIVE) {
        return todo.completed === false;
      } else if (filter === COMPLETED) {
        return todo.completed === true;
      } else {
        return todo;
      }
    });
  }, [filter, todos]);

  const generatedEmptyMessage = useMemo(() => {
    if (!isEmpty(computedTodos)) {
      return "";
    }

    switch (filter) {
      case ALL:
        return "만들어진 할 일이 없습니다.";
      case ACTIVE:
        return "진행할 할 일이 없습니다.";
      case COMPLETED:
        return "완료된 할 일이 없습니다.";
      default:
        return "";
    }
  }, [computedTodos, filter]);

  return (
    <div className="todo-app">
      <header>
        <h1 className="todo-app__header">Todo List</h1>
        <TodoForm onAdd={onAdd} />
      </header>
      <div className="todo-app__main">
        <ul className="todo-list">
          {!isEmpty(computedTodos) &&
            computedTodos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
          {!isEmpty(generatedEmptyMessage) && <p>{generatedEmptyMessage}</p>}
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
              className={`${filter === ALL ? "selected" : ""}`}
              onClick={() => {
                setFilter(ALL);
              }}
            >
              All
            </a>
          </li>
          <li>
            <a
              className={`${filter === ACTIVE ? "selected" : ""}`}
              onClick={() => {
                setFilter(ACTIVE);
              }}
            >
              Active
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setFilter(COMPLETED);
              }}
              className={`${filter === COMPLETED ? "selected" : ""}`}
            >
              Completed
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
