import React, { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [value, setValue] = useState("");

  const onAddHandler = () => {
    onAdd(value);
    setValue("");
  };

  return (
    <>
      <input
        type="text"
        className="todo-app__new-todo"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        onKeyPress={(e) => {
          if (e.charCode === 13) {
            onAddHandler();
          }
        }}
      />
      <button onClick={onAddHandler}>추가</button>
    </>
  );
}
