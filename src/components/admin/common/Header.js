import React from 'react';

const Header = () => {
    return (
            <div className="navbar-bg">
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
                        {/* Các mục khác */}
                    </div>
                </form>
                <ul className="navbar-nav navbar-right">
                    {/* Mục tin nhắn */}
                    <li className="dropdown dropdown-list-toggle">
                        <a href="#" data-toggle="dropdown" className="nav-link nav-link-lg message-toggle beep">
                            <i className="far fa-envelope"></i>
                        </a>
                        {/* Nội dung dropdown */}
                    </li>
                    {/* Mục thông báo */}
                    <li className="dropdown dropdown-list-toggle">
                        <a href="#" data-toggle="dropdown" className="nav-link notification-toggle nav-link-lg beep">
                            <i className="far fa-bell"></i>
                        </a>
                        {/* Nội dung dropdown */}
                    </li>
                    {/* Mục người dùng */}
                    <li className="dropdown">
                        <a href="#" data-toggle="dropdown"
                           className="nav-link dropdown-toggle nav-link-lg nav-link-user">
                            <img alt="User" src="assets/img/avatar/avatar-1.png" className="rounded-circle mr-1"/>
                            <div className="d-sm-none d-lg-inline-block">Hi, Ujang Maman</div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
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
                            <a href="#" className="dropdown-item has-icon text-danger">
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
