import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import employeeService from './employeeService';
import employeeService from "../services/EmployeeService";
const UpdateEmployee = () => {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState({
        fullName: '',
        email: '',
        address: '',
        tel: '',
        birthday: '',
        gender: '',
        note: '',
        imageUrl: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await employeeService.fetchEmployeeById(employeeId);
                setEmployee(response);
            } catch (error) {
                console.error('Error fetching employee:', error);
                setError('Could not fetch employee data');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [employeeId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await employeeService.updateEmployeeInfo(employeeId, employee);
            alert('Employee updated successfully');
        } catch (error) {
            console.error('Error updating employee:', error);
            alert('Error updating employee');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <h2>Update Employee Information</h2>
            <form onSubmit={handleSubmit}>
                {/* Form Fields */}
                <div className="form-group">
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={employee.fullName}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={employee.address}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tel">Telephone:</label>
                    <input
                        type="tel"
                        id="tel"
                        name="tel"
                        value={employee.tel}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="birthday">Birthday:</label>
                    <input
                        type="date"
                        id="birthday"
                        name="birthday"
                        value={employee.birthday}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={employee.gender}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="note">Note:</label>
                    <textarea
                        id="note"
                        name="note"
                        value={employee.note}
                        onChange={handleChange}
                        className="form-control"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={employee.imageUrl}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default UpdateEmployee;
