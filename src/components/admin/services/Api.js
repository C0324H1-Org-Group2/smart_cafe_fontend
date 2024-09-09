import axios from "axios";

export const login = async (credentials) => {
    try {
        const response = await axios.post("http://localhost:8080/api/login", credentials);
        const token = response.data.token;
        localStorage.setItem("token", token);
        console.log("Đăng nhập thành công, token đã được lưu.");
    } catch (e) {
        console.error("Lỗi đăng nhập: " + e);
        throw e;
    }
}
