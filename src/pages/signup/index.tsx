import React, { useCallback } from 'react';
import Form from 'form-with-state';
import { useAuth } from '@/hooks';
import { IUserSignup } from '@/models';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SignUp() {
  const router = useRouter()
	const {signUp} = useAuth()
  const handleClick = useCallback(async (data:IUserSignup)=>{
    try {
      await signUp(data)
      router.push("/")
    } catch (error) {
      console.log("failed signup")
    }
  },[signUp,router])
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
            <div className='signup'>
              <Form.TextField label='First Name' required name='firstName' />
              <Form.TextField label='Last Name' required name='lastName' />
              <Form.TextField label='user name' required name='userName' />
              <Form.TextField label='Email' required name='email' />
              <Form.PasswordField label='password' required name='password' />
              <Form.PasswordField label='confirm password' required name='confirmPassword' />
            </div>
            <Form.Submit label='sign up'/>
            <p className="signin">Already have an acount?<Link href="/login">login</Link> </p>
          </Form>
        </div>
      </div>
      <style jsx>{`
      .signup{
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: start;
      }
      `}</style>
    </div>
	);
}
