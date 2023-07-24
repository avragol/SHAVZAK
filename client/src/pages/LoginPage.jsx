import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import loginSchema from '../validation/users/login';
import { feildValidation } from '../validation/feildValidation';
import useLoggedIn from '../hooks/useLoggedIn';

const LoginPage = () => {
    const login = useLoggedIn();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const [ableButton, setAbleButton] = useState(false);

    const navigation = useNavigate();

    const checkIfCanAble = ({ name, value }) => {
        //need to check it
        if (!formData.email || errors.email
            || !formData.password || errors.password
            || !value || feildValidation(loginSchema[name], value, name)) {
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: feildValidation(loginSchema[name], value, name),
        }));

        setAbleButton(checkIfCanAble({ name, value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/users/login', formData);
            localStorage.setItem("userToken", data.token);
            login();
            toast.success(`Welcome Back! You are now logged in.`);
            navigation("/");
        } catch (err) {
            toast.error(err.message);
            console.log("Error when sending login data to the server:", err.message);
        }
    };

    return (
        <div className="container mt-8 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-10 shadow-lg w-1/3 mx-auto">
                <h2 className="text-4xl text-center font-semibold mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        <div className="mb-4">
                            <label htmlFor="email" className="block font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 w-full dark:bg-gray-600"
                            />
                            <p className="text-sm text-red-500">{errors.email}</p>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block font-medium mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 w-full dark:bg-gray-600"
                            />
                            <p className="text-sm text-red-500">{errors.password}</p>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={!ableButton}
                        className={`flex items-center justify-center ${ableButton
                            ? 'bg-mainCustomColor dark:bg-accentColor'
                            : 'bg-gray-400 cursor-not-allowed'
                            } text-white py-2 px-4 rounded-lg mt-2 w-2/3 mx-[16.66666%] transition-colors duration-300 ease-in-out`}
                    >
                        Login
                        <svg
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
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
