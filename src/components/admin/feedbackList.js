import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as feedbackService from '../services/FeedbackService';

function FeedbackList() {
    const { date } = useParams(); // Lấy giá trị `date` từ URL
    const [feedbacks, setFeedbacks] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (date) {
            getAllFeedback(date);
        }
    }, [date]);

    const getAllFeedback = async (date) => {
        try {
            const feedbackList = await feedbackService.getAllFeedback(date);
            setFeedbacks(feedbackList);
            setError(null); // Reset lỗi khi thành công
        } catch (e) {
            console.error("Lỗi danh sách phản hồi", e);
            setError("Không thể tải danh sách phản hồi.");
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
        navigate(`/feedback/${selectedDate}`);
    };

    return (
        <>
            <h1>Quản lý phản hồi</h1>
            <label htmlFor="date">Ngày phản hồi:</label>
            <input
                type="date"
                value={date || ''}
                onChange={handleDateChange}
            />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <table>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã phản hồi</th>
                    <th>Ngày hồi</th>
                    <th>Người tạo</th>
                    <th>Email</th>
                    <th>Phản hồi</th>
                </tr>
                </thead>
                <tbody>
                {feedbacks.map((item, index) => (
                    <tr key={item.code}>
                        <td>{index + 1}</td>
                        <td>{item.code}</td>
                        <td>{formatDate(item.date)}</td>
                        <td>{item.creator.username}</td>
                        <td>{item.email}</td>
                        <td>{item.content}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default FeedbackList;
