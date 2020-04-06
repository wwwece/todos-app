import React from "react";
import "./App.css";
import TodosList from "./components/TodosList";
import TodoForm from "./components/TodoForm";

function App() {
  return (
    <div className="App">
      <TodoForm />
      <TodosList />
    </div>
  );
}

export default App;
