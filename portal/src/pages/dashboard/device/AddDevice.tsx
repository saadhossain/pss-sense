import { useContext } from 'react';
import toast from 'react-hot-toast';
import ButtonLoader from '../../../components/Loader/ButtonLoader';
import { DataContext, DataContextType } from '../../../context/AuthProvider';
import { UserInfoType } from '../../../types/UserType';
import { uploadFiletoFirebase } from '../../../utils/utils';

const AddDevice = () => {
    const { processing, setProcessing } = useContext(
        DataContext
    ) as DataContextType;
    //Register a new user
    const handleRegistration = async (e: any) => {
        e.preventDefault();
        setProcessing(true);
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
                phone,
                password,
                profileImg
            };
            // Save new user to Database
            form.reset();
            setProcessing(false);
            toast.success('New User added...');
        }
    }
    //Save New user to the database
    const saveUserToDB = (userInfo: UserInfoType) => {
        fetch(`http://localhost:3000/users`, {
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
                                <label htmlFor="name" className="block mb-2 text-lg">PSS-QR Code/Serial Number</label>
                                <input type="text" name="name" id="name" placeholder="Full Name" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                            </div>
                            <div>
                                <label htmlFor="devictype" className="block mb-2 text-lg">Device type</label>
                                <select id="devictype" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800">
                                    <option value="Select Type">Select Type</option>
                                    <option value="Select Type">Select Type</option>
                                    <option value="Select Type">Select Type</option>
                                    <option value="Select Type">Select Type</option>
                                    <option value="Select Type">Select Type</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-lg">PSS-QR Code</label>
                                <input type="text" name="name" id="name" placeholder="Full Name" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                            </div>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-lg">Devic ID</label>
                                <input type="text" name="name" id="name" placeholder="Full Name" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                            </div>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-lg">Devic Name</label>
                                <input type="text" name="name" id="name" placeholder="Full Name" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                            </div>



                        </div>
                        <div className="space-y-2">
                            <div>
                                {/* Adding User Button */}
                                <button type="submit" className={`w-full px-8 py-3 font-semibold rounded-md bg-gray-800 text-white`}>{processing ? <ButtonLoader title='Adding User' /> : 'Add User'}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDevice;