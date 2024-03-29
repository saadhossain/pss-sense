import toast from 'react-hot-toast';
import SupportDesk from '../assets/supportdesk.jpg';

const Contact = () => {
    const sendEmail = (e: any) => {
        e.preventDefault();
        toast.success('Thank your for Your Message, we will contact you Soon...')
        e.target.reset();
    };
    return (
        <div className='mx-auto'>
            <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 text-black">
                <div className="flex flex-col justify-between">
                    <div className="space-y-2">
                        <h2 className="text-4xl font-bold leadi lg:text-5xl">Let's talk!</h2>
                        <div className="dark:text-gray-400">Please let us know your query...</div>
                    </div>
                    <img src={SupportDesk} alt="Contact our customer support" className="" />
                </div>
                <form onSubmit={sendEmail} className="space-y-6 bg-gray-800 p-8 rounded-lg text-white">
                    <div>
                        <label htmlFor="name" className="text-sm">Full name</label>
                        <input id="name" type="text" placeholder="Your name" className="text-gray-800 w-full p-3 rounded  bg-white" />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm">Email</label>
                        <input id="email" type="email" placeholder="Your email" className="text-gray-800 w-full p-3 rounded  bg-white" />
                    </div>
                    <div>
                        <label htmlFor="message" className="text-sm">Message</label>
                        <textarea id="message" rows="3" placeholder="Your message" className="text-gray-800 w-full p-3 rounded  bg-white"></textarea>
                    </div>
                    <button type="submit" className="w-full p-3 text-sm font-bold tracki uppercase rounded bg-primary text-white">Send Message</button>
                </form>
            </div>
        </div>
    )
}

export default Contact