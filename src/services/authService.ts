import {IUser, IUserAuth, Profile} from "@/models";
import { Dictionary } from "@/models/utils";
import {IServiceAuth} from "@/services/iService";
import axios, { AxiosInstance } from "axios";

export class authService implements IServiceAuth{
  async login(username: string, password: string): Promise<IUserAuth> {
    const response = await axios.post(`/auth/login`,{
      username,
      password
    })
    return response.data;
  }
  async logout(): Promise<void> {
    await axios.delete(`/auth/logout`)
  }
	async getData(): Promise<IUser> {
    const response = await axios.get(`/auth/userdata`)
		return response.data;
	}
	async signUp(data:IUser): Promise<IUserAuth> {
		const response = await axios.post(`/auth/signup`,data)
		return response.data;
	}
  async partialUpdate(data: Dictionary): Promise<IUser> {
    const response = await axios.patch(`/profile`,data)
    return response.data;
  }
}

export default authService;
