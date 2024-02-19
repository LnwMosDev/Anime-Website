import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import { FaSearch } from 'react-icons/fa';
import { BookOpenIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';

const NavItem = ({ link, name }) => (
  <li className='md:ml-8 md:my-0 my-7 font-semibold '>
    <Link to={link} className='text-gray-800 hover:text-blue-400 duration-500'>
      {name}
    </Link>
  </li>
);

const Header = () => {
  const [open, setOpen] = useState(false);

  const Links = [
    { name: 'HOME', link: '/' },
    // { name: 'เกี่ยวกับฉัน', link: '/AboutMe' },
    // { name: 'จัดการอนิเมะ', link: '/Admin' },
   
    { name: 'เข้าสู่ระบบ', link: '/LoginWithLocalStorageUser' },

    { name: 'Admin', link: '/LoginWithLocalStorage' },
   
  
  ];

  return (
    <div className='bg-white shadow-md p-2 fixed w-full top-0 z-50'>
      <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
        {/* logo section */}
        <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'>
          <BookOpenIcon className='w-7 h-7 text-blue-600 '  />
      
          <Link to="/" className="hover:text-indigo-600">
          <span>ANIME</span>
            </Link>
            
        </div>
        {/* Menu icon */}
        <div
          onClick={() => setOpen(!open)}
          className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'
        >
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>
        {/* link items */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-1 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-100 ease-in ${
            open ? 'top-12' : 'top-[-490px] text-l'
          }`}
        >
          {Links.map((link) => (
            <NavItem key={link.name} {...link} />
          ))}
          
        </ul>
      </div>
    </div>
  );
};

export default Header;
