import { IProject } from "@/models";
import context from "@/context/siteContext"
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ProjectService } from "@/services";


export const useProject = ()=>{
  const [projects,setProjects] = useState<IProject[]>([]);
  const {state:{user,axiosInstance}} = useContext(context)
  const service = useRef(new ProjectService(axiosInstance)).current

  const ListProjects = useCallback(async ()=>{
    const data = await service.listFilter(user?.userName)
    setProjects(data);
  },[service,setProjects,user]);

  const CreateProject = useCallback(async (data: any)=>{
    await service.create(data);
  },[service]);

  const EditProject = useCallback(async(id: number,data: IProject)=>{
    await service.partialUpdate(id,data);
    await ListProjects();
  },[ListProjects])

  const DeleteProject = useCallback(async(project:IProject)=>{
    await service.delete(project.id);
    ListProjects();
  },[ListProjects])

  useEffect(()=>{
    ListProjects()
  },[ListProjects])
  return {
    projects,
    CreateProject,
    EditProject,
    DeleteProject,
  }
}
