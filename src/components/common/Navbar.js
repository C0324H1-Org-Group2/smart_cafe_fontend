import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
            <div className="container">
                <a className="navbar-brand" href="index.html">Coffee<small>Smart</small></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="oi oi-menu"></span> Menu
                </button>
                <div className="collapse navbar-collapse" id="ftco-nav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active"><Link to="/" className="nav-link">Home</Link></li>
                        <li className="nav-item"><Link to="/menu" className="nav-link">Menu</Link></li>
                        <li className="nav-item"><a href="services.html" className="nav-link">Services</a></li>
                        <li className="nav-item"><Link to="/news" className="nav-link">News</Link></li>
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
                        <li className="nav-item"><a href="contact.html" className="nav-link">Contact</a></li>
                        <li className="nav-item cart"><a href="cart.html" className="nav-link"><span
                            className="icon icon-shopping_cart"></span><span
                            className="bag d-flex justify-content-center align-items-center"><small>1</small></span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
