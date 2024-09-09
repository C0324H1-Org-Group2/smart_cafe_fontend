import React from 'react';

const tags = ['dish', 'menu', 'food', 'sweet', 'tasty', 'delicious', 'desserts', 'drinks'];

const TagCloud = () => (
    <div className="sidebar-box">
        <h3>Tag Cloud</h3>
        <div className="tagcloud">
            {tags.map((tag, index) => (
                <a href="#" className="tag-cloud-link" key={index}>{tag}</a>
            ))}
        </div>
    </div>
);

export default TagCloud;
