import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Đảm bảo đã bao gồm Bootstrap JS
import SellNotification from "../sell-feedback/SellNotification";

const Header = () => {
    const [notificationCount, setNotificationCount] = useState(0);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setUserDropdownOpen] = useState(false); // Thêm state cho dropdown người dùng

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const toggleUserDropdown = () => {
        setUserDropdownOpen(!isUserDropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    const handleSellNotifications = (change) => {
        setNotificationCount((prevCount) => Math.max(0, prevCount + change));
    };
    const employeeName= localStorage.getItem("employeeName");

    return (
        <div className="main-wrapper main-wrapper-1">
            <div className="navbar-bg"></div>
            <nav className="navbar navbar-expand-lg main-navbar">
                <form className="form-inline mr-auto">
                    <ul className="navbar-nav mr-3">
                        <li>
                            <a href="#" data-toggle="sidebar" className="nav-link nav-link-lg">
                                <i className="fas fa-bars"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" data-toggle="search" className="nav-link nav-link-lg d-sm-none">
                                <i className="fas fa-search"></i>
                            </a>
                        </li>
                    </ul>
                    <div className="search-element">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            data-width="250"
                        />
                        <button className="btn" type="submit">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </form>

                <ul className="navbar-nav navbar-right">
                    {/* Thông báo */}
                    <li className="dropdown dropdown-list-toggle">
                        <a
                            href="#"
                            onClick={toggleDropdown}
                            className="nav-link notification-toggle nav-link-lg"
                        >
                            <i className="far fa-bell"></i>
                            <span className="badge badge-warning navbar-badge">{notificationCount}</span>
                        </a>
                        <SellNotification
                            onSellNotifications={handleSellNotifications}
                            isDropdownOpen={isDropdownOpen}
                            closeDropdown={closeDropdown}
                        />
                    </li>

                    {/* Người dùng */}
                    <li className="dropdown">
                        <a
                            href="#"
                            onClick={toggleUserDropdown}
                            className="nav-link dropdown-toggle nav-link-lg nav-link-user"
                        >
                            <img alt="image" src="/assets/img/avatar/avatar-1.png" className="rounded-circle mr-1" />
                            <div className="d-sm-none d-lg-inline-block">Hi,{employeeName}</div>
                        </a>
                        <div className={`dropdown-menu dropdown-menu-right ${isUserDropdownOpen ? 'show' : ''}`}>
                            <div className="dropdown-title">Logged in 5 min ago</div>
                            <a href="features-profile.html" className="dropdown-item has-icon">
                                <i className="far fa-user"></i> Profile
                            </a>
                            <a href="features-activities.html" className="dropdown-item has-icon">
                                <i className="fas fa-bolt"></i> Activities
                            </a>
                            <a href="features-settings.html" className="dropdown-item has-icon">
                                <i className="fas fa-cog"></i> Settings
                            </a>
                            <div className="dropdown-divider"></div>
                            <a href="/admin/logout" className="dropdown-item has-icon text-danger">
                                <i className="fas fa-sign-out-alt"></i> Logout
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
