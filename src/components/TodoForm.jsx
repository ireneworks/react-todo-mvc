import React, { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [value, setValue] = useState("");
  return (
    <>
      <input
        className="todo-app__new-todo"
        type="text"
        placeholder="할 일을 입력하세요"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        onKeyPress={(e) => {
          if (e.charCode === 13) {
            onAdd(value);
            setValue("");
          }
        }}
      />
      <button
        onClick={() => {
          onAdd(value);
          setValue("");
        }}
      >
        할 일 추가
      </button>
    </>
  );
}
