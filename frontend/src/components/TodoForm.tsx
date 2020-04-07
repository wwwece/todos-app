import React from "react";
import { TodoProps } from "../types/todo.type";
import { TodoAPI } from "../services/todoAPI";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import moment from "moment";

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
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            Add new Todo
          </Typography>
        </Grid>

        <Grid item xs={8}>
          <TextField
            name="title"
            label="Title"
            value={todoData.title}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={1}>
          <TextField
            name="priority"
            label="Priority"
            type="number"
            value={todoData.priority}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ min: "1", max: "3" }}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            name="date"
            label="Due date"
            type="date"
            value={moment(todoData.date).format("YYYY-MM-DD")}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="desc"
            label="Description"
            value={todoData.desc}
            onChange={handleInputChange}
            multiline
            fullWidth
            rowsMax="3"
          />
        </Grid>

        <Grid item xs={8}>
          <FormControlLabel
            control={
              <Checkbox
                checked={todoData.isDone}
                onChange={handleInputChange}
                name="isDone"
                color="primary"
              />
            }
            label="Done"
          />
        </Grid>

        <Grid item xs={4}>
          <Button type="button" variant="contained" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TodoForm;
