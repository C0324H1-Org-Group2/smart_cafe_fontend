import React, {useEffect, useState} from "react";
import NewsEntry from "./NewsEntry";
import * as newsService from "../services/NewsService";
import useScrollToHash from "../common/UseScrollToHash";
const NewsList = () => {
    const [newsEntries, setNewsEntries] = useState([]);
    useScrollToHash([newsEntries]);

    useEffect(() => {
        findAllNews();
    }, []);

    const findAllNews = async () => {
        const data = await newsService.getAllNews();
        data.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
        setNewsEntries(data);
    };

    return (
        <section className="ftco-section" id="news-list">
            <div className="container">
                <h2 className="mb-5">News List</h2>
                <div className="row d-flex">
                    {newsEntries.map((entry) => (
                        <NewsEntry
                            key={entry.newsId}
                            newsId={entry.newsId}
                            imageUrl={entry.imageUrl}
                            publishDate={entry.publishDate}
                            creator={entry.creator.username}
                            title={entry.title}
                            content={entry.content}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsList;
