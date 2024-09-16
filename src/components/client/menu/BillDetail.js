import React, { useEffect, useState } from 'react';
import moment from 'moment';

const BillDetail = ({ item, index, handleStatusChange }) => {
    const [remainTime, setRemainTime] = useState(item.service.waitTime);

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
            <td>{item.quantity}</td>
            <td className="price">{item.service.price.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            })}</td>
            <td className="total">{(item.quantity * item.service.price).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            })}</td>
            <td>{remainTime}</td>
            <td>{item.isOrder ? "Ordering" : "Wait"}</td>
        </tr>
    );
};

export default BillDetail;
