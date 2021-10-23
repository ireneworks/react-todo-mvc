import React from 'react';

export default function TodoHeader ({onChange, onKeypress, todo, onClick}) {

    // const [value, setValue] = useState([]);
    //
    // const onChange = (e) => {
    //     setValue(e.target.value);
    // }
    //
    // const onClick = () => {
    //     console.log(value);
    // }
    //
    // const onKeypress = (e) => {
    //     if(e.charCode === 13) {
    //         onClick();
    //     }
    // }

    return(
        <header>
            <h1 className="todo-app__header">김모찌 리스트</h1>
            <input type="text"
                   onChange={onChange}
                   onKeyPress={onKeypress}
                   value={todo}
                   className="todo-app__new-todo"/>
            <button onClick={onClick}>추가</button>
        </header>
        );
}
