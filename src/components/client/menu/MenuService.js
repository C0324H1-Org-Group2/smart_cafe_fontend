import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as serviceService from "../serivces/ServiceService";

// const getMenuData = async () => {
//     try {
//         const response = await axios.get('http://localhost:8080/api/services/getAll');
//         return response.data;
//     } catch (e) {
//         console.log("Error getting menu data: " + e);
//         return [];
//     }
// }

const MenuService = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await serviceService.getAllServices();
            setMenuItems(data);
        };

        fetchData();
    }, []);

    return (
        <section className="ftco-section">
            <div className="container">
                <div className="row">
                    {menuItems.map((item) => (
                        <div key={item.id} className="col-md-6 mb-5 pb-3">
                            <h3 className="mb-5 heading-pricing ftco-animate">{item.serviceName}</h3>
                            <div className="pricing-entry d-flex ftco-animate">
                                <div className="img" style={{backgroundImage: `url(${item.imageUrl})`}}></div>
                                <div className="desc pl-3">
                                    <div className="d-flex text align-items-center">
                                        <h3><span>{item.serviceName}</span></h3>
                                        <span className="price">{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                    </div>
                                    <div className="d-block">
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MenuService;