import React from 'react';

import { useNavigate } from 'react-router-dom';
import * as logoutService from "../services/LogOutService";

const LogoutButton = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logoutService.logout();
            localStorage.removeItem('authToken');
            navigate('/admin/login');
        } catch (error) {
            console.error('Lỗi đăng xuất:', error);
        }
    };

    return <button onClick={handleLogout}>Đăng xuất</button>;
};
export default LogoutButton;