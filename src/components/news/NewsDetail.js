import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {getNewsById} from "../services/NewsService";

const NewsDetail = () => {
    const { newsId } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const newsData = await getNewsById(newsId);
                setNews(newsData);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [newsId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!news) return <p>No news found</p>;

    return (
        <section className="ftco-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <h2 className="mb-3">{news.title}</h2>
                        <p>{news.content}</p>
                        {news.imageUrl && (
                            <p>
                                <img src={`/images/${news.imageUrl}`} alt={news.title} className="img-fluid" />
                            </p>
                        )}
                        <div className="tag-widget post-tag-container mb-5 mt-5">
                            <div className="tagcloud">
                                <a href="#" className="tag-cloud-link">Life</a>
                                <a href="#" className="tag-cloud-link">Sport</a>
                                <a href="#" className="tag-cloud-link">Tech</a>
                                <a href="#" className="tag-cloud-link">Travel</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsDetail;
