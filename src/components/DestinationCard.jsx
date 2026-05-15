import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';
import { FaMapMarkerAlt, FaRegClock, FaCalendarAlt } from 'react-icons/fa';

const DestinationCard = ({ destination }) => {
    const {
        destinationName,
        country,
        category,
        price,
        duration,
        departureDate,
        imageUrl,
        description,
        _id
    } = destination;

    return (
        <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200 hover:shadow-2xl transition-all duration-300 group">
            {/* Image Section with Price Tag */}
            <div className="relative h-56 overflow-hidden">
                <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={imageUrl || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"}
                    alt={destinationName}
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {category}
                    </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm">
                    <span className="text-blue-700 font-bold text-lg">${price}</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span>{country}</span>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {destinationName}
                </h2>

                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {description}
                </p>

                {/* Footer Info */}
                

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                        <FaRegClock />
                        {duration}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                        <FaCalendarAlt />
                        {departureDate}
                    </div>
                </div>

                <Button variant='outline' className={`bg-green-500 w-full`} >
                    <Link href={`/destinations/${_id}`}> Book now </Link>
                    </Button>
            </div>
            <Button> Edit </Button>
        </div>
    );
};

export default DestinationCard;