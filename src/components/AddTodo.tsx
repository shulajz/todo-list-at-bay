import { useState } from "react";
import { TextField, Button, Paper } from "@mui/material";
import "./AddTodo.css";

interface AddTodoProps {
  onTodoAdded: (title: string) => void;
}

const AddTodo = ({ onTodoAdded }: AddTodoProps) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onTodoAdded(title);
    setTitle("");
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={3}
      className="todo-form"
    >
      <TextField
        label="New Todo"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="todo-input"
      />
      <Button
        type="submit"
        variant="contained"
        disabled={!title.trim()}
        className="todo-button"
      >
        Add
      </Button>
    </Paper>
  );
};

export default AddTodo;
