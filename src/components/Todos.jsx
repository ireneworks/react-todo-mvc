import React, { useState } from 'react';
import TodoHeader from "./TodoHeader";
import TodoList from "./TodoList";

function Todos () {

    const [value, setValue] = useState({
        todoValue: ''
    });

    const {todoValue} = value;

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onKeypress = (e) => {
        if(e.charCode === 13) {
            onCreate();
        }
    }

    const todoContent = [
        {
            id: 1,
            todoValue: "모찌랑 놀러가기"
        }, {
            id: 2,
            todoValue: "일본가고 싶당"
        }, {
            id: 3,
            todoValue: "이게 모야아아 -ㅅ-"
        }
    ];

    // const nextId = useRef(4);

    const onCreate = () => {
        console.log(value);
        // nextId.current += 1;

    }

    return (
        <div>
            <TodoHeader
                onChange={onChange}
                onKeypress={onKeypress}
                todo={todoValue}
                onClick={onCreate}
            />
            <TodoList todoContent={todoContent} />
        </div>
    );
}


export default Todos;