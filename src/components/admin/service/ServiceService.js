import axios from "axios";

export const getAllServices = async (page = 0, size = 10) => {
    try {
        const response = await axios.get('http://localhost:8080/api/services/all-services', {
            params: {
                page: page,
                size: size
            }
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi lấy tất cả dịch vụ:", error);
        return null;
    }
};

export const getServiceDetails = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/services/detail/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi lấy chi tiết dịch vụ:', error);
        throw error;
    }
};

export const createService = async (service) => {
    try {
        const response = await axios.post('/api/services/add', service);
        return response.data;
    } catch (error) {
        console.error('Failed to create service', error);
        throw error;
    }
};