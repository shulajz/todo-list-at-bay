import { Container, Typography } from "@mui/material";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" sx={{ mt: 4 }}>
        Todo App
      </Typography>
      <TodoList />
    </Container>
  );
};

export default App;
