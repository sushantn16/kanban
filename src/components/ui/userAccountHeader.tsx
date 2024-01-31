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

const UserHeader = async () => {
    const session = await getServerAuthSession();


    return (
        <div className='flex justify-end'>
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
