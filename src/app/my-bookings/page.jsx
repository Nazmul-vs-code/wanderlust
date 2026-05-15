import MyBookingCard from '@/components/MyBookingCard';
import { auth } from '@/lib/auth';
import { authClient } from '@/lib/auth-client';
import { headers } from 'next/headers';
import React from 'react';

const MyBookingsPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    });

    const { token } = await auth.api.getToken({
        headers: await headers()
    })


    const user = session?.user;
    const { id } = user;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    const bookings = await res.json();

    // console.log(data, ' data here')


    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h1 className='text-2xl font-semibold'>My bookings {bookings.length}</h1>

            <div>
                {
                    bookings.map(b => <MyBookingCard key={b._id} b={b} />)
                }
            </div>

        </div>
    );
};

export default MyBookingsPage;