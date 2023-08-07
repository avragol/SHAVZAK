import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { feildValidation } from '../../validation/feildValidation';
import { createTaskSchema, RequierdRoleSchema } from '../../validation/tasks/createTask';

const CreateTaskForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        groupId: '',
        requierdRoles: [{ title: '', amount: '' },],
        rangeTime: ['', ''],
    });
    const [errors, setErrors] = useState({
        name: '',
        requierdRoles: [{ title: '', amount: '' },],
        rangeTime: ['', ''],
    });
    const payload = useSelector((bigState) => bigState.auth.payload);

    const navigate = useNavigate();
    useEffect(() => {
        fetchGroup();
    }, [payload]);

    const fetchGroup = async () => {
        if (payload) {
            setFormData(prev => ({ ...prev, groupId: payload.groupId }));
        }
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        const error = feildValidation(createTaskSchema[name], value, name);
        setErrors(prev => ({ ...prev, [name]: error }));
    }

    const addRole = () => {
        const roles = [...formData.requierdRoles, { title: '', amount: '' }];
        setFormData(prev => ({ ...prev, requierdRoles: roles }));

        const errorRoles = [...errors.requierdRoles, { title: '', amount: '' }];
        setErrors(prev => ({ ...prev, requierdRoles: errorRoles }));
    }
    const removeRole = () => {

        let roles = [...formData.requierdRoles];
        roles.pop();
        setFormData(prev => ({ ...prev, requierdRoles: roles }));

        let errorRoles = [...errors.requierdRoles];
        errorRoles.pop();
        setErrors(prev => ({ ...prev, requierdRoles: errorRoles }));
    }

    const handleRoleChange = (index, field, value) => {
        const updatedRoles = [...formData.requierdRoles];
        updatedRoles[index][field] = value;
        setFormData(prev => ({ ...prev, requierdRoles: updatedRoles }));
        const error = feildValidation(RequierdRoleSchema[field], value, field);
        const updatedErrorsRoles = [...errors.requierdRoles]
        updatedErrorsRoles[index][field] = error
        setErrors(prev => ({ ...prev, requierdRoles: updatedErrorsRoles }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/tasks', formData);
            navigate('/dashboard/tasks');
        } catch (err) {
            setErrors(err.response.data.errors);
        }
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-700 p-10 rounded-lg shadow-md">
            <h2 className="text-lg font-medium mb-4">Create New Task</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label className="block font-medium mb-2">Name</label>
                    <input
                        className="border p-2 w-full rounded"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <span className='text-red-600'>{errors.name}</span>
                </div>
                <div className="mb-4">
                    {formData.requierdRoles.map((role, index) => (
                        <div key={index} className="flex mb-4">
                            <div>
                                <input
                                    className="border p-2 rounded w-full mr-2"
                                    placeholder="Title"
                                    value={role.title}
                                    onChange={e => handleRoleChange(index, 'title', e.target.value)}
                                />
                                <span className='text-red-600 w-100'>{errors.requierdRoles[index].title}</span>
                            </div>
                            <div>
                                <input
                                    className="border p-2 rounded w-full ml-2"
                                    placeholder="Amount"
                                    type="number"
                                    value={role.amount}
                                    onChange={e => handleRoleChange(index, 'amount', e.target.value)}
                                />
                                <span className='text-red-600'>{errors.requierdRoles[index].amount}</span>
                            </div>
                        </div>
                    ))}

                    <button
                        className="bg-blue-500 text-white p-2 rounded"
                        onClick={addRole}
                        type='button'
                    >
                        Add Role
                    </button>
                    {formData.requierdRoles.length > 1 &&
                        <button
                            className="bg-blue-500 text-white p-2 rounded ml-2"
                            onClick={removeRole}
                            type='button'
                        >
                            Remove Role
                        </button>
                    }
                </div>

                <div className="mb-4">
                    <label className="block font-medium mb-2">Start Date</label>
                    <input
                        className="border p-2 w-full rounded"
                        type="datetime-local"
                        name="rangeTimeStart"
                        value={formData.rangeTime[0]}
                        onChange={handleChange}
                    />
                </div>
                <span className='text-red-600'>{errors.rangeTime[0]}</span>
                <div className="mb-4">
                    <label className="block font-medium mb-2">End Date</label>
                    <input
                        className="border p-2 w-full rounded"
                        type="datetime-local"
                        name="rangeTimeEnd"
                        value={formData.rangeTime[1]}
                        onChange={handleChange}
                    />
                    <span className='text-red-600'>{errors.rangeTime[1]}</span>
                </div>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    type="submit">
                    Create Task
                </button>

            </form>
        </div>
    )

}

export default CreateTaskForm;