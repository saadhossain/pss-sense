import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CiMenuFries } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose, IoMdLogOut } from "react-icons/io";
import { Link, useLocation } from 'react-router-dom';
import { DataContext, DataContextType } from '../context/AuthProvider';
import useUser from '../hooks/useUser';

const DashboardSidebar = () => {
    const [collapseUser, setCollapseUser] = useState(true);
    const [collapseDevice, setCollapsDevice] = useState(true);
    const { user, logOut } = useContext(DataContext) as DataContextType;
    //Get LoggedIn user from database
    const { loggedInUser } = useUser(user?.email);
    const handleSignOut = () => {
        logOut();
        localStorage.removeItem('AccessToken');
        toast.success('You are logged out...')
    }

    const [expand, setExpand] = useState(false);
    // Close the Nav based on pathname changed
    const location = useLocation();
    useEffect(() => {
        setExpand(false);
    }, [location.pathname]);
    return (
        <div>
            {/* Dashboard navigation section */}
            <div className='flex justify-between items-center bg-gray-800 mb-5 p-3 rounded-md md:hidden text-white'>
                <h4 className='text-xl font-semibold'>Navigation</h4>
                <div onClick={() => setExpand(!expand)}>
                    {
                        expand ? <IoMdClose className='w-6 h-6' /> : <CiMenuFries className='w-6 h-6' />
                    }
                </div>
            </div>
            <ul className={`w-11/12 flex flex-col gap-5 bg-gray-800 p-3 text-white rounded-md absolute md:static shadow-lg lg:shadow-none duration-700 ease-in-out z-40 ${expand ? 'top-32 right-[18px]' : 'top-[-600px] right-[18px]'}`}>
                <li><Link to='/dashboard'>Dashboard</Link></li>
                {/* Users dropdown */}
                <li className={`${loggedInUser.role !== 'admin' && 'hidden'}`}>
                    <div onClick={() => setCollapseUser(!collapseUser)} className='flex gap-2 items-center justify-between cursor-pointer'>
                        Users
                        <div>
                            {collapseUser ? <IoIosArrowDown /> : <IoIosArrowUp />}
                        </div>
                    </div>
                    <ul className={`${collapseUser && 'hidden'} ml-4`}>
                        <li className='border-l-2 border-primary my-2 pl-2 hover:bg-primary'><Link to='/dashboard/adduser'>Add User</Link></li>
                        <li className='border-l-2 border-primary my-2 pl-2 hover:bg-primary'><Link to='/dashboard/allusers'>All Users</Link></li>
                    </ul>
                </li>

                {/* Devices dropdown */}
                <li className={`${loggedInUser.role !== 'admin' && 'hidden'}`}>
                    <div onClick={() => setCollapsDevice(!collapseDevice)} className='flex gap-2 items-center justify-between cursor-pointer'>
                        Devices
                        <div>
                            {collapseDevice ? <IoIosArrowDown /> : <IoIosArrowUp />}
                        </div>
                    </div>
                    <ul className={`${collapseDevice && 'hidden'} ml-4`}>
                        <li className='border-l-2 border-primary my-2 pl-2 hover:bg-primary'><Link to='/dashboard/add-device'>Add Device</Link></li>
                        <li className='border-l-2 border-primary my-2 pl-2 hover:bg-primary'><Link to='/dashboard/all-device'>All Devices</Link></li>
                    </ul>
                </li>
                <li><Link to='/dashboard'>Activity</Link></li>
                <li><Link to='/dashboard'>Setting</Link></li>
                <li onClick={() => handleSignOut()} className='cursor-pointer flex gap-1 items-center hover:ml-2 duration-500'>Logout <IoMdLogOut className='text-primary w-5 h-5' /></li>
            </ul>
        </div>
    )
}

export default DashboardSidebar