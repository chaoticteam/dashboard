import { IProject } from "@/models";
import { IService } from "./iService";
import { Dictionary } from "@/models/utils";
import { AxiosInstance } from "axios";

export class ProjectService implements IService<IProject> {
  axiosInstance: AxiosInstance;
  constructor (axiosInstance: AxiosInstance){
    this.axiosInstance = axiosInstance;
  }
  list(): Promise<IProject[]> {
    throw new Error("Method not implemented.");
  }
  detail(id: number): Promise<IProject> {
    throw new Error("Method not implemented.");
  }
  async create(data: IProject): Promise<IProject> {
    const resp = await this.axiosInstance.post("/projects",data)
    return resp.data;
  }
  update(id: number, data: IProject): Promise<IProject> {
    throw new Error("Method not implemented.");
  }
  async partialUpdate(id: number, data: IProject | Dictionary): Promise<IProject> {
    const resp = await this.axiosInstance.patch(`projects/${id}`,data);
    return resp.data;
  }
  async delete(id: number): Promise<void> {
    await this.axiosInstance.delete(`/projects/${id}`);
  }
  async listFilter(slug?: string): Promise<IProject[]> {
    const resp = await this.axiosInstance.get("/projects",{params:{username: slug}})
    return resp.data;
  }

}
