import Image from "next/image"
import loginPicture from "/public/images/login-side.jpg"
import LoginCard from "@/app/components/Login_Components/LoginCard"

const Login = () => {
   
   return (
      <div className='grid-cols-1 grid grid-rows-1 lg:grid-cols-[25rem_1fr]'>
         <Image
            src={loginPicture}
            width={1000}
            height={1500}
            priority={true}
            alt='picture of spices on spoons'
            className='h-[100dvh] object-cover object-center w-[100vw] col-[1_/_-1] row-[1_/_-1] lg:col-[unset]'
         />
         <LoginCard className='col-[1_/_-1] row-[1_/_-1] lg:col-[unset] place-self-center'>
            Form
         </LoginCard>
      </div>
   )
}

export default Login
