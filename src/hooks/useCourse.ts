import { useCallback, useContext, useEffect, useRef, useState } from "react"
import context from "@/context/siteContext"
import { CourseService } from "@/services/"
import { ICourse,} from "@/models"

export const useCourse=()=>{
  const [courses,setCourses] = useState<ICourse[]>([]);
  const {state:{user,axiosInstance}} = useContext(context);
  const service = useRef(new CourseService(axiosInstance)).current

  const ListCourses = useCallback(async ()=>{
    const courses = await service.listFilter(user?.userName);
    setCourses(courses)
  },[service,setCourses])

  const CreateCourse = useCallback(async(data: any)=>{
    console.log(data)
    await service.create(data);
  },[service])

  const UpdateCourse = useCallback(async(model: ICourse)=>{
    await service.partialUpdate(model.id,model)
    await ListCourses()
  },[service,ListCourses])

  const DeleteCourse = useCallback(async (model: ICourse)=>{
    await service.delete(model.id);
    await ListCourses()
  },[service,ListCourses])

  useEffect(()=>{
    ListCourses()
  },[ListCourses])

  return {
    courses,
    CreateCourse,
    UpdateCourse,
    DeleteCourse,
  }
}
