import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CreateTaskForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        groupId: '',
        requierdRoles: [],
        rangeTimeStart: '',
        rangeTimeEnd: '',
    });
    const [roles, setRoles] = useState([{ title: '', amount: '' }]);
    const payload = useSelector((bigState) => bigState.auth.payload);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        fetchGroup();
    }, [payload]);

    const fetchGroup = async () => {
        if (payload) {
            setFormData(prev => ({ ...prev, groupId: payload.groupId }));
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const addRole = () => {
        setRoles(prev => [...prev, { title: '', amount: '' }])
    }
    const removeRole = () => {
        setRoles(prev => {
            const updatedRoles = [...prev];
            updatedRoles.pop();
            return updatedRoles;
        });
    }

    const handleRoleChange = (index, field, value) => {
        const updatedRoles = [...roles];
        updatedRoles[index][field] = value;
        setRoles(updatedRoles);
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
        <div className="bg-white p-10 rounded-lg shadow-md">
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
                </div>
                <div className="mb-4">
                    {roles.map((role, index) => (
                        <div key={index} className="flex mb-4">

                            <input
                                className="border p-2 rounded w-full mr-2"
                                placeholder="Title"
                                value={role.title}
                                onChange={e => handleRoleChange(index, 'title', e.target.value)}
                            />

                            <input
                                className="border p-2 rounded w-full ml-2"
                                placeholder="Amount"
                                type="number"
                                value={role.amount}
                                onChange={e => handleRoleChange(index, 'amount', e.target.value)}
                            />

                        </div>
                    ))}

                    <button
                        className="bg-blue-500 text-white p-2 rounded"
                        onClick={addRole}
                        type='button'
                    >
                        Add Role
                    </button>
                    {roles && roles.length > 1 &&
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
                        value={formData.rangeTimeStart}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium mb-2">End Date</label>
                    <input
                        className="border p-2 w-full rounded"
                        type="datetime-local"
                        name="rangeTimeEnd"
                        value={formData.rangeTimeEnd}
                        onChange={handleChange}
                    />
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