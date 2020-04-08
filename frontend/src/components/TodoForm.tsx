import React from "react";
import { TodoProps } from "../types/todo.type";
import { TodoAPI } from "../services/todoAPI";
import { Typography, Button } from "@material-ui/core";
import TodoFormGrid from "./TodoFormGrid";

const TodoForm: React.FC = () => {
  const todoAPI = new TodoAPI();
  const INITIAL_VALUES: TodoProps = {
    id: 0,
    title: "",
    desc: "",
    date: new Date(),
    isDone: false,
    priority: 3,
  };

  const [todoData, setTodoData] = React.useState<TodoProps>(INITIAL_VALUES);

  // TODO: Make this to be a custom hook:
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTodoData({
      ...todoData,
      [e.currentTarget.name]:
        e.currentTarget.type === "checkbox"
          ? e.currentTarget.checked
          : e.currentTarget.value,
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo = await todoAPI.create(todoData);
    setTodoData(INITIAL_VALUES);
    // TODO: Use some notification service to notify user
    console.log(newTodo);
  };

  const handleReset = () => {
    setTodoData(INITIAL_VALUES);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h3" gutterBottom>
        Add new Todo
      </Typography>
      <TodoFormGrid todoData={todoData} onInputChange={handleInputChange} />
      <Button type="button" variant="contained" onClick={handleReset}>
        Reset
      </Button>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default TodoForm;
