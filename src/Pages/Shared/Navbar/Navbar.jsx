import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiDownArrow, BiLeftArrow, BiSearch } from 'react-icons/bi'
import { FaBars, FaSlack } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../Loader/Loader';
import SearchBookCard from './SearchBookCard';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [categoryOpen, setCategoryOpen] = useState(false)
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
    const handleOpenControl = () => {
        setIsOpen(!isOpen);
        setOpenSearch(false);
        setCategoryOpen(false);
    };

    const handleSearchControl = () => {
        setOpenSearch(!openSearch);
        setIsOpen(false);
        setCategoryOpen(false);
    };

    const handleCategoryControl = () => {
        setCategoryOpen(!categoryOpen);
        setOpenSearch(false);
    };

    return (
        <nav className='relative'>
            <div className="navbar bg-amber-600">
                <div className="navbar-start justify-between w-full">
                    <a className="text-xl md:text-2xl uppercase font-bold">Book Swap</a>
                    <div className='hidden md:flex relative border-2 border-gray-800 w-1/2 rounded-t-lg'>
                        <input onChange={(e) => setSearchText(e.target.value)} className='p-2 w-full bg-transparent rounded-lg text-black placeholder:text-gray-700 focus:outline-none' type="text" name="search" placeholder='Search by book Title here' id="" />
                        <BiSearch className='h-6 w-6 absolute right-0 m-2 text-gray-800 cursor-pointer' />
                        {
                            searchText.length > 0 && (
                                <div className={`m-auto absolute top-10 w-full bg-gray-300 p-5 ${searchBooks.length > 5 ? 'h-96 overflow-y-auto' : ''}`}>
                                    {isLoading ? <Loader /> : searchBooks.length > 0 && searchText.length > 0 ? searchBooks.map((book, index) => <SearchBookCard book={book} key={index} />) : <p className='font-semibold text-black'>No result found</p>
                                    }
                                </div>
                            )
                        }
                    </div>
                    <BiSearch className='h-6 absolute right-32 md:hidden lg:hidden w-6 text-gray-800 cursor-pointer' onClick={handleSearchControl} />
                    <Link className=' absolute right-11 md:hidden lg:hidden font-semibold text-white px-3 py-2 rounded-md bg-orange-900 hover:bg-transparent hover:text-orange-900' to='/'><button>Sign In</button></Link>
                    {
                        isOpen ? <GrClose className='w-5 h-5 cursor-pointer block md:hidden lg:hidden' onClick={handleOpenControl} /> : <FaBars className='w-5 h-5 cursor-pointer block md:hidden lg:hidden' onClick={handleOpenControl} />
                    }
                </div>
                <div className="navbar-end hidden lg:flex">
                    <div className="flex flex-row items-center space-x-4 md:space-x-8">
                        <div><Link className='font-bold hover:text-orange-900' to='/'>Home</Link></div>
                        <Menu as="div" className="relative text-left hidden md:inline-block lg:inline-block">
                            <div>
                                <Menu.Button className="rounded-md font-bold hover:text-orange-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                    Category
                                </Menu.Button>
                            </div>
                            <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                                <Menu.Items className="absolute flex flex-col mt-3 w-max -right-1/2 rounded-md bg-white shadow-2xl focus:outline-none">
                                    <div className="px-1 py-1">
                                        <Menu.Item>
                                            {({ active }) => (<Link to='/' className={`${active ? 'bg-violet-600 text-white' : 'text-black'} flex w-full font-semibold items-start rounded-md px-2 py-1`}>Home</Link>)}
                                        </Menu.Item>
                                    </div>
                                    <div className="px-1 py-1">
                                        <Menu.Item>
                                            {({ active }) => (<Link to='/' className={`${active ? 'bg-violet-600 text-white' : 'text-black'} flex w-full font-semibold items-start rounded-md px-2 py-1`}>Home Contact</Link>)}
                                        </Menu.Item>
                                    </div>
                                    <div className="px-1 py-1">
                                        <Menu.Item>
                                            {({ active }) => (<Link to='/' className={`${active ? 'bg-violet-600 text-white' : 'text-black'} flex w-full font-semibold items-start rounded-md px-2 py-1`}>Home Contact About</Link>)}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        <div><Link className='font-bold hover:text-orange-900' to='/'>Contact</Link></div>
                        <div><Link className='font-bold hover:text-orange-900' to='/'>About</Link></div>
                        <Link to='/'><button className='hidden md:flex lg:flex font-semibold text-white px-3 py-2 rounded-md bg-orange-900 hover:bg-transparent hover:text-orange-900'>Sign In</button></Link>
                    </div>
                </div>
            </div>
            {
                openSearch && (
                    <div className='m-auto md:hidden lg:hidden absolute w-full bg-slate-700 p-2'>
                        <input onChange={(e) => setSearchText(e.target.value)} className='p-2 my-2 border-b-2 border-white w-full bg-transparent rounded-lg text-white placeholder:text-white focus:outline-none' type="text" name="" placeholder='Search by book Title here' id="" />
                        {
                            searchText.length > 0 && (
                                <div className={`m-auto md:hidden lg:hidden absolute w-11/12 bg-gray-300 p-5 ${searchBooks.length > 5 ? 'h-96 overflow-y-auto' : ''}`}>
                                    {isLoading ? <Loader /> : searchBooks.length > 0 ?
                                        searchBooks.map((book, index) => <SearchBookCard book={book} key={index} />) : <p className='font-semibold text-black'>No result found</p>
                                    }
                                </div>
                            )
                        }
                    </div>
                )
            }
            {
                isOpen && (
                    <div className={`bg-gray-200 p-2 w-full md:hidden lg:hidden`}>
                        <Link to='/'> <div className='font-semibold px-2 hover:scale-95 mx-2 cursor-pointer hover:text-orange-900 mt-1 border-l-4 border-orange-900'>Home</div></Link>
                        <div onClick={handleCategoryControl} className='font-semibold px-2 hover:scale-95 mx-2 cursor-pointer hover:text-orange-900 mt-1 border-l-4 border-orange-900'>Category</div>
                        {
                            categoryOpen && (
                                <div className={`bg-white p-2 m-2 w-full md:hidden lg:hidden`}>
                                    <Link to='/'><div className='font-semibold px-2 py-1 rounded-md cursor-pointer hover:bg-orange-900 hover:text-white'>Home</div></Link>
                                    <Link to='/'><div className='font-semibold px-2 py-1 rounded-md cursor-pointer hover:bg-orange-900 hover:text-white'>Contact</div></Link>
                                    <Link to='/'><div className='font-semibold px-2 py-1 rounded-md cursor-pointer hover:bg-orange-900 hover:text-white'>About</div></Link>
                                </div>
                            )
                        }
                        <Link to='/'><div className='font-semibold px-2 hover:scale-95 mx-2 cursor-pointer hover:text-orange-900 mt-1 border-l-4 border-orange-900'>Contact</div></Link>
                        <Link to='/'><div className='font-semibold px-2 hover:scale-95 mx-2 cursor-pointer hover:text-orange-900 mt-1 border-l-4 border-orange-900'>About</div></Link>
                    </div>
                )
            }

        </nav>
    );
};
export default Navbar;