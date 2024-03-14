import { Telephone } from "@/models";
import { IService } from "./iService";
import { Dictionary } from "@/models/utils";
import axios from "axios";

export class TelephoneService implements IService<Telephone> {
  list(): Promise<Telephone[]> {
    throw new Error("Method not implemented.");
  }
  detail(id: number): Promise<Telephone> {
    throw new Error("Method not implemented.");
  }
  async create(data: Telephone): Promise<Telephone> {
    const response = await axios.post("/telephone",data);
    return response.data
  }
  update(id: number, data: Telephone): Promise<Telephone> {
    throw new Error("Method not implemented.");
  }
  partialUpdate(id: number, data: Dictionary): Promise<Telephone> {
    throw new Error("Method not implemented.");
  }
  async delete(id: number): Promise<void> {
    await axios.delete(`/telephone/${id}`);
  }
  listFilter?(slug: string): Promise<Telephone[]> {
    throw new Error("Method not implemented.");
  }

}
