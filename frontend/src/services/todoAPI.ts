import axios from "axios";
import { TodoProps as Todo } from "../types/todo.type";

export class TodoAPI {
  private BASE_URL = "http://localhost:4000/todos";

  public getAll = async (): Promise<Todo[]> => {
    try {
      const { data } = await axios.get(this.BASE_URL);
      return data;
    } catch (err) {
      console.log(err);
    }
    return [];
  };

  public getOne = async (id: number): Promise<Todo | null> => {
    try {
      const res = await axios.get(`${this.BASE_URL}/${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
    return null;
  };

  public create = async (data: Todo): Promise<Todo | null> => {
    try {
      const res = await axios.post(this.BASE_URL, data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
    return null;
  };

  public delete = async (id: number): Promise<boolean> => {
    try {
      const res = await axios.delete(`${this.BASE_URL}/${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
    return false;
  };
}
