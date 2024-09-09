import React from 'react';

const categories = [
    { name: 'Tour', count: 12 },
    { name: 'Hotel', count: 22 },
    { name: 'Coffee', count: 37 },
    { name: 'Drinks', count: 42 },
    { name: 'Foods', count: 14 },
    { name: 'Travel', count: 140 }
];

const Categories = () => (
    <div className="sidebar-box">
        <div className="categories">
            <h3>Categories</h3>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>
                        <a href="#">{category.name} <span>({category.count})</span></a>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default Categories;
