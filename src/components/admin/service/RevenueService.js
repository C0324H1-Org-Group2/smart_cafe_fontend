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