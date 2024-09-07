import axios from 'axios';

const API_URL = 'http://localhost:8080/api/news/create';

export const createNews = async (formData) => {
    try {
        const response = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to create news');
    }
};
