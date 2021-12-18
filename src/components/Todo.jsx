import React from "react";

function Todo() {
  return (
    <li>
      <button />
      <div className="todo-item__view">
        <div className="todo-item__view__text"></div>
        <button />
      </div>
      <input type="text" className="todo-item__edit" />
    </li>
  );
}

export default Todo;
