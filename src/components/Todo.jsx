import React, { useEffect, useRef, useState } from "react";

function Todo({ todo, onUpdate, onDelete }) {
  const [value, setValue] = useState(todo.value);
  const [mode, setMode] = useState("view");
  const inputEl = useRef(null);
  useEffect(() => {
    if (mode === "edit") {
      inputEl.current.focus();
    }
  }, [mode]);
  return (
    <li className={`todo-item ${todo.isCompleted ? "completed" : ""}`}>
      <button
        className="toggle"
        onClick={() => {
          onUpdate(todo.id, todo.value, !todo.isCompleted);
        }}
      />
      {mode === "view" && (
        <div className="todo-item__view">
          <div
            className="todo-item__view__text"
            onDoubleClick={() => {
              setMode("edit");
            }}
          >
            {todo.value}
          </div>
          <button
            className="todo-item__destroy"
            onClick={() => {
              onDelete(todo.id);
            }}
          />
        </div>
      )}
      {mode === "edit" && (
        <input
          type="text"
          className="todo-item__edit"
          value={value}
          ref={inputEl}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onBlur={() => {
            setMode("view");
          }}
          onKeyPress={(e) => {
            if (e.charCode === 13) {
              onUpdate(todo.id, value, todo.isCompleted);
              setMode("view");
            }
          }}
        />
      )}
    </li>
  );
}

export default Todo;
