import { IUser, IUserAuth, Profile } from "../models";
import { Dictionary } from "@/models/utils";

export	interface IService<T> {
		list(): Promise<T[]>;
		detail(id:number): Promise<T>;
		create(data:T): Promise<T>;
		update(id:number, data:T): Promise<T>;
		partialUpdate(id:number, data:Dictionary): Promise<T>;
		delete(id:number): Promise<void>;
		listFilter?(slug:string): Promise<T[]>;
}
export interface IServiceAuth{
  login(username: string,password: string):Promise<IUserAuth>;
  logout():Promise<void>;
  getData():Promise<IUser>;
  signUp(data:IUser):Promise<IUserAuth>;
  partialUpdate(data:Dictionary): Promise<IUser>;
}
