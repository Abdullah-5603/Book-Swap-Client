import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {BiDownArrow, BiLeftArrow} from 'react-icons/bi'

const Navbar = () => {
    const [isOpen, setISOpen] = useState(true)
    return (

        <div className="navbar bg-amber-600">
            <div className="navbar-start justify-between w-full">
                <a className="text-xl md:text-2xl uppercase font-bold">Book Swap</a>
                <div className="md:hidden top-16 w-1/3 text-center">
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex  justify-center rounded-md px-4 py-2 text-lg font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                { isOpen ?  <BiLeftArrow onClick={()=> setISOpen(!isOpen)}/> : <BiDownArrow onClick={()=> setISOpen(!isOpen)}/>  }
                            </Menu.Button>
                        </div>
                        <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                            <Menu.Items className="absolute mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1 font-bold">
                                    <Menu.Item>
                                        {({ active }) => (<Link to='/' className={`${active ? 'text-violet-500' : 'text-black' } group flex w-full items-center rounded-md px-2 text-sm`}>Home</Link>)}
                                    </Menu.Item>
                                </div>
                                <div className="px-1 py-1 font-bold">
                                    <Menu.Item>
                                        {({ active }) => (<Link to='/' className={`${active ? 'text-violet-500' : 'text-black'} group flex w-full items-center rounded-md px-2 text-sm`}>Contact</Link>)}
                                    </Menu.Item>
                                </div>
                                <div className="px-1 py-1 font-bold">
                                    <Menu.Item>
                                        {({ active }) => (<Link to='/' className={`${active ? 'text-violet-500' : 'text-black' } group flex w-full items-center rounded-md px-2 text-sm`}>About</Link>)}
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

    );
};

export default Navbar;