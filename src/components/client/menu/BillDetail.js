import React, { useEffect, useState } from 'react';
import moment from 'moment';

const BillDetail = ({ item, index, handleStatusChange }) => {
    const [remainTime, setRemainTime] = useState(item.service.waitTime);

    useEffect(() => {
        if (item.isOrder) {
            const waitTimeDuration = moment.duration(item.service.waitTime, "HH:mm:ss");
            const endTime = moment().add(waitTimeDuration);

            const updateRemainTime = () => {
                const now = moment();
                const remainingDuration = moment.duration(endTime.diff(now));

                if (remainingDuration.asSeconds() <= 0) {
                    setRemainTime("00:00:00");
                } else {
                    setRemainTime(moment.utc(remainingDuration.asMilliseconds()).format("HH:mm:ss"));
                }
            };

            updateRemainTime();
            const interval = setInterval(updateRemainTime, 1000);

            return () => clearInterval(interval);
        }
    }, [item.isOrder, item.service.waitTime]);

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
