import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'
import toast from 'react-hot-toast';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import ROUTES from "../routes/ROUTES";
import logo from '../logo.svg'
import DarkModeToggleComp from './DarkModeToggleComp';
import { authActions } from "../features/auth";

const navigation = [
    { label: "Home", url: ROUTES.HOME },
    { label: "About", url: ROUTES.ABOUT },
    { label: "Register", url: ROUTES.REGISTER },
    { label: "Users", url: ROUTES.USERS },
]

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(store => store.auth.isLoggedIn);

    const handleLogoutClick = () => {
        localStorage.removeItem("userToken");
        dispatch(authActions.logOut())
        toast.success(`Goodbye! see you soon..`);
    }

    return (
        <>
            <nav className="flex items-center justify-between p-6 lg:px-8 dark:bg-mainCustomColor " aria-label="Global">
                <div className="flex lg:flex-1">
                    <NavLink to={ROUTES.HOME} className="-m-1.5 p-1.5 ">
                        <span className="sr-only">Your Company</span>
                        <img
                            className="h-12 w-auto"
                            src={logo}
                            alt="shavzak logo"
                        />
                    </NavLink>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-textColor"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-8 w-8" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12 ">
                    {navigation.map((item) => (
                        <NavLink key={item.label} to={item.url} className="text-sm font-semibold leading-6 text-gray-900 dark:text-dark-text ">
                            {item.label}
                        </NavLink>
                    ))}
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-2">
                    <DarkModeToggleComp />
                    {isLoggedIn ?
                        <div className="text-sm text-end font-semibold leading-6 text-gray-900 dark:text-dark-text cursor-pointer" onClick={handleLogoutClick}>
                            Log out <span aria-hidden="true">&rarr;</span></div>
                        : <NavLink to={ROUTES.LOGIN} className="text-sm text-end font-semibold leading-6 text-gray-900 dark:text-dark-text">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </NavLink>}
                </div>
            </nav>
            <Transition
                show={mobileMenuOpen}
                as={Fragment}
            >
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-400"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 z-50" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-400"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-1/2 h-min overflow-y-auto bg-bgcColor dark:bg-mainCustomColor px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex items-center justify-end">
                                <button
                                    type="button"
                                    className="-m-2.5 rounded-md p-2.5 text-textColor "
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-2 py-6 flex flex-col">
                                        {navigation.map((item) => (
                                            <NavLink key={item.label} to={item.url} className="text-sm font-semibold leading-6 text-gray-900 dark:text-dark-text ">
                                                {item.label}
                                            </NavLink>
                                        ))}
                                        <DarkModeToggleComp />
                                        {isLoggedIn ?
                                            <div className="text-sm text-end font-semibold leading-6 text-gray-900 dark:text-dark-text" onClick={handleLogoutClick}>
                                                Log out <span aria-hidden="true">&rarr;</span></div>
                                            : <NavLink to={ROUTES.LOGIN} className="text-sm text-end font-semibold leading-6 text-gray-900 dark:text-dark-text">
                                                Log in <span aria-hidden="true">&rarr;</span>
                                            </NavLink>}
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </>
    );
};

export default Navbar;
