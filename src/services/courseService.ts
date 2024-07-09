import {ICourse, IUser, IUserAuth, Profile} from "@/models";
import { Dictionary } from "@/models/utils";
import {IService} from "@/services/iService";
import { AxiosInstance } from "axios";

export class CourseService implements IService<ICourse> {
  axiosInstance: AxiosInstance;

  constructor (axiosInstance: AxiosInstance,username?: string){
    this.axiosInstance = axiosInstance;
  }
  async list(): Promise<ICourse[]> {
    throw new Error("Method not implemented.");
  }
  async detail(id: number): Promise<ICourse> {
    throw new Error("Method not implemented.");
  }
  async create(data: ICourse): Promise<ICourse> {
    const resp = await this.axiosInstance.post(`/courses`,data);
    return resp.data;
  }
  async update(id: number, data: ICourse): Promise<ICourse> {
    throw new Error("Method not implemented.");
  }
  async partialUpdate(id: number, data: ICourse): Promise<ICourse> {
    const resp = await this.axiosInstance.patch(`/courses/${id}`,data);
    return resp.data;
  }
  async delete(id: number): Promise<void> {
    const resp = await this.axiosInstance.delete(`/courses/${id}`);
    return resp.data;
  }
  async listFilter(slug?: string): Promise<ICourse[]> {
    const {data} = await this.axiosInstance.get(`/courses?username=${slug}`);
    return data;
  }
}

export default CourseService;
