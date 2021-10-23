import React, {Component} from 'react';
import './App.css';
import TodoHeader from "./components/TodoHeader";
import Todos from "./components/Todos";

class App extends Component {
  render() {
    return (
      <div className="todo-app">
        {/*<TodoHeader />*/}
        <div className="todo-app__main">
          <ul className="todo-list">
            <Todos />
          </ul>
        </div>
        <footer className="footer">
          <span className="todo-count">
            <strong>1</strong>
              <span>item</span>
            left
          </span>
          <ul className="todo-filters">
            <li><a href="#none">All</a></li>
            <li><a href="#none">Active</a></li>
            <li><a href="#none">Completed</a></li>
          </ul>
        </footer>
      </div>
    );
  }
}

export default App;
