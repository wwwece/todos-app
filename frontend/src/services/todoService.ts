import { Todo } from "../types/todo.type";

export class TodoService {
  public findAll = async () => {
    const res = await fetch("http://localhost:4000/todos");
    return await res.json();
  };

  public create = async (data: Todo) => {
    const res = await fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  };

  public remove = async (id: number) => {
    const res = await fetch(`http://localhost:4000/todos/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  };
}
