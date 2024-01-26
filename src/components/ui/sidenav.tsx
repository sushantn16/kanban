import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { getServerAuthSession } from '~/server/auth';
import { Button } from './button';
import SignInButton from './signinButton';
import SignOutButton from './signoutButton';
import Link from 'next/link';
import { Separator } from './separator';

const Sidenav = async () => {
    const session = await getServerAuthSession();
    return (
        <div className='p-3 w-2/12 border-r h-dvh'>
            <p className='text-4xl'>Kanban</p>
            {session ?
                session &&
                <>
                <div className='mt-3 flex items-center'>
                    <p className='mr-3'>{session.user.name}</p>
                    <Avatar>
                        <AvatarImage src={session?.user.image ?? ''} />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    
                </div>
                <SignOutButton/>
                <Separator className='mt-2'/>
                <div className='flex flex-col mt-1'>
                    <Button variant={"link"} className='block' asChild><Link href={'/quest'}>Quest</Link></Button>
                    <Button variant={"link"} className='block' asChild><Link href={'/active'}>Active Tasks</Link></Button>
                    <Button variant={"link"} className='block' asChild><Link href={'/compeleted'}>Compeleted Tasks</Link></Button>
                    
                </div>
                </>
                :
                <SignInButton />
            }
        </div>
    )
}
export default Sidenav;