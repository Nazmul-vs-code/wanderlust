import { Button, Card, Chip } from '@heroui/react';
import Image from 'next/image';
import React from 'react';
import { HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineTrash } from 'react-icons/hi';
import { MdOutlinePayments } from 'react-icons/md';
import { CancelBookingAlert } from './CancelBoookingAlert';

const MyBookingCard = ({ b }) => {
    return (
        <div className="mb-4">
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="flex flex-col sm:flex-row items-center p-3 gap-4">

                    {/* Left: Image Section */}
                    <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                        <Image
                            alt={b.destinationName}
                            className="object-cover rounded-xl"
                            fill
                            src={b.imageUrl}
                        />
                    </div>

                    {/* Middle: Info Section */}
                    <div className="flex-grow flex flex-col gap-1 w-full">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-bold text-default-800">{b.destinationName}</h3>
                                <div className="flex items-center gap-1 text-default-500">
                                    <HiOutlineLocationMarker className="text-primary" />
                                    <span className="text-xs uppercase tracking-wider font-semibold">{b.country}</span>
                                </div>
                            </div>
                            <Chip size="sm" variant="flat" color="success" className="capitalize">
                                Confirmed
                            </Chip>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-default-600">
                            <div className="flex items-center gap-1">
                                <HiOutlineCalendar className="text-lg text-default-400" />
                                <span>
                                    {new Date(b.departureDate).toLocaleDateString('en-GB', {
                                        day: 'numeric', month: 'short', year: 'numeric'
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MdOutlinePayments className="text-lg text-default-400" />
                                <span className="font-bold text-default-800">${b.price}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Actions Section */}
                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-default-100 pt-3 sm:pt-0 sm:pl-4">
                        <Button

                            variant="outline"
                            size="sm"
                            className="font-medium rounded-none text-green-600 flex-grow sm:w-28"
                        >
                            Details
                        </Button>

                        <CancelBookingAlert bookingId={b._id} />
                    </div>

                </div>
            </Card>
        </div>
    );
};

export default MyBookingCard;