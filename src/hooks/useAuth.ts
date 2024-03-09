import { useCallback, useContext, useEffect, useRef } from "react";
import {authService as AuthService } from "@/services";
import { IUser } from "@/models";
import context from "@/context/siteContext";
import { useRouter } from "next/router";
import getConfig from "next/config";


const { publicRuntimeConfig } = getConfig();
const API_URL = publicRuntimeConfig.API_URL;

export const useAuth = () => {
  const router =useRouter();
	const {state,dispatch} = useContext(context);
  const authService	= useRef(new AuthService(state.axiosInstance)).current;
  const UnAuthhorized = useCallback(()=>{
    dispatch && dispatch({type:"SET_STATUS_INSTANCE",payload:"error"});
    router.push("/login");
  },[dispatch,router])
	const login= useCallback(async ({username,password}:{username: string,password: string})=>{
		if (!dispatch) return
    dispatch({type:"SET_STATUS_INSTANCE",payload:"loading"});
		try{
			const {user,token} = await authService.login(username,password);
      dispatch({type:"SET_TOKEN",payload:token||""})
			dispatch({type:"SET_USER",payload:user})
			localStorage.setItem("access_token",token)
		}catch(error){
      UnAuthhorized()
		}
	},[UnAuthhorized,authService,dispatch])
	const signUp= useCallback(async (data: IUser)=>{
    if (!dispatch)  return
    dispatch({type:"SET_STATUS_INSTANCE",payload:"loading"});
		try{
      const {user,token} = await authService.signUp(data);
      dispatch({type:"SET_TOKEN",payload:token||""})
			dispatch({type:"SET_USER",payload:user})
			localStorage.setItem("access_token",token)
		}catch(error){
      UnAuthhorized()
		}
	},[UnAuthhorized,authService,dispatch])
	const getUserData= useCallback(async ()=>{
    if (!dispatch || !!state.user)  return
    try {
      const data =await authService.getData()
      dispatch({type:"SET_USER",payload:data});
    } catch (error) {
      UnAuthhorized();
    }
	},[UnAuthhorized,authService,dispatch,state.user])
  useEffect(()=>{
    if (!state.token){
      const token = localStorage.getItem("access_token");
      if (!token){
        dispatch && dispatch({type:"SET_STATUS_INSTANCE",payload:"error"});
        router.push("/login");
        return;
      }
      dispatch && token && dispatch({type:"SET_TOKEN",payload:token})
    }else{
      getUserData()
    }
  },[state.token,dispatch,getUserData,router])
	return {
    state,
    login,
    signUp,
	}}
