import React, { useEffect, useRef, useState } from "react";

// 1. useRef 를 통해 edit 모드가 되면 focus 이벤트를 발생시킨다.
// 2. useEffect 를 통해 focus 이벤트를 발생시킨다.
function Todo(props) {
  const [editedTodo, setEditedTodo] = useState(props.todo.value);
  const inputEl = useRef(null);
  const [mode, setMode] = useState("view"); // "view" | "edit"
  useEffect(() => {
    if (mode === "edit") {
      console.log(inputEl.current);
      inputEl.current.focus();
    }
  }, [mode]);
  return (
    <li className={`todo-item ${props.todo.isCompleted ? "completed" : ""}`}>
      <button
        className="toggle"
        onClick={() =>
          props.onUpdate(
            props.todo.id,
            props.todo.value,
            !props.todo.isCompleted
          )
        }
      />
      {mode === "view" && (
        <div className="todo-item__view">
          <div
            className="todo-item__view__text"
            onDoubleClick={() => {
              setMode("edit");
            }}
          >
            {props.todo.value}
          </div>
          <button
            className="todo-item__destroy"
            onClick={() => {
              props.onDelete(props.todo.id);
            }}
          />
        </div>
      )}
      {mode === "edit" && (
        <input
          type="text"
          className="todo-item__edit"
          value={editedTodo}
          onChange={(e) => {
            setEditedTodo(e.target.value);
          }}
          ref={inputEl}
          onBlur={() => {
            setMode("view");
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              props.onUpdate(props.todo.id, editedTodo, props.todo.isCompleted);
              setMode("view");
            }
          }}
        />
      )}
    </li>
  );
}

export default Todo;
