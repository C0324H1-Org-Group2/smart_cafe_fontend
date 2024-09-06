import React, {useEffect, useState} from "react";
import NewsEntry from "./NewsEntry";
import * as newsService from "../services/NewsService";
const NewsList = () => {
    const [newsEntries, setNewsEntries] = useState([]);

    useEffect(() => {
        findAllNews();
    }, []);

    const findAllNews = async () => {
        const data = await newsService.getAllNews();
        setNewsEntries(data);
    }

    return (
        <section className="ftco-section">
            <div className="container">
                <h2 className="mb-5">News List</h2>
                <div className="row d-flex">
                    {newsEntries.map((entry) => (
                        <NewsEntry
                            key={entry.newsId}
                            newsId={entry.newsId}
                            imageUrl={entry.imageUrl}
                            publishDate={entry.publishDate}
                            creator={'by ' + entry.creator.username}
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
