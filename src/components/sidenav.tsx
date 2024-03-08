import React from 'react'
import { getServerAuthSession } from '~/server/auth';
import { Button } from './ui/button';
import Link from 'next/link';

const Sidenav = async () => {
    const session = await getServerAuthSession();
    return (
        <div className='p-3 w-2/12 border-r h-dvh'>
            <p className='text-4xl'>Kanban</p>
            {session &&
                <div className='flex flex-col mt-1'>
                    <Button variant={"link"} className='block' asChild><Link href={'/quest'}>Quest</Link></Button>
                    <Button variant={"link"} className='block' asChild><Link href={'/active'}>Active Tasks</Link></Button>
                    <Button variant={"link"} className='block' asChild><Link href={'/compeleted'}>Compeleted Tasks</Link></Button>
                </div>
            }
        </div>
    )
}
export default Sidenav;