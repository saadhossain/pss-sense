import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLoaderData } from 'react-router-dom';
import ButtonLoader from '../../components/Loader/ButtonLoader';
import { DataContext, DataContextType } from '../../context/AuthProvider';
import { UserInfoType } from '../../types/UserType';
import { uploadFiletoFirebase } from '../../utils/utils';

const ModifyUser = () => {
    const user = useLoaderData() as UserInfoType;
    const { processing, setProcessing } = useContext(
        DataContext
    ) as DataContextType;

    //Set email
    const [email, setEmail] = useState();
    //Get the email from the input
    const handleEmail = (e: any) => {
        setEmail(e.target.value)
    }
    const handleUserUpdate = async (e: any) => {
        e.preventDefault();
        setProcessing(true);
        if (!user.email) {
            toast.error('Please fill the Form First...');
            setProcessing(false);
            return;
        }
        //Get the form values
        const form = e.target;
        const fullName = form.name.value;
        const password = form.password.value;
        const phone = form.phone.value;
        //Handle Profile Picture upload
        const image = form.profile.files[0];
        const profileImg = await uploadFiletoFirebase('profileImage', image);
        if (profileImg) {
            const userInfo = {
                fullName,
                email: user.email,
                password,
                phone,
                profileImg
            };
            // Save new user to Database
            updateUser(userInfo)
            form.reset();
            setEmail(undefined);
            setProcessing(false);
            toast.success('User info Modified....');
        }
    }
    //Update User information
    const updateUser = (userInfo: UserInfoType) => {
        fetch(`https://pss-sense-apis.vercel.app/users/${user._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
    }
    //State for show password
    const [hidePass, setHidePass] = useState(true);
    return (
        <div>
            <h2 className='text-xl md:text-2xl font-semibold my-2 md:my-5 border-l-4 border-primary pl-2 ml-3 md:ml-0'>Modify User</h2>
            {/* User Modification Field */}
            <div className="w-full flex flex-col rounded-lg bg-slate-50 text-gray-800 shadow-xl">
                <div className='p-6'>
                    <form onSubmit={handleUserUpdate} className="space-y-12 ng-untouched ng-pristine ng-valid">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-lg">Full Name</label>
                                <input type="text" name="name" id="name" defaultValue={user.fullName} className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-lg">Email address</label>
                                <input onBlur={handleEmail} type="email" name="email" id="email" defaultValue={user.email} className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" disabled />
                            </div>
                            <div className='relative'>
                                <label htmlFor="password" className="text-lg">Password</label>
                                <input type={`${hidePass ? 'password' : 'text'}`} name="password" id="password" defaultValue={user.password} className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                                <div onClick={() => setHidePass(!hidePass)} className='cursor-pointer absolute top-10 right-2'>
                                    {
                                        hidePass ? <FaEye /> : <FaEyeSlash />
                                    }
                                </div>
                            </div>
                            <div>
                                <label htmlFor="phone" className="text-lg">Phone Number</label>
                                <input type="tel" name="phone" defaultValue={user.phone} className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="profile" className="text-lg">Profile Picture</label>
                                    <input type="file" name="profile" id="profile" accept='image/*' className="w-full px-3 py-2 border rounded-md border-gray-800" />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div>
                                {/* Modifiying User Button */}
                                <button type="submit" className={`w-full px-8 py-3 font-semibold rounded-md bg-gray-800 text-white`}>{processing ? <ButtonLoader title='Modifying User' /> : 'Modify User'}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModifyUser