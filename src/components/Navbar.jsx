'use client'
import { authClient } from '@/lib/auth-client';
import { Avatar } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {

    const {
        data: session,
    } = authClient.useSession();

    const user = session?.user;

    const handleLogOut = async () => {
        await authClient.signOut();
    }

    return (
        <div>
            <nav className='justify-between p-5 flex container mx-auto'>
                <ul className='flex gap-4'>
                    <li><Link href={`/`}>Home</Link></li>
                    <li><Link href={`/destinations`}>Destinations</Link></li>
                    <li><Link href={`/my-bookings`}>My Bookings</Link></li>
                    <li><Link href={`/add-destination`}>add-destination</Link></li>
                </ul>

                <div>
                    <Image alt='lol'
                        height={100} width={150}
                        src={`/assets/logo.png`}></Image>
                </div>

                <ul className='flex gap-4'>
                    {
                        user ? <ul className='flex items-center gap-2'>
                            <li><Link href={`/Profile`}>Profile</Link></li>
                            <Avatar>
                                <Avatar.Image alt="John Doe" src={user?.image} />
                                <Avatar.Fallback>JD</Avatar.Fallback>
                            </Avatar>

                            <li><Link onClick={() => handleLogOut()}
                             href={`/`}>Logout</Link></li>

                        </ul> : <>
                            <li><Link href={`/login`}>login</Link></li>
                            <li><Link href={`/signup`}>signup</Link></li>

                        </>
                    }
                </ul>


            </nav>
        </div>
    );
};

export default Navbar;