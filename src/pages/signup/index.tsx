import React, { useCallback } from 'react';
import Form from 'form-with-state';
import { useAuth } from '@/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import styles from "./index.module.css"

export default function SignUp() {

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect")
  const router = useRouter()
	const {signUp} = useAuth()
  const handleClick = useCallback(async (data:any,_:any)=>{
    try {
      const token = await signUp(data)
      if (!!redirect){
        window.location.replace(`${redirect}?token=${token}`)
      }else{
        router.push("/")
      }
    } catch (error) {
      console.log("failed signup")
    }
  },[signUp,router,redirect])
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
          <Form className={styles.signup} initialState={{}} onSubmit={handleClick}>
            <Form.TextField label='First Name' required name='firstName' />
            <Form.TextField label='Last Name' required name='lastName' />
            <Form.TextField label='user name' required name='userName' />
            <Form.TextField label='Email' required name='email' />
            <Form.PasswordField label='password' required name='password' />
            <Form.PasswordField label='confirm password' required name='confirmPassword' />
            <Form.Submit name='signup' label='sign up'/>
            <p className="help-text">Already have an acount?<Link href={`/login/?redirect=${redirect}`}>login</Link> </p>
          </Form>
        </div>
      </div>
    </div>
	);
}
