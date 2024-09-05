import React, { useEffect, useState } from 'react';
import * as serviceService from "../serivces/ServiceService";
import './TopNewestServices.css';

const TopNewestServices = () => {
    const [coffeeItems, setCoffeeItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const itemsPerPage = 4;

    useEffect(() => {
        findTop5NewestServices();
    }, []);

    const findTop5NewestServices = async () => {
        const data = await serviceService.getTop5NewestServices();
        setCoffeeItems(data);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = coffeeItems.slice(indexOfFirstItem, indexOfLastItem);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentPage(currentPage - 1);
                setIsTransitioning(false);
            }, 300);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(coffeeItems.length / itemsPerPage)) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentPage(currentPage + 1);
                setIsTransitioning(false);
            }, 300);
        }
    };

    return (
        <section className="ftco-section">
            <div className="container">
                <div className="row justify-content-center mb-5 pb-3">
                    <div className="col-md-7 heading-section text-center">
                        <span className="subheading">Discover</span>
                        <h2 className="mb-4">Top 5 Newest Services</h2>
                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    </div>
                </div>
                <div className={`row ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
                    {currentItems.length === 0 ? (
                        <p>Loading...</p>
                    ) : (
                        currentItems.map((item) => (
                            <div key={item.serviceId} className="col-md-3">
                                <div className="menu-entry">
                                    <a href="#" className="img" style={{ backgroundImage: `url(/images/${item.imageUrl})` }}></a>
                                    <div className="text text-center pt-4">
                                        <h3><a href="#">{item.serviceName}</a></h3>
                                        <p className="price"><span>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></p>
                                        <p><a href="#" className="btn btn-primary btn-outline-primary">Add to Cart</a></p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="row justify-content-center mt-5">
                    <div className="col-md-6 text-center">
                        <div className="btn-group" role="group" aria-label="Pagination controls">
                            <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>&lt;</button>
                            <button className="btn btn-primary" onClick={handleNextPage} disabled={currentPage === Math.ceil(coffeeItems.length / itemsPerPage)}>&gt;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopNewestServices;
