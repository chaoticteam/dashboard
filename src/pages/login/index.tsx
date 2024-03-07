import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import React, { CSSProperties, useCallback, useEffect } from "react";

interface IProps extends CSSProperties{

}

export default function LoginPage(props:IProps){
  const {state,login} = useAuth();
  const handleClick = useCallback(async ()=>{
    try {

    } catch (error) {
      console.log(error)
    }
  },[])
  return (
    <div>
      <h1 onClick={handleClick}>Login</h1>
    </div>
  )
}
