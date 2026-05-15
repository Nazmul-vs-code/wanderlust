import DestinationCard from '@/components/DestinationCard';
import React from 'react';

const DestinationPage = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`);
    const destinations = await res.json();
    // console.log(destinations , " destinations ")

    return (
        <div className='w-11/12 mx-auto p-5'>
            <h1 className='text-4xl font-semibold text-red-500'>All destinations</h1>
            <div className="grid grid-cols-3 gap-3.5">

                {
                    destinations.map(destination => <DestinationCard key={destination._id} destination={destination} />)
                }

            </div>
        </div>
    );
};

export default DestinationPage;