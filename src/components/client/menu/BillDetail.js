import React, { useEffect, useState } from 'react';
import moment from 'moment';

const BillDetail = ({ item, index, handleStatusChange, handleQuantityChange }) => {
    const [remainTime, setRemainTime] = useState(item.service.waitTime);
    const [quantity, setQuantity] = useState(item.quantity); // Thêm state cho số lượng

    useEffect(() => {
        if (item.isOrder) {
            const savedRemainTime = sessionStorage.getItem(`remainTime_${index}`);
            const waitTimeDuration = savedRemainTime
                ? moment.duration(savedRemainTime, "HH:mm:ss")
                : moment.duration(item.service.waitTime, "HH:mm:ss");

            const endTime = moment().add(waitTimeDuration);

            const updateRemainTime = () => {
                const now = moment();
                const remainingDuration = moment.duration(endTime.diff(now));

                if (remainingDuration.asSeconds() <= 0) {
                    setRemainTime("00:00:00");
                    sessionStorage.removeItem(`remainTime_${index}`); // Xóa khỏi sessionStorage khi hết thời gian
                } else {
                    const formattedTime = moment
                        .utc(remainingDuration.asMilliseconds())
                        .format("HH:mm:ss");
                    setRemainTime(formattedTime);
                    sessionStorage.setItem(`remainTime_${index}`, formattedTime); // Lưu vào sessionStorage
                }
            };

            updateRemainTime();
            const interval = setInterval(updateRemainTime, 1000);
            return () => clearInterval(interval);
        }
    }, [item.isOrder, item.service.waitTime, index]);

    const handleChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (newQuantity > 0) { // Đảm bảo số lượng không âm
            setQuantity(newQuantity);
            handleQuantityChange(index, newQuantity); // Gọi hàm từ component cha để cập nhật số lượng
        }
    };

    return (
        <tr key={index} className="text-center">
            <td>
                <input
                    type="checkbox"
                    checked={item.status}
                    onChange={() => handleStatusChange(index)}
                />
            </td>
            <td>
                <div
                    style={{
                        width: '75px',
                        height: '75px',
                        backgroundImage: `url(/images/${item.service.imageUrl})`,  // Sử dụng background image
                        backgroundSize: 'cover',  // Đảm bảo hình ảnh bao phủ hết khung
                        backgroundPosition: 'center',  // Căn giữa hình ảnh
                        backgroundRepeat: 'no-repeat',  // Không lặp lại hình ảnh
                    }}
                    alt={item.service.serviceName}
                />
            </td>
            <td>{item.service.serviceName}</td>
            <td>
                <input
                    className="input-number"
                    type="number"
                    value={quantity}
                    min="1" // Đảm bảo số lượng tối thiểu là 1
                    max="100"
                    onChange={handleChange} // Cập nhật số lượng khi thay đổi
                    style={{width: '80px', textAlign: 'center'}} // Tùy chỉnh giao diện
                    disabled={item.isOrder}
                />
            </td>
            <td className="price">{item.service.price.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            })}</td>
            <td className="total">{(quantity * item.service.price).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            })}</td>
            <td>{remainTime}</td>
            <td>{item.isOrder ? "Ordering" : "Wait"}</td>
        </tr>
    );
};

export default BillDetail;
