import axios from 'axios';

export const login = async (credentials) => {
    try {
        const response = await axios.post('http://localhost:8080/api/login', credentials);
        const { token, authorities } = response.data;

        // Lưu token vào localStorage
        localStorage.setItem('token', token);

        // Lưu quyền hạn vào localStorage dưới dạng JSON
        localStorage.setItem('roles', JSON.stringify(authorities.map(auth => auth.authority)));

        console.log('Đăng nhập thành công, token và quyền đã được lưu.');
    } catch (e) {
        console.error('Lỗi đăng nhập:', e);
        throw e;
    }
};
