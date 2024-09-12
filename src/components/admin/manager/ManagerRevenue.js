import React, {useState, useEffect} from 'react';
import './ManagerOrder.css';
import {getRevenueSummary} from "../service/RevenueService";

const ManagerRevenue = () => {
        const [todayRevenue, setTodayRevenue] = useState(0);
        const [yesterdayRevenue, setYesterdayRevenue] = useState(0);
        const [thisMonthRevenue, setThisMonthRevenue] = useState(0);
        const [lastMonthRevenue, setLastMonthRevenue] = useState(0);
        const [thisYearRevenue, setThisYearRevenue] = useState(0);
        const [lastYearRevenue, setLastYearRevenue] = useState(0);
        const [todayPercentageChange, setTodayPercentageChange] = useState(0);
        const [monthPercentageChange, setMonthPercentageChange] = useState(0);
        const [yearPercentageChange, setYearPercentageChange] = useState(0);
        const [error, setError] = useState(null); // Để bắt lỗi nếu có

        useEffect(() => {
            const fetchData = async () => {
                // Gọi API để lấy dữ liệu doanh thu
                const data = await getRevenueSummary();
                // Cập nhật doanh thu hôm nay và hôm qua
                const today = data.today;
                const yesterday = data.yesterday;
                setTodayRevenue(today);
                setYesterdayRevenue(yesterday);

                // Cập nhật doanh thu tháng này và tháng trước
                const thisMonth = data.thisMonth;
                const lastMonth = data.lastMonth;
                setThisMonthRevenue(thisMonth);
                setLastMonthRevenue(lastMonth);

                // Cập nhật doanh thu năm nay và năm trước
                const thisYear = data.thisYear;
                const lastYear = data.lastYear;
                setThisYearRevenue(thisYear);
                setLastYearRevenue(lastYear);

                // Tính phần trăm thay đổi của doanh thu hôm nay so với hôm qua
                const todayChange = yesterday !== 0 ? ((today - yesterday) / yesterday) * 100 : 0;
                setTodayPercentageChange(todayChange.toFixed(1)); // Làm tròn đến 1 chữ số thập phân

                // Tính phần trăm thay đổi của doanh thu tháng này so với tháng trước
                const monthChange = lastMonth !== 0 ? ((thisMonth - lastMonth) / lastMonth) * 100 : 0;
                setMonthPercentageChange(monthChange.toFixed(1));

                // Tính phần trăm thay đổi của doanh thu năm nay so với năm trước
                const yearChange = lastYear !== 0 ? ((thisYear - lastYear) / lastYear) * 100 : 0;
                setYearPercentageChange(yearChange.toFixed(1));
            };
            fetchData(); // Gọi hàm fetchData khi component được render
        }, []);

        return (
            <div className="main-content">
                <div className="section-body">
                    <h2 className="section-title">Revenue Overview</h2>
                    <div className="container mt-2">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <div className="row flex-column flex-md-row">
                                    <div className="col-12 col-md-4 mb-3 d-flex justify-content-end">
                                        <div className="revenue-card">
                                            <h3>today's revenue: {todayRevenue.toLocaleString()} đ</h3>
                                            <p>
                                                Change from yesterday: {todayPercentageChange}%{' '}
                                                {todayPercentageChange > 0 ? '🔼' : todayPercentageChange < 0 ? '🔽' : '⚖️'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4 mb-3 d-flex justify-content-end">
                                        <div className="revenue-card">
                                            <h3>this month's revenue: {thisMonthRevenue.toLocaleString()} đ</h3>
                                            <p>
                                                Change from Last Month: {monthPercentageChange}%{' '}
                                                {monthPercentageChange > 0 ? '🔼' : monthPercentageChange < 0 ? '🔽' : '⚖️'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4 mb-3 d-flex justify-content-end">
                                        <div className="revenue-card">
                                            <h3>this year's revenue: {thisYearRevenue.toLocaleString()} đ</h3>
                                            <p>
                                                Change from Last Year: {yearPercentageChange}%{' '}
                                                {yearPercentageChange > 0 ? '🔼' : yearPercentageChange < 0 ? '🔽' : '⚖️'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
;
export default ManagerRevenue;
