/* eslint-disable @typescript-eslint/no-explicit-any */
import { routes } from "@/routes";
import { BaseService } from "./service";

class AuthService extends BaseService {
  async login(email: string, password: string): Promise<any> {
    const response = await this.post(routes.api.login, { email, password });
    return response.data;
  }

  async register(
    name: string,
    lastname: string,
    email: string,
    password: string
  ) {
    const response = await this.post(routes.api.register, {
      name,
      lastname,
      email,
      password,
    });
    return response.data;
  }

  async getme(token: string): Promise<any> {
    const response = await this.get(routes.api.me, {
      headers: { Authorization: `${token}` },
    });
    return response.data;
  }
}

const baseURL = import.meta.env.VITE_API_BASE_URL || "";
const authService = new AuthService(baseURL);
export default authService;
