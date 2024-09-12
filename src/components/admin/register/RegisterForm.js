import React, { useState } from 'react';
import '../register/RegisterForm.css';
import employeeService from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const navigate = useNavigate();
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

    const [user, setUser] = useState({
        username: '',
        password: '',
        roleIds: [1] // Đặt giá trị roleIds mặc định là 1
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in employee) {
            setEmployee({ ...employee, [name]: value });
        } else if (name in user) {
            if (name === 'roleIds') {
                setUser({ ...user, [name]: value.split(',').map(Number) });
            } else {
                setUser({ ...user, [name]: value });
            }
        }
    };

    const validateForm = () => {
        // Kiểm tra xem tất cả các trường yêu cầu có được điền đầy đủ không
        return user.username && user.password && employee.fullName && employee.email;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            alert('Please fill in all required fields.');
            return;
        }
        try {
            const response = await employeeService.registerEmployee(employee, user);
            alert('Registration successful!');
            navigate('/admin/login');
        } catch (error) {
            console.error('There was an error!', error);
            alert('Registration failed!');
        }
    };

    return (
        <div className="register-form">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <h3>User Details</h3>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={user.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />

                <h3>Employee Details</h3>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={employee.fullName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={employee.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={employee.address}
                    onChange={handleChange}
                />
                <input
                    type="tel"
                    name="tel"
                    placeholder="Phone Number"
                    value={employee.tel}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="birthday"
                    placeholder="Birthday"
                    value={employee.birthday}
                    onChange={handleChange}
                />
                <select
                    name="gender"
                    value={employee.gender}
                    onChange={handleChange}
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <textarea
                    name="note"
                    placeholder="Note"
                    value={employee.note}
                    onChange={handleChange}
                ></textarea>
                <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={employee.imageUrl}
                    onChange={handleChange}
                />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
