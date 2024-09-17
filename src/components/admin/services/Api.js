import axios from "axios";

export const login = async (credentials) => {
    try {
        const response = await axios.post("http://localhost:8080/api/login", credentials);
        const token = response.data.token;
        localStorage.setItem("token", token);

        const userId = response.data.id;
        localStorage.setItem("userId", userId);

        const employeeId = response.data.id;
        localStorage.setItem("employeeId", employeeId);


        const employeeName = response.data.nameEmpployee;
        localStorage.setItem("employeeName",employeeName);
        console.log("Đăng nhập thành công, token đã được lưu.");
    } catch (e) {
        console.error("Lỗi đăng nhập: " + e);
        throw e;
    }
}
