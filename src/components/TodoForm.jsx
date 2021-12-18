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
        className="todo-app__new-todo"
        type="text"
        placeholder="할 일을 입력하세요."
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onKeyPress={(e) => {
          if (e.charCode === 13) {
            onAddHandler();
          }
        }}
      />
      <button onClick={onAddHandler}>할 일 추가</button>
    </>
  );
}
