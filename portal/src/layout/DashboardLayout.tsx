import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DashboardSidebar from '../components/DashboardSidebar';

const DashboardLayout = () => {
    return (
        <div>
            <Header />
            <div className='min-h-[80vh] w-10/12 mx-auto'>
                <div className='flex gap-2 my-5'>
                    <div className='flex-1'>
                        <DashboardSidebar/>
                    </div>
                    <div className='w-9/12'>
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardLayout;