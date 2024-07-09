import { useCallback, useContext, useEffect, useRef } from "react";
import {AuthService } from "@/services";
import { IUser } from "@/models";
import context from "@/context/siteContext";
import { useRouter } from "next/router";

export const useAuth = () => {
  const router =useRouter();
	const {state,dispatch} = useContext(context);

  const authService	= useRef(new AuthService(state.axiosInstance)).current;

  const UnAuthhorized = useCallback(()=>{
    if (state.status== "error") return;
    dispatch && dispatch({type:"SET_STATUS_INSTANCE",payload:"error"});
  },[dispatch,state.status])

	const login= useCallback(async ({username,password}:{username: string,password: string})=>{
		if (!dispatch) return
    dispatch({type:"SET_STATUS_INSTANCE",payload:"loading"});
		try{
			const {user,token} = await authService.login(username,password);
			dispatch({type:"SET_USER",payload:user})
      router.push("/")
      return token;
		}catch(error){
      UnAuthhorized()
      throw error;
		}
	},[UnAuthhorized,authService,dispatch,router])

	const logout= useCallback(async ()=>{
		try{
      await authService.logout();
      dispatch && dispatch({type:"SET_USER"});
      router.push("/login")
		}catch(error){
      UnAuthhorized()
		}
	},[UnAuthhorized,authService,dispatch,router])

	const signUp= useCallback(async (data: IUser)=>{
    if (!dispatch)  return
    dispatch({type:"SET_STATUS_INSTANCE",payload:"loading"});
		try{
      const {user,token} = await authService.signUp(data);
			dispatch({type:"SET_USER",payload:user})
      router.push("/")
      return token;
		}catch(error){
      UnAuthhorized();
      throw error;
		}
	},[UnAuthhorized,authService,dispatch,router])

  const GetUserData = useCallback(async()=>{
		if (!dispatch) return
    try {
      const user = await authService.getData();
      dispatch({type:"SET_USER",payload:user})
    } catch (error) {

    }
  },[authService,dispatch])


  useEffect(()=>{
    GetUserData();
  },[GetUserData])

	return {
    state,
    login,
    signUp,
    logout,
	}}
