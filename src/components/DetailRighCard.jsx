'use client'
import React from 'react';
import { EditModal } from './EditModal';
import { DeleteModal } from './DeleteModal';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { authClient } from '@/lib/auth-client';

const DetailRighCard = ({ destination }) => {

    const {
        price,
        duration,
        departureDate,
        _id,
        destinationName,
        imageUrl,
        country

    } = destination;

    const {
        data: session,
    } = authClient.useSession();

    const user = session?.user;


    const handleBooking = async () => {
        const bookingData = {
            userId: user?.id,
            userImage: user?.image,
            userName: user?.name,
            destinationId: _id,
            destinationName,
            price,
            imageUrl,
            country,
            departureDate: new Date(departureDate)
        }
        // console.log('Booking Data ', bookingData)

        const { data: tokenData } = await authClient.token();
        // console.log(tokenData, ' token data from fe')

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Berar ${tokenData?.token}`
            },

            body: JSON.stringify(bookingData)
        })

        const data = await res.json();

        if (data) {
            alert('SUccess')
        }
    }

    return (
        <div>
            <div className="lg:col-span-1">

                <div className="sticky top-8 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">

                    <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-500 font-medium">Price per person</span>
                        <span className="text-3xl font-black text-blue-700">${price}</span>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl text-blue-700">
                            <div className="flex items-center gap-3">
                                <FaClock />
                                <span className="font-bold">Duration</span>
                            </div>
                            <span className="font-medium">{duration}</span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl text-orange-700">
                            <div className="flex items-center gap-3">
                                <FaCalendarAlt />
                                <span className="font-bold">Departure</span>
                            </div>
                            <span className="font-medium">{departureDate}</span>
                        </div>
                    </div>

                    <button onClick={handleBooking}
                        className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all shadow-lg active:scale-95 mb-4">
                        Book This Trip
                    </button>

                    <EditModal destination={destination}></EditModal>

                    <div className="mt-2">
                        <DeleteModal destination={destination} />
                    </div>

                    <p className="text-center text-gray-400 text-xs px-4">
                        By clicking Book This trip, you agree to our terms of service and travel insurance policy.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DetailRighCard;