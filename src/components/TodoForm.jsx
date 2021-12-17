import React, { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [value, setValue] = useState();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onClick = () => {
    onAdd(value);
    setValue("");
  };

  return (
    <>
      <input
        type="text"
        onChange={onChange}
        onKeyPress={(e) => {
          if (e.charCode === 13) {
            onClick();
          }
        }}
        value={value}
        className="todo-app__new-todo"
      />
      <button onClick={onClick}>할 일 추가</button>
    </>
  );
}
