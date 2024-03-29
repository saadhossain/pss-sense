import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import ButtonLoader from '../../../components/Loader/ButtonLoader';
import { DataContext, DataContextType } from '../../../context/AuthProvider';
import useUser from '../../../hooks/useUser';
import { UserInfoType } from '../../../types/UserType';
import { uploadFiletoFirebase } from '../../../utils/utils';

const AddDevice = () => {
    const { processing, setProcessing, user } = useContext(
        DataContext
    ) as DataContextType;
    //Get LoggedIn user from database
    const { loggedInUser } = useUser(user?.email);
    //Set email
    const [serial, setSerial] = useState();
    //Get the email from the input
    const handleSerial = (e: any) => {
        setSerial(e.target.value)
    }
    console.log(serial);
    //Register a new user
    const handleRegistration = async (e: any) => {
        e.preventDefault();
        setProcessing(true);
        if (!serial) {
            toast.error('Please fill the the form');
            setProcessing(false);
            return;
        }
        //Get the form values
        const form = e.target;
        const deviceName = form.name.value;
        const password = form.password.value;
        const phone = form.phone.value;
        //Handle Profile Picture upload
        const image = form.profile.files[0];
        const profileImg = await uploadFiletoFirebase('profileImage', image);
        const userInfo = {
            deviceName,
            phone,
            password,
            profileImg
        };
        // Save new user to Database
        form.reset();
        setProcessing(false);
        toast.success('New User added...');
    }
    //Save New user to the database
    const saveUserToDB = (userInfo: UserInfoType) => {
        fetch(`https://pss-sense-apis.vercel.app/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
    }
    return (
        <div className='min-h-screen'>
            <h2 className='text-xl md:text-2xl font-semibold my-2 md:my-5 border-l-4 border-primary pl-2 ml-3 md:ml-0'>Add A Device</h2>
            <div className="w-full flex flex-col rounded-lg bg-slate-50 text-gray-800 shadow-xl">
                <div className='p-6'>
                    <form onSubmit={handleRegistration} className="space-y-12 ng-untouched ng-pristine ng-valid">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="serial" className="block mb-2 text-lg">PSS-QR Code/Serial Number</label>
                                <input onChange={handleSerial} type="text" name="serial" id="serial" placeholder="Enter Serial/QR Code" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                            </div>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-lg">Device ID</label>
                                <input type="text" name="name" id="name" placeholder="Enter ID" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                            </div>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-lg">Device Name</label>
                                <input type="text" name="name" id="name" placeholder="Enter Device Name" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                            </div>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-lg">Customer Device Name</label>
                                <input type="text" name="name" id="name" placeholder="Customer Device Name" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                            </div>
                            <div>
                                <label htmlFor="customerId" className="block mb-2 text-lg">Customer ID</label>
                                <input type="text" name="customerId" id="customerId" value={loggedInUser._id} disabled className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-lg">Customer Email</label>
                                <input type="email" name="email" id="email" value={loggedInUser.email} disabled className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                            </div>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-lg">Device Network Password </label>
                                <input type="text" name="name" id="name" placeholder="Device Network Password " className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                            </div>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-lg">External IP address  </label>
                                <input type="text" name="name" id="name" placeholder="External IP address  " className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div>
                                {/* Adding User Button */}
                                <button type="submit" className={`w-full px-8 py-3 font-semibold rounded-md bg-gray-800 text-white`}>{processing ? <ButtonLoader title='Adding Device' /> : 'Add Device'}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDevice;