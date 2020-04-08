import { create } from "apisauce";
import { TodoProps as Todo } from "../types/todo.type";

export class TodoAPI {
  private BASE_URL = "http://localhost:4000/todos";
  private api = create({
    baseURL: this.BASE_URL,
  });

  public getAll = async (): Promise<Todo[]> => {
    const response = await this.api.get("");
    if (response.ok) return response.data as Todo[];
    console.log(response.problem);
    return [];
  };

  public getOne = async (id: number): Promise<Todo | null> => {
    const response = await this.api.get(`/${id}`);
    if (response.ok) return response.data as Todo;
    console.log(response.problem);
    return null;
  };

  public create = async (data: Todo): Promise<Todo | null> => {
    const response = await this.api.post("", data);
    if (response.ok) return response.data as Todo;
    console.log(response.problem);
    return null;
  };

  public update = async (id: number, data: any): Promise<boolean> => {
    const response = await this.api.put(`/${id}`, data);
    return response.ok;
  };

  public patch = async (id: number, data: any): Promise<boolean> => {
    const response = await this.api.patch(`/${id}`, data);
    return response.ok;
  };

  public delete = async (id: number): Promise<boolean> => {
    const response = await this.api.delete(`/${id}`);
    return response.ok;
  };
}
