import { AxiosInstance } from "axios";
import { IUser, IUserAuth } from "../models";

export	interface IService<T> {
		axios?: AxiosInstance;
		baseUrl?: string;
		list(): Promise<T[]>;
		detail(id:number): Promise<T>;
		create(data:T): Promise<T>;
		update(id:number, data:T): Promise<T>;
		delete(id:number): Promise<void>;
		listFilter?(slug:string): Promise<T[]>;
}
export interface IServiceAuth{
		axios: AxiosInstance;
		login(username: string,password: string):Promise<IUserAuth>;
		getData():Promise<IUser>;
		signUp(data:IUser):Promise<IUserAuth>;
}
