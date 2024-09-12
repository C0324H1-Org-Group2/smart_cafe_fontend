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
        console.error("Lỗi lấy tất cả sản phẩm:", error);
        return null;
    }
};

export const getServiceDetails = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/services/detail/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi lấy chi tiết sản phẩm:', error);
        throw error;
    }
};

export const createService = async (service) => {
    try {
        const response = await axios.post('http://localhost:8080/api/services/add', service);
        return response.data;
    } catch (error) {
        console.error('Lỗi tạo sản phẩm:', error);
        throw error;
    }
};
export const getServiceTypes = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/services/list-service-types');
        return response.data;
    } catch (error) {
        console.error('Error fetching service types:', error);
    }
};
export const updateService = async (serviceId, service) => {
    try {
        const response = await axios.patch(`http://localhost:8080/api/services/update/${serviceId}`, service);
        return response.data;
    } catch (error) {
        console.error('Error updating service:', error);
        throw error;
    }
};