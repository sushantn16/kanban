import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { getServerAuthSession } from '~/server/auth';
import SignInButton from './signinButton';
import SignOutButton from './signoutButton';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import Link from 'next/link';
import Navigation from './navigation';

const UserHeader = async () => {
    const session = await getServerAuthSession();


    return (
        <div className='flex justify-between border-b'>
            <Link className="p-3 text-3xl font-medium" href="/">
                Kanban
            </Link>
            {session &&
                <Navigation />
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
