import axios from "axios";

export const getMenuItems = async ()=> {
    try {
        const response = await axios.get('http://localhost:8080/api/services/list-service-types');
        return response.data;
    } catch (e) {
        return [];
    }
}


export const getTop5NewestServices = async ()=> {
    try {
        const response = await axios.get('http://localhost:8080/api/services/top5-newest');
        return response.data;
    } catch (e) {
        console.log("Lỗi tìm 5 món mới nhất: " + e);
        return [];
    }
}

export const getAllServices = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/services/all-services');
        return response.data;
    } catch (e) {
        console.error('Lỗi lấy tất cả :', e);
        return [];
    }
}