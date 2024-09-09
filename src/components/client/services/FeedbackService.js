import axios from "axios";

export const getAllFeedback = async (date) => {
    try {
        let res = await axios.get(`http://localhost:8080/api/feedbacks/${date}`);
        return res.data;
    }catch (e){
        console.error(e);
        return [];
    }
}