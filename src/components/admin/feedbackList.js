import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as feedbackService from '../client/services/FeedbackService';

function FeedbackList() {
    const { date } = useParams(); // Lấy giá trị `date` từ URL
    const [feedbacks, setFeedbacks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [itemsPerPage] = useState(2); // Số lượng phản hồi trên mỗi trang
    const navigate = useNavigate();

    useEffect(() => {
        if (date) {
            getAllFeedbackByDate(date);
        } else {
            getAllFeedback();
        }
    }, [date]);

    const getAllFeedback = async () => {
        try {
            const feedbackList = await feedbackService.getAllFeedback();
            setFeedbacks(feedbackList);
        } catch (e) {
            console.error("Lỗi danh sách phản hồi", e);
        }
    };

    const getAllFeedbackByDate = async (date) => {
        try {
            const feedbackList = await feedbackService.getAllFeedbackByDate(date);
            setFeedbacks(feedbackList);
        } catch (e) {
            console.error("Lỗi danh sách phản hồi", e);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        // Điều hướng tới URL mới với ngày được chọn
        navigate(`/admin/feedback/${selectedDate}`);
    };

    // Tính toán dữ liệu phân trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFeedbacks = feedbacks.slice(indexOfFirstItem, indexOfLastItem); // Lấy các phản hồi cho trang hiện tại

    const totalPages = Math.ceil(feedbacks.length / itemsPerPage); // Tổng số trang

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className="main-content">
                <div className="section-body">
                    <h2 className="section-title">Quản lý Feedback</h2>
                    <div className="card-header">
                        <label htmlFor="date">Ngày phản hồi:</label>
                        <input
                            type="date"
                            value={date || ''} // Gán giá trị ngày từ URL hoặc rỗng
                            onChange={handleDateChange}
                        />
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-striped table-md">
                                <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã phản hồi</th>
                                    <th>Ngày phản hồi</th>
                                    <th>Người tạo</th>
                                    <th>Email</th>
                                    <th>Nội dung</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentFeedbacks.map((item, index) => (
                                    <tr key={item.feedbackId}>
                                        <td>{indexOfFirstItem + index + 1}</td>
                                        <td>{item.feedbackId}</td>
                                        <td>{formatDate(item.feedbackDate)}</td>
                                        <td>{item.creator.employee.fullName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.content}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Phân trang */}
                    <div className="card-footer text-right">
                        <nav className="d-inline-block">
                            <ul className="pagination mb-0">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <Link
                                        className="page-link"
                                        to="#"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    >
                                        <i className="fas fa-chevron-left"></i>
                                    </Link>
                                </li>
                                {[...Array(totalPages)].map((_, pageIndex) => (
                                    <li
                                        key={pageIndex + 1}
                                        className={`page-item ${currentPage === pageIndex + 1 ? 'active' : ''}`}
                                    >
                                        <Link
                                            className="page-link"
                                            to="#"
                                            onClick={() => handlePageChange(pageIndex + 1)}
                                        >
                                            {pageIndex + 1}
                                        </Link>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <Link
                                        className="page-link"
                                        to="#"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    >
                                        <i className="fas fa-chevron-right"></i>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FeedbackList;
