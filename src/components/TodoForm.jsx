import React, { useState } from "react";

export default function TodoForm({}) {
  const [value, setValue] = useState();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onClick = () => {
    console.log(value);
  };

  return (
    <>
      <input
        type="text"
        onChange={onChange}
        value={value}
        className="todo-app__new-todo"
      />
      <button onClick={onClick}>추가</button>
    </>
  );
}
