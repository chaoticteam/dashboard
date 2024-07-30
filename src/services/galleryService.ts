import { IGallery } from "@/models";
import { IService } from "./iService";
import { Dictionary } from "@/models/utils";
import { AxiosInstance } from "axios";

export class GalleryService implements IService<IGallery> {
  axiosInstance: AxiosInstance;

  constructor (axiosInstance: AxiosInstance){
    this.axiosInstance = axiosInstance;
  }
  list(): Promise<IGallery[]> {
    throw new Error("Method not implemented.");
  }
  detail(id: number): Promise<IGallery> {
    throw new Error("Method not implemented.");
  }
  async create(data: IGallery): Promise<IGallery> {
    const resp = await this.axiosInstance.post("/galleries",data);
    return resp.data;
  }
  update(id: number, data: IGallery): Promise<IGallery> {
    throw new Error("Method not implemented.");
  }
  partialUpdate(id: number, data: IGallery | Dictionary): Promise<IGallery> {
    throw new Error("Method not implemented.");
  }
  async delete(id: number): Promise<void> {
    await this.axiosInstance.delete(`/galleries/${id}`);
  }
  async listFilter(slug?: string): Promise<IGallery[]> {
    const response = await this.axiosInstance.get(`/galleries/?username=${slug}`);
    return  response.data;
  }

}
