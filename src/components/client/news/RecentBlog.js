import React from 'react';

const recentBlogs = [
    {
        image: 'images/image_1.jpg',
        title: 'Even the all-powerful Pointing has no control about the blind texts',
        date: 'July 12, 2018',
        author: 'Admin',
        comments: 19
    },
    {
        image: 'images/image_2.jpg',
        title: 'Even the all-powerful Pointing has no control about the blind texts',
        date: 'July 12, 2018',
        author: 'Admin',
        comments: 19
    },
    {
        image: 'images/image_3.jpg',
        title: 'Even the all-powerful Pointing has no control about the blind texts',
        date: 'July 12, 2018',
        author: 'Admin',
        comments: 19
    }
];

const RecentBlog = () => (
    <div className="sidebar-box">
        <h3>Recent Blog</h3>
        {recentBlogs.map((blog, index) => (
            <div className="block-21 mb-4 d-flex" key={index}>
                <a className="blog-img mr-4" style={{ backgroundImage: `url(/${blog.image})` }}></a>
                <div className="text">
                    <h3 className="heading"><a href="#">{blog.title}</a></h3>
                    <div className="meta">
                        <div><a href="#"><span className="icon-calendar"></span> {blog.date}</a></div>
                        <div><a href="#"><span className="icon-person"></span> {blog.author}</a></div>
                        <div><a href="#"><span className="icon-chat"></span> {blog.comments}</a></div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default RecentBlog;
