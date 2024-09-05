import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { parseISO } from "date-fns";

const NewsEntry = ({ imageUrl, publishDate, creator, title, content, newsId }) => {
    const formattedDate = formatDistanceToNow(parseISO(publishDate), { addSuffix: true });

    return (
        <div className="col-md-4 d-flex">
            <div className="blog-entry align-self-stretch">
                <Link to={`/news/${newsId}`} className="block-20" style={{ backgroundImage: `url(/images/${imageUrl})` }} aria-label={title}>
                </Link>
                <div className="text py-4 d-block">
                    <div className="meta">
                        <div><a href="#">{formattedDate || "Unknown Date"}</a></div>
                        <div><a href="#">{creator || "Unknown Author"}</a></div>
                    </div>
                    <h3 className="heading mt-2"><Link to={`/news/${newsId}`}>{title}</Link></h3>
                    <p>{content}</p>
                </div>
            </div>
        </div>
    );
};

export default NewsEntry;
