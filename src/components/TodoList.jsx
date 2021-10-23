import React from 'react';

function TodoView ({todo}) {
    return (
        <li className="todo-item">
            <button className="toggle"/>
            <div className="todo-item__view">
                <div className="todo-item__view__text">{todo.value}</div>
                <button className="todo-item__destroy"/>
            </div>
            <input type="text"
                   className="todo-item__edit"/>
        </li>
    );
}

function TodoList({todoContent}) {
    return (
        <div>
            {todoContent.map(todo => (
                <TodoView todo={todo} key={todo.id} />
            ))}
        </div>
    );
}

export default TodoList;