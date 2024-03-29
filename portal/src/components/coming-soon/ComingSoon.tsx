import { Link } from 'react-router-dom'

const ComingSoon = ({ title }: { title: string }) => {
    return (
        <div className='w-full coming-soon-bg h-screen'>
            <div className='flex flex-col gap-5 items-center justify-center text-white h-[70vh]'>
                <h1 className='text-5xl md:text-7xl font-semibold text-accent'>{title}</h1>
                <h2 className='text-3xl md:text-4xl font-semibold'>Coming Soon....</h2>

                <p className='text-lg lg:text-xl'>Please Stay Tunned to Get Updates...</p>
                <Link to='/'>
                    <button className='py-2 px-10 font-semibold bg-secondary my-4 text-white'>Go To Homepage</button>
                </Link>
            </div>
        </div>
    )
}

export default ComingSoon