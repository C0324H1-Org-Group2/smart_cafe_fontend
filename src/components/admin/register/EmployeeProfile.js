import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import './EmployeeProfile.css';
import EmployeeService from "../services/EmployeeService";

const EmployeeProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const employeeId = localStorage.getItem('employeeId');
            if (!employeeId) {
                setError('Không tìm thấy thông tin người dùng');
                setLoading(false);
                return;
            }
            try {
                const data = await EmployeeService.fetchEmployeeById(employeeId);
                setProfile(data);
            } catch (err) {
                setError('Không thể lấy thông tin tài khoản');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleEditProfile = () => {
        navigate('/update-profile');
    };

    const handleDeleteAccount = () => {
        setShowModal(true); // Hiển thị modal xác nhận
    };

    const confirmDelete = async () => {
        setShowModal(false); // Ẩn modal
        const employeeId = localStorage.getItem('employeeId');
        if (!employeeId) {
            setError('Không tìm thấy thông tin người dùng');
            return;
        }
        try {
            await EmployeeService.deleteEmployee(employeeId);
            localStorage.removeItem('employeeId');
            navigate('/login'); // Điều hướng đến trang đăng nhập
        } catch (error) {
            setError('Không thể xóa tài khoản');
        }
    };

    const cancelDelete = () => {
        setShowModal(false);
    };

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="profile-container">
            <h2>Thông tin cá nhân</h2>
            <p><strong>Họ và tên:</strong> {profile.fullName}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Địa chỉ:</strong> {profile.address}</p>
            <p><strong>Số điện thoại:</strong> {profile.tel}</p>
            <p><strong>Ngày sinh:</strong> {profile.birthday}</p>
            <p><strong>Giới tính:</strong> {profile.gender}</p>
            <p><strong>Ghi chú:</strong> {profile.note}</p>
            <img src={profile.imageUrl} alt="Profile" />
            <div className="profile-actions">
                <button onClick={handleEditProfile}>Sửa thông tin</button>
                <button onClick={handleDeleteAccount}>Xóa tài khoản</button>
            </div>

            {/* Modal xác nhận xóa */}
            <Modal show={showModal} onHide={cancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xóa tài khoản không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EmployeeProfile;
