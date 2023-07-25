import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'

const reviews = [
    {
        title: 'Excellent Software!',
        rating: 5,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos voluptatem vitae, ipsam similique laboriosam autem delectus.',
    },
    {
        title: 'Impressive Product!',
        rating: 4,
        text: 'Praesent vel ligula euismod, euismod est quis, varius arcu. Nullam aliquam mauris sit amet sapien lacinia tincidunt.',
    },
    {
        title: 'Highly Recommended!',
        rating: 5,
        text: 'Etiam euismod ligula sit amet nibh aliquet euismod. Curabitur vitae feugiat nisi, vitae volutpat felis.',
    },
    // ...other reviews
];

const features = [
    { icon: ArrowPathIcon, title: 'Feature 1', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.' },
    { icon: CloudArrowUpIcon, title: 'Feature 2', description: 'Praesent vel ligula euismod, euismod est quis, varius arcu.' },
    { icon: FingerPrintIcon, title: 'Feature 3', description: 'Nullam aliquam mauris sit amet sapien lacinia tincidunt.' },
    { icon: LockClosedIcon, title: 'Feature 4', description: 'Nullam aliquam mauris sit amet sapien lacinia tincidunt.' },
];

const AboutPage = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const tabStyles = {
        about: {
            backgroundImage: "url('/assets/images/about_bg.jpg')",
            backgroundOpacity: "20%",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        },
        features: {
            backgroundImage: "url('/assets/images/features_bg.jpg')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        },
        reviews: {
            backgroundImage: "url('/assets/images/reviews_bg.jpg')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        },
    };

    return (
        <div className="max-w-3xl mx-auto p-8 mt-16">
            {/* Fixed Tabs */}
            <Tab.Group as="div" className="sticky top-0 z-10 bg-white dark:bg-gray-800 p-4 mt-8" onChange={(tab) => setSelectedTab(tab)}>
                <Tab.List className="flex space-x-4 flex-1">
                    <Tab className="flex-1">
                        <div
                            className="bg-blue-500 p-4 rounded-lg text-dark-text font-bold text-center transition-all duration-300"
                            style={tabStyles.about}
                        >
                            <span className="text-lg">About</span>
                            <div className="mt-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-6 h-6 mx-auto animate-bounce"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                            </div>
                        </div>
                    </Tab>
                    <Tab className="flex-1">
                        <div
                            className="bg-purple-500 p-4 rounded-lg text-dark-text font-bold text-center transition-all duration-300"
                            style={tabStyles.features}
                        >
                            <span className="text-lg">Features</span>
                            <div className="mt-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-6 h-6 mx-auto animate-bounce"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                            </div>
                        </div>
                    </Tab>
                    <Tab className="flex-1">
                        <div
                            className="bg-green-500 p-4 rounded-lg text-dark-text font-bold text-center transition-all duration-300"
                            style={tabStyles.reviews}
                        >
                            <span className="text-lg">Reviews</span>
                            <div className="mt-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-6 h-6 mx-auto animate-bounce"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                            </div>
                        </div>
                    </Tab>
                </Tab.List>
            </Tab.Group>

            {/* Content */}
            <div className="mt-12">
                {selectedTab === 0 && (
                    <div>
                        <h3 className="text-2xl font-bold">About Our Product</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos voluptatem vitae, ipsam similique
                            laboriosam autem delectus. Odit laudantium eos quaerat cumque at veniam, ut iste ipsum saepe, minima
                            quis perspiciatis.
                        </p>
                        <img src="\assets\images\heroSection.jpg" alt="About us" className="w-1/2 mx-auto rounded-lg mt-4" />
                    </div>
                )}
                {selectedTab === 1 && (
                    <div>
                        <h3 className="text-2xl font-bold">Key Features</h3>
                        {/* Feature cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {features.map((feature) => (
                                <div key={feature.name} className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                            <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {selectedTab === 2 && (
                    <div>
                        <h3 className="text-2xl font-bold">Customer Reviews</h3>
                        {/* Display reviews */}
                        {/* <!-- Item Container --> */}
                        <div className="flex flex-col gap-4 p-4">
                            {/*  <!-- Profile and Rating --> */}

                            {reviews.map((item, index) => (
                                <div className="flex justify justify-between gap-2 bg-gray-300 dark:bg-gray-700 p-3 rounded-lg" key={index}>
                                    <h4 className="text-lg font-bold mb-2">{item.title}</h4>

                                    <p className="text-gray-700 dark:text-gray-300">{item.text}</p>

                                    <div className=" dark:text-orange-300 text-yellow-700 text-2xl text-center">
                                        <div className="flex gap-1"> {(Array.from({ length: item.rating }, (_, i) => (<span> &#9733;</span>)))}</div>
                                        {item.rating}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AboutPage;
