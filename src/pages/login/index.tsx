import { useAuth } from "@/hooks";
import Form from "form-with-state";
import { NextPage } from "next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
interface IUser{
  username:string;
  password: string;
}
export const LoginPage:NextPage=(props)=>{
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect")
  const router = useRouter()
  const {login} = useAuth();
  const handleClick = useCallback(async (data:IUser)=>{
    try {
      const token = await login(data)
      if (!!redirect){
        window.location.replace(`${redirect}?token=${token}`)
      }else{
        router.push("/")
      }
    } catch (error) {
      console.log("failed login")
    }
  },[login,router,redirect])
  return (
    <div className='content'>
      <div className='panel'>
        <div style={{
              backgroundImage:"url(https://res.cloudinary.com/dd7jrtxu5/image/upload/v1696992603/login_svg.svg)",
              height:"10rem",
              width:"100%",
              backgroundSize:"contain",
              backgroundRepeat:"no-repeat",
              backgroundPosition: "center center",
            }}>
        </div>
          <p><a target='_black' href="https://www.freepik.es/vector-gratis/concepto-abstracto-sistema-control-acceso_12085707.htm">Imagen de vectorjuice</a> en Freepik</p>
        </div>
      <div>
        <div>
          <Form onSubmit={handleClick}>
            <Form.TextField label='user name' required name='username' />
            <Form.PasswordField required name='password'/>
            <div style={{display:"flex",justifyContent:"flex-end",margin:".3rem"}}>
              <a>Forgot your password?</a>
            </div>
            <Form.Submit label='login'/>
            <p>Don`t have an account yet?<Link href={`/signup/?redirect=${redirect}`}>Sign up for free!</Link></p>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default LoginPage;
