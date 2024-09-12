import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/tables';

export const getAllTables = async (page = 0, size = 10) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: { page, size },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tables:', error);
        throw error;
    }
};

export const searchTableById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/search`, {
            params: { id }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return 'Not found!';
        } else {
            console.error('Error searching table by ID:', error);
            throw error;
        }
    }
};

export const getTableById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy bàn theo ID:', error);
        throw error;
    }
};

export const updateTable = async (id, table) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, table);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật bảng:', error);
        throw error;
    }
};

export const createTable = async (table) => {
    try {
        const response = await axios.post('http://localhost:8080/api/tables/create', table);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo bàn:', error);
        throw error;
    }
};

