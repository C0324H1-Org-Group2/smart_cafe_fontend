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
        <tr key={index}>
            <td>
                <input
                    type="checkbox"
                    checked={item.status}
                    onChange={() => handleStatusChange(index)}
                />
            </td>
            <td>{index + 1}</td>
            <td>{item.service.serviceName}</td>
            <td>{item.quantity}</td>
            <td>{item.service.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            <td>{(item.quantity * item.service.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            <td>{remainTime}</td>
            <td>{item.isOrder ? "Ordering" : "Wait"}</td>
        </tr>
    );
};

export default BillDetail;
