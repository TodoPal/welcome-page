import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/auth"
});

async function loginUser(username: string, password: string): Promise<string> {
  const userInputDto = {
    username,
    password
  };

  const response = await api.post<string>("/login", userInputDto)
  return response.data;
}

async function loginWithJwt(jwt: string): Promise<string> {
  const response = await api.post<string>("/loginWithJwt", jwt, {
    headers: {
      "Content-Type": "text/plain"
    }
  })
  return response.data;
}

export { loginUser, loginWithJwt };