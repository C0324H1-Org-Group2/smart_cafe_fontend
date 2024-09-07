import React, { useState } from 'react';
import axios from 'axios';

const NewsForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    // Đặt userId mặc định (ví dụ: 1)
    const defaultUserId = 1;

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (file) {
            formData.append('file', file);
        }
        // Gửi userId mặc định về backend
        formData.append('userId', defaultUserId);

        try {
            const response = await axios.post('http://localhost:8080/api/news/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('News created:', response.data);
        } catch (err) {
            setError('Failed to create news');
            console.error(err);
        }
    };

    return (
        <div>
            <div className="main-content">
                <div className="section-body">
            <h1>Create News</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="file">Image</label>
                    <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
                {error && <p>{error}</p>}
            </form>
                </div>
            </div>
        </div>
    );
};

export default NewsForm;
