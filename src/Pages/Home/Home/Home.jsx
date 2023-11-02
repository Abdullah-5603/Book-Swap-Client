import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import axios from 'axios';
import BooksCard from '../BooksCard/BooksCard';
import Loader from '../../Shared/Loader/Loader';

const Home = () => {

    const { data: allBooks = [], isLoading, isError } = useQuery({
        queryKey: ['allBooks'],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-books`)
            return response.data
        }
    })

    return (
        <div className='flex justify-center items-center mx-4 md:mx-10 my-4 md:my-10'>
            {isLoading &&<div className='mt-36'><Loader /></div>}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
                {
                    allBooks.map(book => <BooksCard data={book}/>)
                }
            </div>
        </div>
    );

};

export default Home;