import { Link } from 'react-router-dom'

const HomePage = () => {

    return (
        <div className="text-center w-11/12 mx-auto">
            <div className="bg-bgcColor dark:bg-dark-background py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 items-center lg:max-w-none lg:grid-cols-2">
                        <div className="max-w-xl text-center sm:text-left lg:pr-16">
                            <h1 className="text-4xl font-bold tracking-tight text-textColor dark:text-dark-text sm:text-6xl">Coordinate your team's work in one place</h1>
                            <p className="mt-4 text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, eius.</p>
                            <div className='flex gap-2'>
                                <Link className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-textColor bg-secondaryColor border border-transparent rounded-md hover:opacity-80 mt-2" to="/about">Get Started</Link>
                                <Link className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-textColor dark:text-dark-text dark:hover:text-textColor border-secondaryColor border border-transparent rounded-md hover:bg-secondaryColor transition-colors duration-200 mt-2" to="/register">Sign Up<svg
                                    className="w-4 h-4 ml-2 inline"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg></Link>
                            </div>
                        </div>

                        <img className="w-[500px] mx-auto rounded-xl shadow-xl ring-1 ring-gray-400/10" src="\assets\images\heroSection.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;