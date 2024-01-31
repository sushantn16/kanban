"use client"
import { signOut } from "next-auth/react";
import { Button } from './button';

const SignOutButton = () =>{
    return (
        <Button onClick={()=> signOut()} variant={"link"}>Logout</Button>
    )

}
export default SignOutButton;