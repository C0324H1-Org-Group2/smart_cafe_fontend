import React, { useEffect, useState } from 'react';
import moment from "moment";

const BillDetail = ({ item, index, handleStatusChange }) => {
    const [remainTime, setRemainTime] = useState(item.waitTime);

    useEffect(() => {
        const interval = setInterval(() => {
            let time = moment(remainTime, "HH:mm:ss");

            time = time.subtract(1, 'seconds');

            if (time.isBefore(moment().startOf('day'))) {
                clearInterval(interval);
                setRemainTime("00:00:00");
            } else {
                setRemainTime(time.format("HH:mm:ss"));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [remainTime]);

    const orderStatus = remainTime === "00:00:00" ? "Ordering" : "Wait";

    return (
        <tbody>
        <tr key={index}>
            <td>
                <input
                    type="checkbox"
                    checked={item.status}
                    onChange={() => handleStatusChange(index)}
                />
            </td>
            <td>{index + 1}</td>
            <td>{item.serviceName}</td>
            <td>{item.quantity}</td>
            <td>{item.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}</td>
            <td>{(item.quantity * item.price).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}</td>
            <td>{remainTime}</td>
            <td>{orderStatus}</td>
        </tr>
        </tbody>
    );
};

export default BillDetail;
