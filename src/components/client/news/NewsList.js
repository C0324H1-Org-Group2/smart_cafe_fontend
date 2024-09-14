import React, {useEffect, useState} from "react";
import NewsEntry from "./NewsEntry";
import * as newsService from "../services/NewsService";
import useScrollToHash from "../common/UseScrollToHash";
const NewsList = () => {
    const [newsEntries, setNewsEntries] = useState([]);
    const [visibleEntries, setVisibleEntries] = useState(6);
    useScrollToHash([newsEntries]);

    useEffect(() => {
        findAllNews();
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll)
        };
    }, []);

    const findAllNews = async () => {
        const data = await newsService.getAllActiveNews();
        data.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
        setNewsEntries(data);
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            loadMoreEntries();
        }
    };

    const loadMoreEntries = () => {
        setVisibleEntries((prevVisibleEntries) => prevVisibleEntries + 3);
    };

    return (
        <section className="ftco-section" id="news-list">
            <div className="container">
                <h2 className="mb-5">News List</h2>
                <div className="row d-flex">
                    {newsEntries.slice(0, visibleEntries).map((entry) => (
                        <NewsEntry
                            key={entry.newsId}
                            newsId={entry.newsId}
                            imageUrl={entry.imageUrl}
                            publishDate={entry.publishDate}
                            creator={entry.creator.username}
                            title={entry.title}
                            content={entry.content}
                            // viewCount={entry.viewCount}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsList;
