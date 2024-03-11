import {IUser, IUserAuth} from "@/models";
import {IServiceAuth} from "@/services/iService";
import axios, { AxiosInstance } from "axios";

export class authService implements IServiceAuth{
  // axios: AxiosInstance;
	// constructor({ axiosInstance }: { axiosInstance: AxiosInstance; }){
  // 	this.axios = axiosInstance
  // }
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
}

export default authService;
