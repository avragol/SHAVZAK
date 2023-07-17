import React from 'react';
import { NavLink } from 'react-router-dom';

import ROUTES from "../routes/ROUTES";
import logo from '../logo.svg'

const navigation = [
    { label: "Home", url: ROUTES.HOME },
    { label: "About", url: ROUTES.ABOUT },
    { label: "Register", url: ROUTES.REGISTER },
    { label: "Login", url: ROUTES.LOGIN },
]

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
                <NavLink to={ROUTES.HOME} className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <img
                        className="h-12 w-auto"
                        src={logo}
                        alt="shavzak logo"
                    />
                </NavLink>
            </div>
            {/* <div className="flex lg:hidden">
                <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
            </div> */}
            <div className="hidden lg:flex lg:gap-x-12">
                {navigation.map((item) => (
                    <NavLink key={item.label} to={item.url} className="text-sm font-semibold leading-6 text-gray-900">
                        {item.label}
                    </NavLink>
                ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <NavLink to={ROUTES.LOGIN} className="text-sm font-semibold leading-6 text-gray-900">
                    Log in <span aria-hidden="true">&rarr;</span>
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
