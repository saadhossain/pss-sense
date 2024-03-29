import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaUserEdit } from "react-icons/fa";
import ButtonLoader from '../components/Loader/ButtonLoader';
import { DataContext, DataContextType } from '../context/AuthProvider';
import useUser from '../hooks/useUser';
import { UserInfoType } from '../types/UserType';

const Profile = () => {
    const { user } = useContext(DataContext) as DataContextType;
    const { loggedInUser } = useUser(user?.email);
    const [editable, setEditable] = useState(false);
    const { processing, setProcessing } = useContext(
        DataContext
    ) as DataContextType;
    //Get User Access Token
    const accessToken = localStorage.getItem('AccessToken');

    // Function to update user profile info
    const handleUpdateProfile = async (e: any) => {
        e.preventDefault();
        setProcessing(true);
        if (!user.email) {
            toast.error('Please fill the Form First...');
            setProcessing(false);
            return;
        }
        //Get the form values
        const form = e.target;
        const fullName = form.fullname.value;
        const password = form.password.value;
        const phone = form.phone.value;
        const userInfo = {
            fullName,
            email: user.email,
            password,
            phone
        };
        console.log(userInfo);
        // return;
        // Save new user to Database
        updateUser(userInfo)
        form.reset();
        setProcessing(false);
        toast.success('User Profile Updated...');
    }
    //Update User information
    const updateUser = (userInfo: UserInfoType) => {
        fetch(`http://localhost:3000/users/${loggedInUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(userInfo)
        })
    }
    //State for show password
    const [hidePass, setHidePass] = useState(true);
    return (
        <div className='inner-pg'>
            <h2 className='text-xl md:text-2xl font-semibold my-2 md:my-5 md:mt-10 border-l-4 border-primary pl-2 ml-3 md:ml-0'>Profile</h2>
            <div className='bg-gradient p-10 rounded-lg relative'>
                <div onClick={() => setEditable(!editable)} className='flex gap-1 absolute right-5 top-2 text-white cursor-pointer font-semibold'>
                    <FaUserEdit className='w-5 h-5' />
                    <p>Edit</p>
                </div>
                <div className='flex justify-between'>
                    <form onSubmit={handleUpdateProfile} className='flex flex-col gap-4'>
                        <div>
                            <label htmlFor="fullname" className='font-semibold text-white'>Full Name</label>
                            <input type="text" name="fullname" defaultValue={loggedInUser.fullName} className='block p-2 rounded w-96' disabled={!editable} />
                        </div>

                        <div>
                            <label htmlFor="email" className='font-semibold text-white'>Email Address</label>
                            <input type="email" name="email" defaultValue={loggedInUser.email} className='block p-2 rounded w-96' disabled />
                        </div>
                        <div className='relative'>
                            <label htmlFor="password" className='font-semibold text-white'>Password</label>
                            <input type={`${hidePass ? 'password' : 'text'}`} name="password" id="password" defaultValue={loggedInUser.password} className='block p-2 rounded w-96' disabled={!editable} />
                            <div onClick={() => setHidePass(!hidePass)} className={`cursor-pointer absolute top-9 right-2 ${!editable && 'hidden'}`}>
                                {
                                    hidePass ? <FaEye /> : <FaEyeSlash />
                                }
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phone" className='font-semibold text-white'>Phone Number</label>
                            <input type="tel" name="phone" defaultValue={loggedInUser.phone} className='block p-2 rounded w-96' disabled={!editable} />
                        </div>
                        {/* Adding User Button */}
                        <button type="submit" className={`bg-gradient-to-r from-[#60B08D] to-[#D1A952] py-3 px-10 rounded text-white font-semibold duration-500 ease-in-out ${!editable && 'hidden'}`}>{processing ? <ButtonLoader title='Updating Profile' /> : 'Update Profile'}</button>
                    </form>
                    <img src={user.photoURL} className='w-20 h-20 rounded-full' />
                </div>
            </div>
        </div>
    )
}

export default Profile