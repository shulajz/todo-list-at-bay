import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 2, mb: 3 }}
    >
      <TextField
        fullWidth
        label="New Todo"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button type="submit" variant="contained" disabled={!title.trim()}>
        Add
      </Button>
    </Box>
  );
};

export default AddTodo;
