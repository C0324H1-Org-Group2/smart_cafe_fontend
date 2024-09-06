import {useEffect, useState} from "react";
import * as feedbackService from "../serivces/FeedbackService"

function feedback() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [date, setDate] = useState("")
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [feedbacks, setFeedbacks] = useState([])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        getAllFeedback(date)
    }, [date]);

    const getAllFeedback = async (date) => {
        try {
            let feedbackList = await feedbackService.getAllFeedback(date);
            setFeedbacks(feedbackList)
        }catch (e){
            console.error("Loi danh sach", e);
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    return (
        <>
            <h1>Quản lí phản hồi</h1>
            <label htmlFor="date">Ngày phản hồi:</label>
            <input type="date" value={date} onChange={(e)=> setDate(e.target.value)}/>
            {/*<Link onClick={(e) => setDate(e)}>Tim kiem</Link>*/}

            <table>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã phản hồi</th>
                    <th>Ngày hồi</th>
                    <th>Người tạo</th>
                    <th>Email</th>
                    <th>Phản hồi</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {feedbacks.map((item,index) =>
                    <tr>
                        <td>{item.index + 1}</td>
                        <td>{item.code}</td>
                        <td>{formatDate(item.date)}</td>
                        <td>{item.creator.username}</td>
                        <td>{item.email}</td>
                        <td>{item.content}</td>
                    </tr>)}
                </tbody>
            </table>
        </>
    )
}

export default feedback;