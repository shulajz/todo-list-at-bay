import React, { useState, useEffect, ChangeEvent } from "react";
import { TextField, InputAdornment, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchTodo.css";

interface SearchTodoProps {
  onSearch: (searchTerm: string) => void;
}

const SearchTodo = ({ onSearch }: SearchTodoProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  return (
    <Paper elevation={3} className="search-container">
      <TextField
        placeholder="Search todos..."
        value={searchTerm}
        onChange={handleSearchChange}
        variant="outlined"
        fullWidth
        className="search-input"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </Paper>
  );
};

export default SearchTodo;
