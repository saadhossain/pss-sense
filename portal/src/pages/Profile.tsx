import { useContext, useState } from 'react';
import { FaUserEdit } from "react-icons/fa";
import { DataContext, DataContextType } from '../context/AuthProvider';

const Profile = () => {
    const { user } = useContext(DataContext) as DataContextType;
    console.log(user);
    const [editable, setEditable] = useState(false);
    return (
        <div className='inner-pg'>
            <h2 className='text-xl md:text-2xl font-semibold my-2 md:my-5 md:mt-10 border-l-4 border-primary pl-2 ml-3 md:ml-0'>Profile</h2>
            <div className='bg-gradient p-10 rounded-lg relative'>
                <div onClick={() => setEditable(!editable)} className='flex gap-1 absolute right-5 top-2 text-white cursor-pointer font-semibold'>
                    <FaUserEdit className='w-5 h-5' />
                    <p>Edit</p>
                </div>
                <div className='flex justify-between'>
                    <form className='flex flex-col gap-4'>
                        <div>
                            <label htmlFor="fullname" className='font-semibold text-white'>Full Name</label>
                            <input type="text" name="fullname" defaultValue={user.displayName} className='block p-2 rounded w-96' disabled={!editable} />
                        </div>

                        <div>
                            <label htmlFor="email" className='font-semibold text-white'>Email Address</label>
                            <input type="email" name="email" defaultValue={user.email} className='block p-2 rounded w-96' disabled={!editable} />
                        </div>
                        <div>
                            <label htmlFor="phone" className='font-semibold text-white'>Phone Number</label>
                            <input type="tel" name="phone" defaultValue={user.phoneNumber ? user.phoneNumber : 'Not Found'} className='block p-2 rounded w-96' disabled={!editable} />
                        </div>
                        <button type='submit' className={`bg-gradient-to-r from-[#60B08D] to-[#D1A952] py-3 px-10 rounded text-white font-semibold duration-500 ease-in-out ${!editable && 'hidden'}`}>Update Profile</button>
                    </form>
                    <img src={user.photoURL} className='w-20 h-20 rounded-full' />
                </div>
            </div>
        </div>
    )
}

export default Profile