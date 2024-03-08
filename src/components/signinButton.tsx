"use client"
import { signIn } from "next-auth/react";
import { Button } from './ui/button';

const SignInButton = () =>{
    return (
        <Button onClick={()=> signIn('google', { callbackUrl: window.location.href })}> Login with Google</Button>
    )

}
export default SignInButton;