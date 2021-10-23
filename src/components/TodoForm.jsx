import React, { useRef, useState } from "react";

export default function TodoForm({ onAdd }) {
  const inputEl = useRef(null);
  const [value, setValue] = useState("");

  const onAddHandler = () => {
    onAdd(value);
    setValue("");
  };

  return (
    <>
      <input
        ref={inputEl}
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        className="todo-app__new-todo"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onAddHandler();
          }
        }}
      />
      <button onClick={onAddHandler}>추가</button>
    </>
  );
}
