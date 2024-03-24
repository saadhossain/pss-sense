import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Main = () => {
    return (
        <div>
            <Header />
            <div className='min-h-[80vh]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;