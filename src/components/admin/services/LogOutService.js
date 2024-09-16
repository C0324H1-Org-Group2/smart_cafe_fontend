import axios from 'axios';
const API_URL = 'http://localhost:8080/api';
export const logout = () => {
    return axios.post(`${API_URL}/logout`);
};
