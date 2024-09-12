import axios from "axios";

export const getAllOrders = async (codeSearch, dateSearch, page = 0, size = 10) => {
    try {
        const response = await axios.get('http://localhost:8080/api/orders', {
            params: {
                codeSearch: codeSearch || '',
                dateSearch: dateSearch || '',
                page: page,
                size: size
            }
        });
        return response.data;
    } catch (error) {
        console.error("không tìm thấy đơn hàng:", error);
        return null;
    }
};


export const getOrderDetails = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/orders/detail/${id}`);
        return response.data;
    } catch (error) {
        console.error('ko tìm thấy chi tiết đơn hàng:', error);
        throw error;
    }
};


