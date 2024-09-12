import axios from 'axios';

const API_URL = 'http://localhost:8080/api/employees';

// Đăng ký nhân viên mới
const registerEmployee = async (employeeData, userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            employeeDTO: employeeData,
            userDTO: userData,
        });
        return response.data;
    } catch (error) {
        console.error('Error during employee registration:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Lấy thông tin nhân viên theo ID
const fetchEmployeeById = async (employeeId) => {
    try {
        const response = await axios.get(`${API_URL}/${employeeId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching employee details:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Cập nhật thông tin nhân viên
const updateEmployeeInfo = async (employeeId, employeeData) => {
    try {
        const response = await axios.put(`${API_URL}/update/${employeeId}`, employeeData);
        return response.data;
    } catch (error) {
        console.error('Error updating employee:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Xóa nhân viên theo ID
const deleteEmployee = async (employeeId) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${employeeId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting employee:', error.response ? error.response.data : error.message);
        throw error;
    }
};


export default {
    registerEmployee,
    fetchEmployeeById,
    updateEmployeeInfo,
    deleteEmployee
 };
