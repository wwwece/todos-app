import React from "react";
import moment from "moment";
import { TextField, Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import { TodoProps } from "../types/todo.type";

type Props = {
  todoData: TodoProps;
  setTodoData:
    | React.Dispatch<React.SetStateAction<TodoProps | null>>
    | React.Dispatch<React.SetStateAction<TodoProps>>;
  // onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TodoFormGrid: React.FC<Props> = ({ todoData, setTodoData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (todoData) {
      setTodoData({
        ...todoData,
        [e.currentTarget.name]:
          e.currentTarget.type === "checkbox"
            ? e.currentTarget.checked
            : e.currentTarget.value,
      });
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <TextField
          name="title"
          label="Title"
          value={todoData.title}
          onChange={handleInputChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={2}>
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

      <Grid item xs={4}>
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
    </Grid>
  );
};

export default TodoFormGrid;
