import { useState } from "react";
import { Todo } from "../types/todo";
import {
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onUpdate: (todo: Todo) => void;
  onDelete: () => void;
}

const TodoItem = ({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.title);
  };

  const handleSave = () => {
    if (!editText.trim()) return;

    onUpdate({
      ...todo,
      title: editText.trim(),
    });
    setIsEditing(false);
  };

  return (
    <ListItem>
      <Checkbox checked={todo.completed} onChange={onToggle} />
      {isEditing ? (
        <TextField
          fullWidth
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          autoFocus
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />
      ) : (
        <ListItemText
          primary={todo.title}
          sx={{
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        />
      )}
      {isEditing ? (
        <IconButton onClick={handleSave} disabled={!editText.trim()}>
          <SaveIcon />
        </IconButton>
      ) : (
        <IconButton onClick={handleEdit}>
          <EditIcon />
        </IconButton>
      )}
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default TodoItem;
