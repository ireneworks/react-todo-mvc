import React, { useEffect, useRef, useState } from "react";

function Todo({ todo, onDelete, onUpdate }) {
  //mode 1. view 2. edit
  //default를 view로 해두고 클릭 이벤트가 발생하면 edit모드로 바뀐다.

  const [value, setValue] = useState(todo.value);
  const inputEl = useRef(null);
  const [mode, setMode] = useState("view");

  useEffect(() => {
    if (mode === "edit") {
      inputEl.current.focus();
    }
  }, [mode]);

  return (
    <li className="todo-item">
      <button className="toggle" />
      {mode === "view" && (
        <div className="todo-item__view">
          <div
            className="todo-item__view__text"
            onDoubleClick={() => {
              setMode("edit");
              console.log("A");
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
          ref={inputEl}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onBlur={() => {
            setMode("view");
          }}
          value={value}
          onKeyPress={(e) => {
            if (e.charCode === 13) {
              onUpdate(todo.id, value);
              setMode("view");
            }
          }}
        />
      )}
    </li>
  );
}

export default Todo;
