import React, { useMemo, useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

//저장되있는 투두를 필터에 맞춰서 필터를 해줘야한다.
//스프레드 문법 안에 저 내용을 추가한다는건지?
//useMemo가 값을 저장하고 있다가 보여준다라는건지?
//!isCompleted가 false인데 왜 반대로 보여줘야하지?

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

  const filteredTodos = useMemo(() => {
    const a = todos.filter((todo) => {
      if (filter === "active") {
        return !todo.isCompleted;
      } else if (filter === "completed") {
        return todo.isCompleted;
      } else {
        return todo;
      }
    });
    console.log(a);
    return a;
  }, [todos, filter]);

  //filteredTodos는 filter된 todos
  return (
    <div className="todo-app">
      <header>
        <h1 className="todo-app__header">Todo List</h1>
        <TodoForm onAdd={onAdd} />
      </header>
      <div className="todo-app__main">
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <Todo
              todo={todo}
              key={todo.id}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
          //todos 어레이를 복사해서 거기에 변경된거를 todos 어레이로 다시
          넣는걸로
        </ul>
      </div>
      <footer className="footer">
        <span className="todo-count">
          <strong>{filteredTodos.length}</strong>
          <span>item</span>
          left
        </span>
        <ul className="todo-filters">
          <li>
            <a
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
