import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import NewsNotification from '../news/NewsNotification';
import './Navbar.css';
const Navbar = () => {
    const [notificationCount, setNotificationCount] = useState(0);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleNewNotifications = (count) => {
        setNotificationCount(count);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
            <div className="container">
                <Link className="navbar-brand" to="/">Coffee<small>Smart</small></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="oi oi-menu"></span> Menu
                </button>
                <div className="collapse navbar-collapse" id="ftco-nav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item"><NavLink to="/" className="nav-link">Home</NavLink></li>
                        <li className="nav-item"><NavLink to="/menu" className="nav-link">Menu</NavLink></li>
                        <li className="nav-item"><a href="services.html" className="nav-link">Services</a></li>
                        <li className="nav-item"><NavLink to="/news" className="nav-link">News</NavLink></li>
                        <li className="nav-item"><a href="about.html" className="nav-link">About</a></li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="room.html" id="dropdown04"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Shop</a>
                            <div className="dropdown-menu" aria-labelledby="dropdown04">
                                <a className="dropdown-item" href="shop.html">Shop</a>
                                <a className="dropdown-item" href="product-single.html">Single Product</a>
                                <a className="dropdown-item" href="room.html">Cart</a>
                                <a className="dropdown-item" href="checkout.html">Checkout</a>
                            </div>
                        </li>
                        <li className="nav-item cart">
                            <a onClick={toggleDropdown} className="nav-link">
                                <span className="icon icon-bell"></span>
                                <span className="bag d-flex justify-content-center align-items-center">
                                    <small>{notificationCount}</small> {/* Display notification count */}
                                </span>
                            </a>
                            <NewsNotification onNewNotifications={handleNewNotifications} isDropdownOpen={isDropdownOpen} />
                        </li>
                        <li className="nav-item cart">
                            <a href="cart.html" className="nav-link">
                                <span className="icon icon-shopping_cart"></span>
                                <span className="bag d-flex justify-content-center align-items-center">
                                    <small>0</small> {/* Placeholder for cart count */}
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
