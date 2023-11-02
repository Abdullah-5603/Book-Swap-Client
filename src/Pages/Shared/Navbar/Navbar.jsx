import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiDownArrow, BiLeftArrow, BiSearch } from 'react-icons/bi'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../Loader/Loader';
import SearchBookCard from './SearchBookCard';

const Navbar = () => {
    const [isOpen, setISOpen] = useState(true)
    const [openSearch, setOpenSearch] = useState(false)
    const [searchText, setSearchText] = useState('')

    const { data: searchBooks = [], isLoading } = useQuery({
        queryKey: ['books', searchText],
        queryFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/search-books/${searchText}`)
            return response.data
        },
        enabled: searchText !== ''
    })
    console.log(searchBooks);

    return (
        <nav className='relative'>
            <div className="navbar bg-amber-600">
                <div className="navbar-start justify-between w-full">
                    <a className="text-xl md:text-2xl uppercase font-bold">Book Swap</a>
                    <div className='hidden md:flex relative border-2 border-gray-800 w-1/2 rounded-t-lg flex'>
                        <input onChange={(e) => setSearchText(e.target.value)} className='p-2 w-full bg-transparent rounded-lg text-black placeholder:text-gray-700 focus:outline-none' type="text" name="search" placeholder='Search by book Title here' id="" />
                        <BiSearch className='h-6 w-6 absolute right-0 m-2 text-gray-800 cursor-pointer' />
                        {
                            searchText.length > 0 && (
                                <div className={`m-auto absolute top-10 w-full bg-gray-300 p-5 ${searchBooks.length > 5 ? 'h-96 overflow-y-auto' : ''}`}>
                                    {isLoading ? <Loader /> : searchBooks.length > 0 && searchText.length > 0 ? searchBooks.map((book, index) =>  <SearchBookCard book={book} key={index}/>): <p className='font-semibold text-black'>No result found</p>
                                    }
                                </div>
                            )
                        }
                    </div>
                    <BiSearch className='h-6 absolute right-1/4 md:hidden lg:hidden w-6 text-gray-800 cursor-pointer' onClick={() => setOpenSearch(!openSearch)} />
                    <div className="md:hidden top-16 w-1/3 text-center">
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="inline-flex  justify-center rounded-md px-4 py-2 text-lg font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                    {isOpen ? <BiLeftArrow onClick={() => setISOpen(!isOpen)} /> : <BiDownArrow onClick={() => setISOpen(!isOpen)} />}
                                </Menu.Button>
                            </div>
                            <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                                <Menu.Items className="absolute mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="px-1 py-1 font-bold">
                                        <Menu.Item>
                                            {({ active }) => (<Link to='/' className={`${active ? 'text-violet-500' : 'text-black'} group flex w-full items-center rounded-md px-2 text-sm`}>Home</Link>)}
                                        </Menu.Item>
                                    </div>
                                    <div className="px-1 py-1 font-bold">
                                        <Menu.Item>
                                            {({ active }) => (<Link to='/' className={`${active ? 'text-violet-500' : 'text-black'} group flex w-full items-center rounded-md px-2 text-sm`}>Contact</Link>)}
                                        </Menu.Item>
                                    </div>
                                    <div className="px-1 py-1 font-bold">
                                        <Menu.Item>
                                            {({ active }) => (<Link to='/' className={`${active ? 'text-violet-500' : 'text-black'} group flex w-full items-center rounded-md px-2 text-sm`}>About</Link>)}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link className='font-bold hover:bg-white hover:text-cyan-500' to='/'>Home</Link></li>
                        <li><Link className='font-bold hover:bg-white hover:text-cyan-500' to='/'>Contact</Link></li>
                        <li><Link className='font-bold hover:bg-white hover:text-cyan-500' to='/'>About</Link></li>
                    </ul>
                </div>
            </div>
            {
                openSearch && (
                    <div className='m-auto md:hidden lg:hidden absolute w-full bg-slate-700 p-2'>
                        <input onChange={(e) => setSearchText(e.target.value)} className='p-2 my-2 border-b-2 border-white w-full bg-transparent rounded-lg text-white placeholder:text-white focus:outline-none' type="text" name="" placeholder='Search by book Title here' id="" />
                        {
                            searchText.length > 0 && (
                                <div className={`m-auto md:hidden lg:hidden absolute w-11/12 bg-gray-300 p-5 ${searchBooks.length > 5 ? 'h-96 overflow-y-auto' : ''}`}>
                                    { isLoading ? <Loader /> : searchBooks.length > 0 ?
                                        searchBooks.map((book, index) => <SearchBookCard book={book} key={index}/>) : <p className='font-semibold text-black'>No result found</p>
                                    }
                                </div>
                            )
                        }
                    </div>
                )
            }

        </nav>
    );
};

export default Navbar;