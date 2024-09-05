import React from "react";

const NewsEntry = ({ imageUrl, publishDate, creator, title, content }) => {
    return (
        <div className="col-md-4 d-flex">
            <div className="blog-entry align-self-stretch">
                <a href="#" className="block-20" style={{ backgroundImage: `url(/images/${imageUrl})` }} aria-label={title}>
                </a>
                <div className="text py-4 d-block">
                    <div className="meta">
                        <div><a href="#">{publishDate || "Unknown Date"}</a></div>
                        <div><a href="#">{creator || "Unknown Author"}</a></div>
                    </div>
                    <h3 className="heading mt-2"><a href="#">{title}</a></h3>
                    <p>{content}</p>
                </div>
            </div>
        </div>
    );
};

export default NewsEntry;
