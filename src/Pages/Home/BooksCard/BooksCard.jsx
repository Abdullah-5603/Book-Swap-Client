import React from 'react';

const BooksCard = ({ data }) => {
    const { title, image, status } = data;
    return (
        <div className='flex items-start flex-col border-2 rounded-lg border-gray-500 p-3 md:p-5'>
            <img className='m-auto w-auto h-80 md:h-96' src={image} alt="" />
            <p className='font-semibold text-md md:text-xl mt-2 md:mt-5'>Title: <span className='font-normal'>{title}</span></p>
            <button className='bg-lime-600 p-2 mt-2 rounded-lg text-white font-semibold w-full'>See Details</button>
        </div>
    );
};

export default BooksCard;