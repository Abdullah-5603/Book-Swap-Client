import React from 'react';

const SearchBookCard = ({book}) => {
    return (
        <a href={`/book-details/${book._id}`}>
            <div className='flex p-2 m-2 flex-row items-center bg-white'>
                <img className='w-20 h-24' src={book.image} alt="" />
                <div className='ml-5'>
                    <p className='font-semibold'>Title: {book.title}</p>
                    <p className='font-semibold'>Author: {book.author}</p>
                </div>
            </div>
        </a>
    );
};

export default SearchBookCard;