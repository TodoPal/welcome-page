import axios from "axios";
import { format } from "date-fns";

const api = axios.create({
  baseURL: "http://localhost:8080/api/users"
});

async function registerUser(username: string, password: string): Promise<string> {
  const userInputDto = {
    username,
    password,
    joined: format(new Date(), "yyyy.MM.dd HH:mm")
  };

  const response = await api.post<string>("", userInputDto)
  return response.data;
}

export { registerUser };