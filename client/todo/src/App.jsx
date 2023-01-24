import React, { Fragment } from "react";
import "./App.css";

//components

import InputTodo from "./components/InputTodo.jsx";
import ListTodos from "./components/ListTodos.jsx";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </Fragment>
  );
}

export default App;