import axios from "axios";

export const getAllNews = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/news");
        return response.data;
    } catch (e) {
        console.error("Lỗi lấy ra tất cả tin tức: " + e);
        return [];
    }
}
