import React from "react";
import moment from "moment";
import { TextField, Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import { TodoProps } from "../types/todo.type";

type Props = {
  todoData: TodoProps;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TodoFormGrid: React.FC<Props> = ({ todoData, onInputChange }) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={8}>
        <TextField
          name="title"
          label="Title"
          value={todoData.title}
          onChange={onInputChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={1}>
        <TextField
          name="priority"
          label="Priority"
          type="number"
          value={todoData.priority}
          onChange={onInputChange}
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
          onChange={onInputChange}
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
          onChange={onInputChange}
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
              onChange={onInputChange}
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
