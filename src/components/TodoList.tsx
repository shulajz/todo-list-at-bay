import { useState, useEffect } from "react";
import { Todo } from "../types/todo";
import { Box, CircularProgress } from "@mui/material";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import SearchTodo from "./SearchTodo";
import { fetchTodos } from "../api/todoApi";
import "./TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const generateId = (): number => {
    return Date.now() + Math.floor(Math.random() * 1000);
  };

  useEffect(() => {
    const getTodos = async () => {
      if (loading) return;

      setLoading(true);
      try {
        const fetchedTodos = await fetchTodos(10, currentPage * 10);

        if (fetchedTodos.length === 0) {
          setHasMore(false);
        } else {
          setTodos((prev) => [...prev, ...fetchedTodos]);
        }
      } catch (err) {
        setError("Failed to load todos");
      } finally {
        setLoading(false);
      }
    };

    getTodos();
  }, [currentPage]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleAddTodo = (title: string) => {
    const newTodo: Todo = {
      id: generateId(),
      title,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const handleToggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    const bottom =
      target.scrollHeight === target.scrollTop + target.clientHeight;
    if (bottom && hasMore && !loading) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading && currentPage === 0) {
    return (
      <Box className="loading-container">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <>
      <AddTodo onTodoAdded={handleAddTodo} />
      <SearchTodo onSearch={handleSearch} />
      <Box onScroll={handleScroll} className="todo-list-container">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => handleToggleTodo(todo.id)}
            onUpdate={handleUpdateTodo}
            onDelete={() => handleDeleteTodo(todo.id)}
          />
        ))}
        {loading && (
          <Box className="loading-indicator">
            <CircularProgress size={30} />
          </Box>
        )}
      </Box>
    </>
  );
};

export default TodoList;
