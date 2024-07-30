import {IUser, IUserAuth, Profile} from "@/models";
import { Dictionary } from "@/models/utils";
import {IServiceAuth} from "@/services/iService";
import { AxiosInstance } from "axios";

export class AuthService implements IServiceAuth{
  axiosInstance: AxiosInstance;
  constructor (axiosInstance: AxiosInstance){
    this.axiosInstance = axiosInstance;
  }
  async login(username: string, password: string): Promise<IUserAuth> {
    const response = await this.axiosInstance.post(`/auth/login`,{
      username,
      password
    })
    return response.data;
  }
  async logout(): Promise<void> {
    await this.axiosInstance.delete(`/auth/logout`)
  }
	async getData(): Promise<IUser> {
    const response = await this.axiosInstance.get(`/auth/userdata`)
		return response.data;
	}
	async signUp(data:IUser): Promise<IUserAuth> {
		const response = await this.axiosInstance.post(`/auth/signup`,data)
		return response.data;
	}
  async partialUpdate(data: Dictionary): Promise<IUser> {
    const response = await this.axiosInstance.patch(`/profile`,data)
    return response.data;
  }
}

export default AuthService;
