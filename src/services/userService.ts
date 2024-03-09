import { IUser } from "@/models";
import { IService } from "@/services/";
import axios,{ AxiosInstance } from "axios";

export class UserService implements IService<IUser> {
		axios: AxiosInstance;
		constructor(axiosInstance?: AxiosInstance) {
			if (axiosInstance)
				this.axios =axiosInstance
			else
				this.axios = axios.create({
					baseURL: "https://api.chaoticteam.com",
				})
		}
		async list(): Promise<IUser[]> {
			throw new Error("Method not implemented.");
		}
		async getUserNames(): Promise<string[]> {
				const response = await	this.axios.get(`/users`)
				return response.data;
		}
		async detail(id: number): Promise<IUser> {
				throw new Error("Method not implemented.");
		}
		async create(data: IUser): Promise<IUser>{
				const resp = await this.axios.post("/commentaries",data);
				return resp.data
		}
		update(id: number, data: IUser): Promise<IUser> {
				throw new Error("Method not implemented.");
		}
		async delete(id: number): Promise<void> {
				await this.axios.delete(`/commentaries/${id}`);
		}
		listFilter?(slug: string): Promise<IUser[]> {
				throw new Error("Method not implemented.");
		}
}

export default UserService;
