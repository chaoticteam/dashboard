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
  const {isReady} =useRouter();
	const {state,dispatch} = useContext(context);
	const authService	= useRef<AuthService>(new AuthService(state.axiosInstance)).current;

	const login= useCallback(async ({username,password}:{username: string,password: string})=>{
		if (!dispatch) return
		try{
			const resp = await authService.login(username,password);
			dispatch({type:"SET_USER",payload:resp.user})
			localStorage.setItem("access_token",resp.token)
		}catch(error){
      dispatch({type:"SET_STATUS_INSTANCE",payload:"error"});
		}
	},[])
	const signUp= useCallback(async (data: IUser)=>{
    if (!dispatch) return
		try{
			const resp = await authService.signUp(data);
			dispatch({type:"SET_USER",payload:resp.user})
			localStorage.setItem("access_token",resp.token)
		}catch(error){
      dispatch({type:"SET_STATUS_INSTANCE",payload:"error"});
		}
	},[])
	const getUserData= useCallback(async ()=>{
		if (!dispatch) return
      authService.getData().then(resp=>{
        dispatch({type:"SET_USER",payload:resp})
				return (resp)
			}).catch(error=>{
        throw "Get User Data"
			}).finally(()=>{
        dispatch({type:"SET_STATUS_INSTANCE",payload:"loaded"})
      })
	},[])
	useEffect(()=>{
		if (!dispatch) return
    const token = localStorage.getItem("access_token");
    dispatch({type:"SET_AXIOS_INSTANCE",payload:axios.create({
      baseURL:API_URL,
      headers:{
        Authorization:token?`Bearer ${token}`:"",
        Accept:'application/json',
        'Content-Type':'application/json',
      }
    })})
		token && getUserData();
	},[getUserData,isReady])
	return {
    state,
    login,
    signUp,
	}}
