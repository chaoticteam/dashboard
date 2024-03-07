import {IUser, IUserAuth} from "@/models";
import {IServiceAuth} from "@/services/iService";
import axios, { AxiosInstance } from "axios";

export class authService implements IServiceAuth{
	axios: AxiosInstance;
	constructor(axiosInstance?:AxiosInstance){
			this.axios = axiosInstance || axios.create()
	}
	async login(username: string, password: string): Promise<IUserAuth> {
		const response = await this.axios.post(`/auth/login`,{
			username,
			password
		})
		return response.data;
	}
	async getData(): Promise<IUser> {
		const response = await this.axios.get(`/auth/userdata`)
		return response.data;
	}
	async signUp(data:IUser): Promise<IUserAuth> {
		const response = await this.axios.post(`/auth/signup`,data)
		return response.data;
	}
}

export default authService;
