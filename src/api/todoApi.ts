import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTodos = async (limit: number, start: number) => {
  try {
    const response = await axios.get(
      `${API_URL}?_limit=${limit}&_start=${start}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};
