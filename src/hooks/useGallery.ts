import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {IGallery} from "@/models";
import context from "@/context/siteContext";
import { GalleryService } from "@/services/galleryService";


export const useGallery = ()=>{
  const [images,setImages] = useState<IGallery[]>([]);
  const {state:{user,axiosInstance}} = useContext(context);
  const service = useRef(new GalleryService(axiosInstance)).current;

  const ListGalleries = useCallback(async()=>{
    const resp = await service.listFilter(user?.userName);
    setImages(resp);
  },[service,setImages]);

  const CreateGallery = useCallback(async(data:IGallery)=>{
    const resp = await service.create(data);
    await ListGalleries();
    return resp;
  },[service,ListGalleries])
  const DeleteGallery = useCallback(async(id: number)=>{
    await service.delete(id);
    await ListGalleries();
  },[service,ListGalleries])

  useEffect(()=>{
    ListGalleries();
  },[ListGalleries])

  return {
    images,
    CreateGallery,
    DeleteGallery,
  }
}
