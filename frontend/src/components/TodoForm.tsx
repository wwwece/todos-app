import React from "react";
import { Todo } from "../types/todo.type";
import { TodoService } from "../services/todoService";

const TodoForm: React.FC = () => {
  const todoService = new TodoService();
  const INITIAL_VALUES: Todo = {
    id: 0,
    title: "",
    desc: "",
    date: new Date(),
    isDone: false,
    priority: 3,
  };

  const [todoData, setTodoData] = React.useState<Todo>(INITIAL_VALUES);

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
    const newTodo = await todoService.create(todoData);
    setTodoData(INITIAL_VALUES);
    // TODO: Use some notification service to notify user
    console.log(newTodo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Todo Form</h1>

      <label>
        Title:{" "}
        <input
          type="text"
          value={todoData.title}
          name="title"
          onChange={handleInputChange}
        />
      </label>

      <label>
        Description:{" "}
        <input
          type="textarea"
          value={todoData.desc}
          name="desc"
          onChange={handleInputChange}
        />
      </label>

      <label>
        Date:{" "}
        <input
          type="text"
          value={todoData.date
            .toLocaleString()
            .split(" ")[0]
            .split(".")
            .reverse()
            .join("-")}
          name="date"
          onChange={handleInputChange}
        />
      </label>

      <label>
        Is done?{" "}
        <input
          type="checkbox"
          checked={todoData.isDone}
          name="isDone"
          onChange={handleInputChange}
        />
      </label>

      <label>
        Priority:{" "}
        <input
          type="number"
          value={todoData.priority}
          name="priority"
          min="1"
          max="3"
          onChange={handleInputChange}
        />
      </label>

      <input type="submit" value="Submit" />
    </form>
  );
};

export default TodoForm;
