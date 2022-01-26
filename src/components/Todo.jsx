import React, { useEffect, useRef, useState } from "react";

function Todo({ todo, onDelete, onUpdate }) {
  const [value, setValue] = useState(todo.text);
  const [mode, setMode] = useState("view");
  const inputEl = useRef(null);
  useEffect(() => {
    if (mode === "edit") {
      inputEl.current.focus();
    }
  }, [mode]);
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <button
        className="toggle"
        onClick={() => {
          onUpdate(todo.id, value, !todo.completed);
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
            {todo.text}
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
          ref={inputEl}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.charCode === 13) {
              onUpdate(todo.id, value, todo.completed);
              setMode("view");
            }
          }}
          onBlur={() => {
            setMode("view");
            setValue(todo.text);
          }}
        />
      )}
    </li>
  );
}

export default Todo;
