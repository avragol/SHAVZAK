import React, { useState, useEffect } from 'react';
import axios from 'axios';

const formFields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'roles', label: 'Roles', type: 'text', required: false },
];

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        groupId: '',
        isManager: false,
        roles: [],
    });

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        // Fetch groups from the server
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const response = await axios.get('/groups'); // Adjust the API endpoint as needed
            setGroups(response.data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
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
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the form data using Joi schema
        /*  const { error } = registerSchema.validate(formData);
 
         if (error) {
             // Handle validation errors here
             console.error('Validation Error:', error.details);
         } else { */
        // Proceed with form submission
        console.log('Form submitted successfully:', formData);
        // You can make an API call here to submit the data to the server
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
                                    <option key={group.id} value={group._id}>
                                        {group.name}
                                    </option>
                                ))}
                            </select>
                            {formFields.find((field) => field.name === 'groupId')?.required &&
                                !formData.groupId && (
                                    <p className="text-sm text-red-500">This field is required.</p>
                                )}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="flex items-center justify-center bg-mainCustomColor dark:bg-accentColor text-white py-2 px-4 rounded-lg mt-2 w-2/3 mx-[16.66666%]"
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