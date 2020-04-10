import { create as createApi } from "apisauce";
import { TodoProps as Todo } from "../types/todos";

const BASE_URL = "http://localhost:4000/todos";
const api = createApi({
  baseURL: BASE_URL,
});

export const getAll = async (): Promise<Todo[]> => {
  const response = await api.get("");
  if (response.ok) return response.data as Todo[];
  console.log(response.problem);
  return [];
};

export const getOne = async (id: number): Promise<Todo | null> => {
  const response = await api.get(`/${id}`);
  if (response.ok) return response.data as Todo;
  console.log(response.problem);
  return null;
};

export const create = async (data: Todo): Promise<Todo | null> => {
  const response = await api.post("", data);
  if (response.ok) return response.data as Todo;
  console.log(response.problem);
  return null;
};

export const update = async (id: number, data: any): Promise<boolean> => {
  const response = await api.put(`/${id}`, data);
  return response.ok;
};

export const patch = async (id: number, data: any): Promise<boolean> => {
  const response = await api.patch(`/${id}`, data);
  return response.ok;
};

export const remove = async (id: number): Promise<boolean> => {
  const response = await api.delete(`/${id}`);
  return response.ok;
};

export default {
  getAll,
  getOne,
  create,
  update,
  patch,
  remove,
};
