import axios from "axios";

export const getAllRevenue = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/revenue');
        return response.data;
    } catch (e) {
        console.error('lỗi lấy tất cả doanh thu :', e);
        return [];
    }
}

export const getMonthlyRevenueInYear = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/revenue/month-in-year');
        return response.data;
    } catch (e) {
        console.error('l��i lấy doanh thu theo tháng trong năm :', e);
        return [];
    }
}

export const getServiceRevenue = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/revenue/service');
        return response.data;
    } catch (e) {
        console.error('l��i lấy doanh thu theo dịch vụ :', e);
        return [];
    }
}

export const getRevenueSummary = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/revenue');
        return response.data;
    } catch (e) {
        console.error('l��i lấy t��ng quan doanh thu :', e);
        return [];
    }
}

export const getTopSellService = async (year) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/revenue/top-service`, {
            params: {year : year || ""}
    });
        return response.data;
    } catch (e) {
        console.error('l��i lấy top 10 dịch vụ bán chạy nhất :', e);
        return [];
    }
}

export const getRevenueByDate = async (dateFrom, dateTo) => {
    try {
        const response = await axios.get('http://localhost:8080/api/revenue/search', {
            params: {
                dateFrom,
                dateTo
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching revenue data:', error);
        throw error;
    }
};
