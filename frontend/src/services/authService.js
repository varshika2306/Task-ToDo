import api from "./axios.js";

export const authService = {
  async login(email, password) {
    const formData = new URLSearchParams();

    formData.append("username", email); // OAuth2 expects 'username'
    formData.append("password", password);

    const response = await api.post("/auth/login", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  },

  async register(name, email, password) {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    return response.data;
  },
};