import axios from "axios";
import { TodoProps as Todo } from "../todos/types";

const BASE_URL = "http://localhost:4000/todos";

export const getAll = async (): Promise<Todo[]> => {
  try {
    const { data } = await axios.get(BASE_URL);
    return data;
  } catch (err) {
    console.log(err);
  }
  return [];
};

export const getOne = async (id: number): Promise<Todo | null> => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const create = async (data: Todo): Promise<Todo | null> => {
  try {
    const res = await axios.post(BASE_URL, data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
  return null;
};

// TODO: UPDATE IS MISSING!

export const patch = async (id: number, data: any) => {
  try {
    const res = await axios.patch(`${BASE_URL}/${id}`, data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const remove = async (id: number): Promise<boolean> => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
  return false;
};

export default {
  getAll,
  getOne,
  create,
  patch,
  remove,
};
