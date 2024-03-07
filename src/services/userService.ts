import { ICommentary } from "@/src/models";
import { IService} from "@/src/services/iService";
import axios,{ AxiosInstance } from "axios";

export class UserService implements IService<ICommentary> {
		axios: AxiosInstance;
		constructor(axiosInstance?: AxiosInstance) {
			if (axiosInstance)
				this.axios =axiosInstance
			else
				this.axios = axios.create({
					baseURL: "https://api.chaoticteam.com",
				})
		}
		async list(): Promise<ICommentary[]> {
			throw new Error("Method not implemented.");
		}
		async getUserNames(): Promise<string[]> {
				const response = await	this.axios.get(`/users`)
				return response.data;
		}
		async detail(id: number): Promise<ICommentary> {
				throw new Error("Method not implemented.");
		}
		async create(data: ICommentary): Promise<ICommentary>{
				const resp = await this.axios.post("/commentaries",data);
				return resp.data
		}
		update(id: number, data: ICommentary): Promise<ICommentary> {
				throw new Error("Method not implemented.");
		}
		async delete(id: number): Promise<void> {
				await this.axios.delete(`/commentaries/${id}`);
		}
		listFilter?(slug: string): Promise<ICommentary[]> {
				throw new Error("Method not implemented.");
		}
}

export default UserService;
