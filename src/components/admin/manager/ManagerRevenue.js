import React, { useEffect, useState } from 'react';
import { getAllRevenue } from "../service/RevenueService";

const ManagerRevenue = () => {
    const [revenueSummary, setRevenueSummary] = useState({
        today: 0,
        thisMonth: 0,
        thisYear: 0
    });

    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const response = await getAllRevenue();
                // Đảm bảo response có giá trị hợp lệ
                setRevenueSummary(response || {
                    today: 0,
                    thisMonth: 0,
                    thisYear: 0
                });
            } catch (error) {
                console.error('Failed to fetch revenue summary:', error);
            }
        };

        fetchRevenue();
    }, []); // Dependency array is empty to run only once after the initial render

    return (
        <div>
            <h1>Revenue Summary</h1>
            <p>Today's Revenue: {(revenueSummary.today || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            <p>This Month's Revenue: {(revenueSummary.thisMonth || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            <p>This Year's Revenue: {(revenueSummary.thisYear || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
        </div>
    );
};

export default ManagerRevenue;
