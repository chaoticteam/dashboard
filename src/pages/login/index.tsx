import { useAuth } from "@/hooks";
import Form from "form-with-state";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { CSSProperties, useCallback, useEffect } from "react";
interface IUser{
  username:string;
  password: string;
}
export default function LoginPage(){
  const router = useRouter()
  const {login} = useAuth();
  const handleClick = useCallback(async (data:IUser)=>{
    login(data)
  },[])
  return (
    <div className='content'>
      <div className='panel'>
        <div style={{
              backgroundImage:"url(https://res.cloudinary.com/dd7jrtxu5/image/upload/v1696992603/login_svg.svg)",
              height:"100%",
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
            <Form.Submit label='login' style={{backgroundColor:"var(--secondary)"}} />
            <p>Don`t have an account yet?<Link href="/signup"> Sign up for free!</Link></p>
          </Form>
        </div>
      </div>
    </div>
  )
}
