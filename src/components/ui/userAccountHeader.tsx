import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { getServerAuthSession } from '~/server/auth';
import SignInButton from './signinButton';
import SignOutButton from './signoutButton';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Button } from './button';
import Link from 'next/link';

const UserHeader = async () => {
    const session = await getServerAuthSession();


    return (
        <div className='flex justify-between'>
                <p className='text-4xl'>Kanban</p>
                {session &&
                <div className='flex'>
                        <Button variant={"link"} className='block' asChild><Link href={'/quest'}>Quest</Link></Button>
                        <Button variant={"link"} className='block' asChild><Link href={'/active'}>Active Tasks</Link></Button>
                        <Button variant={"link"} className='block' asChild><Link href={'/compeleted'}>Compeleted Tasks</Link></Button>
                        </div>
                }
            {session ?
                <DropdownMenu>
                    <DropdownMenuTrigger className='flex items-center  p-3'>
                        <p className="mr-3">{session.user.name}</p>
                        <Avatar>
                            <AvatarImage src={session?.user.image ?? ''} />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem><SignOutButton /></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                :
                <SignInButton />
            }
        </div>

    );
};

export default UserHeader;
