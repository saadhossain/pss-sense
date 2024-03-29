import { useContext, useEffect, useState } from 'react';
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { LuLogIn } from "react-icons/lu";
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/PSS-Sense.svg';
import { DataContext, DataContextType } from '../context/AuthProvider';
import UserAvater from './UserAvater';

const Header = () => {
  const [expand, setExpand] = useState(false);
  // Close the Nav based on pathname changed
  const location = useLocation();
  useEffect(() => {
    setExpand(false);
  }, [location.pathname]);

  //Get logged in User from the data context
  const { user } = useContext(DataContext) as DataContextType;
  return (
    <div className='bg-white py-2 shadow-sm'>
      <div className='w-11/12 lg:w-10/12 mx-auto flex justify-between items-center'>
        <Link to='/' className='flex gap-2 items-end'><img src={logo} alt='PSS-Sense' className='w-10' /><h3 className='font-semibold text-lg text-primary'>PSS-Sense</h3></Link>
        <div className='flex items-center gap-2'>
          <ul className={`lg:flex items-center gap-6 bg-white w-full font-semibold absolute lg:static py-3 lg:py-2 px-10 shadow-lg lg:shadow-none duration-700 ease-in-out z-40 text-primary ${expand ? 'top-12 right-0' : 'top-[-600px] right-0'}`}>
            <li><NavLink to='/' className='flex gap-1 mb-3 lg:mb-0'>Home</NavLink></li>
            <li><NavLink to='/services' className='flex gap-1 mb-3 lg:mb-0'>Services</NavLink></li>
            <li><NavLink to='/pricing' className='flex gap-1 mb-3 lg:mb-0'>Pricing</NavLink></li>
            <li><NavLink to='/contact' className='flex gap-1 mb-3 lg:mb-0'>Contact</NavLink></li>
          </ul>
          {/* Login and User Profile Icon */}
          <div>
            {
              user ? <UserAvater /> : <NavLink to='/login'><LuLogIn className='w-6 h-6 text-primary' /></NavLink>
            }
          </div>
          <div onClick={() => setExpand(!expand)} className='lg:hidden text-primary'>
            {
              expand ? <IoMdClose className='w-6 h-6' /> : <CiMenuFries className='w-6 h-6' />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
