import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const gymApi = {
  login: async (email: string, password: string) => {
    const response = await api.post("/gym/login", { email, password });
    return response.data;
  },
};

export default api;
