import { useCallback, useContext, useRef } from "react"
import context from "@/context/siteContext"
import { TelephoneService, authService } from "@/services/"
import { Dictionary } from "@/models/utils"
import { Telephone } from "@/models"

export const useProfile=()=>{
  const {dispatch} = useContext(context)
  const service = useRef(new authService()).current
  const telephoneService = useRef(new TelephoneService()).current
  const partialUpdate = useCallback(async(data:Dictionary)=>{
    try {
      const profile = await service.partialUpdate(data);
      dispatch && dispatch({type:"SET_USER",payload:profile})
    } catch (error) {
      console.log(error)
    }
  },[dispatch,service])
  const addTelephone = useCallback(async(data:Telephone)=>{
    try {
      await telephoneService.create(data)
      dispatch && dispatch({type:"ADD_TELEPHONE",payload:data})
    } catch (error) {
      console.log(error)
    }
  },[dispatch,telephoneService])
  const removeTelephone = useCallback(async(id:number)=>{
    try {
      await telephoneService.delete(id)
      dispatch && dispatch({type:"RM_TELEPHONE",payload:id})
    } catch (error) {
      console.log(error)
    }
  },[dispatch,telephoneService])
  return {
    partialUpdate,
    addTelephone,
    removeTelephone
  }
}
