import React from 'react';
import {
    FaMapMarkerAlt,
    FaCalendarAlt,


    FaGlobe,
    FaArrowLeft,
    FaCheckCircle
} from 'react-icons/fa';
import Link from 'next/link';

import DetailRighCard from '@/components/DetailRighCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const DestinationDetailsPage = async ({ params }) => {
    const { id } = await params;
    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    console.log(token)

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const data = await res.json();

    // In case the API returns an array or single object, we ensure we have the data
    const destination = Array.isArray(data) ? data[0] : data;

    const {
        destinationName,
        country,
        category,
        imageUrl,
        description,
    } = destination;



    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header / Navigation */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <Link
                    href="/destinations"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
                >
                    <FaArrowLeft /> Back to Destinations
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Image and Description */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Hero Image */}
                    <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
                        <img
                            src={imageUrl || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1"}
                            alt={destinationName}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-6 left-6">
                            <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg uppercase">
                                {category}
                            </span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">

                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{destinationName}</h1>

                        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-red-500" />
                                <span className="font-medium">{country}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaGlobe className="text-blue-500" />
                                <span className="font-medium">Global Explorer</span>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-800 mb-4">About this trip</h3>
                        <p className="text-gray-600 leading-relaxed text-lg mb-6">
                            {description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                                <FaCheckCircle className="text-green-500 text-xl" />
                                <span className="text-gray-700 font-medium">Free Cancellation</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                                <FaCheckCircle className="text-green-500 text-xl" />
                                <span className="text-gray-700 font-medium">Expert Local Guide</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Booking Sidebar */}

                <DetailRighCard destination={destination} />


            </div>
        </div>
    );
};

export default DestinationDetailsPage;