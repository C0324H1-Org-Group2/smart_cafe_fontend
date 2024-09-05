import axios from "axios";

export const getTop5NewestServices = async ()=> {
    try {
        const response = await axios.get('http://localhost:8080/api/services/top5-newest');
        return response.data;
    } catch (e) {
        console.log("Lỗi tìm 5 món mới nhất: " + e);
        return [];
    }
}