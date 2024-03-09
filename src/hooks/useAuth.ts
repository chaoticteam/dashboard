import { useCallback, useContext, useEffect, useRef } from "react";
import {authService as AuthService } from "@/services";
import { IUser } from "@/models";
import context from "@/context/siteContext";
import { useRouter } from "next/router";
import axios from "axios";
import getConfig from "next/config";


const { publicRuntimeConfig } = getConfig();
const API_URL = publicRuntimeConfig.API_URL;

export const useAuth = () => {
  const router =useRouter();
	const {state,dispatch} = useContext(context);
  const authService	= useRef(new AuthService(state.axiosInstance)).current;


	const login= useCallback(async ({username,password}:{username: string,password: string})=>{
		if (!dispatch) return
    dispatch({type:"SET_STATUS_INSTANCE",payload:"loading"});
		try{
			const {user,token} = await authService.login(username,password);
      dispatch({type:"SET_AXIOS_TOKEN",payload:token||""})
			dispatch({type:"SET_USER",payload:user})
			localStorage.setItem("access_token",token)
      router.push("/");
		}catch(error){
      dispatch({type:"SET_STATUS_INSTANCE",payload:"error"});
      throw `Error Login user: ${username},\n ${error}`
		}
	},[])
	const signUp= useCallback(async (data: IUser)=>{
    if (!dispatch)  return
    dispatch({type:"SET_STATUS_INSTANCE",payload:"loading"});
		try{
      const {user,token} = await authService.signUp(data);
      dispatch({type:"SET_AXIOS_TOKEN",payload:token||""})
			dispatch({type:"SET_USER",payload:user})
			localStorage.setItem("access_token",token)
      router.push("/")
		}catch(error){
      dispatch({type:"SET_STATUS_INSTANCE",payload:"error"});
      throw `Error SignUp user: ${data.userName}`
		}
	},[])
	const getUserData= useCallback(async ()=>{
    if (!dispatch || !!state.user)  return
    try {
      const data =await authService.getData()
      dispatch({type:"SET_USER",payload:data});
    } catch (error) {
      dispatch({type:"SET_STATUS_INSTANCE",payload:"error"});
    }
	},[])
  useEffect(()=>{
    const token = localStorage.getItem("access_token");
    dispatch && token && dispatch({type:"SET_AXIOS_TOKEN",payload:token})
    getUserData()
    if (state.status == "loaded") router.push("/")
    if (state.status == "error" && router.pathname != "/signup") router.push("/login")
  },[])
	return {
    state,
    login,
    signUp,
	}}
