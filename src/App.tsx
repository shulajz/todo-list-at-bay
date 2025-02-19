import { Container, Typography } from "@mui/material";
import TodoList from "./components/TodoList";
import "./App.css";

const App = () => {
  return (
    <Container maxWidth="md">
      <Typography sx={{ mt: 4 }} variant="h3" align="center" className="title">
        Todo App
      </Typography>
      <TodoList />
    </Container>
  );
};

export default App;
