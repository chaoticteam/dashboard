import { IUser } from "@/models";
import { Dictionary } from "@/models/utils";
import { IService } from "@/services/";
import axios from "axios";

export class UserService implements IService<IUser> {
  partialUpdate(id: number, data: Dictionary): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
  async getUserNames(): Promise<string[]> {
    const response = await	axios.get(`/users`)
    return response.data;
  }
  list(): Promise<IUser[]> {
    throw new Error("Method not implemented.");
  }
  detail(id: number): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
  create(data: IUser): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
  update(id: number, data: IUser): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
  patch(id: number, data: Dictionary): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  listFilter?(slug: string): Promise<IUser[]> {
    throw new Error("Method not implemented.");
  }
}

export default UserService;
