// src/components/admin/AdminLayout.js
import React from 'react';
import Header from "./common/Header";

const AdminLayout = ({ children }) => {
    return (
        <div>
            {/* Header cho phần admin */}
            <Header />

            {/* Nội dung chính của các trang admin */}
            <div className="admin-content">
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
