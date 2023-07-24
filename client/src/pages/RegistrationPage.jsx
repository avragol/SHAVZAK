import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import registerSchema from '../validation/users/register';
import { feildValidation } from '../validation/feildValidation';

const formFields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'rePassword', label: 'RePassword', type: 'password', required: true },
    { name: 'roles', label: 'Roles', type: 'text', required: false },
];

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rePassword: '',
        groupId: '',
        roles: [],
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        rePassword: '',
        groupId: '',
        roles: [],
    });

    const [groups, setGroups] = useState([]);
    const [ableButton, setAbleButton] = useState(false);

    useEffect(() => {
        // Fetch groups from the server
        fetchGroups();
        setAbleButton(false);
    }, []);

    const navigation = useNavigate();

    const fetchGroups = async () => {
        try {
            const response = await axios.get('/groups');
            setGroups(response.data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    const checkIfCanAble = ({ name, value }) => {
        for (const field of formFields) {
            if (field.name === name && field.name !== "rePssword") {
                if (field.required && (!value || feildValidation(registerSchema[name], value, name))) {
                    return false;
                }
            }
            else if (field.required && (!formData[field.name] || errors[field.name])) {
                return false;
            }
            if (name === "password") return value === formData.rePassword;
            if (name === "rePassword") return value === formData.password;
        }
        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'roles') {
            const rolesArray = value.split(',').map((role) => role.trim());
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: rolesArray,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
        if (name === "rePassword") setErrors((prevErrors) => ({
            ...prevErrors,
            rePassword: formData.password !== value ? "Not Match" : "",
        }));
        if (name === "password") setErrors((prevErrors) => ({
            ...prevErrors,
            rePassword: formData.rePassword !== value ? "Not Match" : "",
        }));

        if (!["rePassword", "roles"].includes(name)) setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: feildValidation(registerSchema[name], value, name),
        }));
        if (name === 'roles') {
            const rolesArray = value.split(',').map((role) => role.trim());
            setErrors((prevFormData) => ({
                ...prevFormData,
                roles: feildValidation(registerSchema.roles, rolesArray, "roles"),
            }));
        }

        if (name === "groupId") {
            setAbleButton(!!value && checkIfCanAble({ name, value }));
        } else {
            setAbleButton(checkIfCanAble({ name, value }) && !!formData.groupId);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            delete formData.rePassword;
            const { data } = await axios.post('/users', formData)
            toast.success(`Welcome ${data.name}! Please login.`);
            navigation("/login")
        } catch (err) {
            toast.error(err.message);
            console.log("error when send to server:", err.message);
        }
    };

    return (
        <div className="container mt-8 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg w-3/4 mx-auto ">
                <h2 className="text-4xl text-center font-semibold mb-4">Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 md:grid-cols-2">
                        {formFields.map((field) => (
                            <div key={field.name} className="mb-4">
                                <label htmlFor={field.name} className="block font-medium mb-1">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    id={field.name}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 w-full dark:bg-gray-600"
                                />
                                {!field.required && (
                                    <p className="text-sm text-gray-500">{`(Optional${field.name === "roles" && ", separate them with a comma without a space "})`}</p>
                                )}
                                <p className="text-sm text-red-500">{errors[field.name]}</p>
                            </div>
                        ))}
                        <div className="mb-4">
                            <label htmlFor="groupId" className="block font-medium mb-1">
                                Group
                            </label>
                            <select
                                id="groupId"
                                name="groupId"
                                value={formData.groupId}
                                onChange={handleChange}
                                className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 w-full dark:bg-gray-600"
                            >
                                <option value="">Select a group</option>
                                {groups.map((group) => (
                                    <option key={group._id} value={group._id}>
                                        {group.name}
                                    </option>
                                ))}
                            </select>
                            <p className="text-sm text-gray-500">{`(Must choose group from the list)`}</p>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={!ableButton}
                        className={`flex items-center justify-center ${ableButton ? 'bg-mainCustomColor dark:bg-accentColor' : 'bg-gray-400 cursor-not-allowed'}text-white py-2 px-4 rounded-lg mt-2 w-2/3 mx-[16.66666%] transition-colors duration-300 ease-in-out`}
                    >
                        Register<svg
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

export default RegistrationPage;