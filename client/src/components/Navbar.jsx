import React from 'react';
import { NavLink } from 'react-router-dom';

import ROUTES from "../routes/ROUTES";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to={ROUTES.ABOUT}>About</NavLink>
                </li>
                <li>
                    <NavLink to={ROUTES.REGISTER}>Register</NavLink>
                </li>
                <li>
                    <NavLink to={ROUTES.LOGIN}>Login</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
