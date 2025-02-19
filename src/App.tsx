import { Container, Typography, Button } from "@mui/material";

const App = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to My React TypeScript App with MUI
      </Typography>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </Container>
  );
};

export default App;
