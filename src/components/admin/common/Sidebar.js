import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="main-sidebar sidebar-style-2">
            <aside id="sidebar-wrapper">
                <div className="sidebar-brand">
                    <Link to="/admin">Smart Cafe</Link>
                </div>
                <div className="sidebar-brand sidebar-brand-sm">
                    <Link to="/admin">St</Link>
                </div>
                <ul className="sidebar-menu">
                    <li className="menu-header">Dashboard</li>
                        <Link to="/admin/service" className="nav-link has-dropdown">
                            <i className="fas fa-fire"></i>
                            <span>Quản lý món</span>
                        </Link>
                    <li className="menu-header">Starter</li>
                    <li className="dropdown">
                        <a href="#" className="nav-link has-dropdown" data-toggle="dropdown">
                            <i className="fas fa-columns"></i> <span>Layout</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li><Link className="nav-link" to="layout-default.html">Default Layout</Link></li>
                            <li><Link className="nav-link" to="layout-transparent.html">Transparent Sidebar</Link></li>
                            <li><Link className="nav-link" to="layout-top-navigation.html">Top Navigation</Link></li>
                        </ul>
                    </li>
                    <li><Link className="nav-link" to="blank.html"><i className="far fa-square"></i> <span>Blank Page</span></Link></li>
                    <li className="dropdown">
                        <a href="#" className="nav-link has-dropdown">
                            <i className="fas fa-th"></i> <span>Bootstrap</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li><Link className="nav-link" to="bootstrap-alert.html">Alert</Link></li>
                            <li><Link className="nav-link" to="bootstrap-badge.html">Badge</Link></li>
                            <li><Link className="nav-link" to="bootstrap-breadcrumb.html">Breadcrumb</Link></li>
                            <li><Link className="nav-link" to="bootstrap-buttons.html">Buttons</Link></li>
                            <li><Link className="nav-link" to="bootstrap-card.html">Card</Link></li>
                            <li><Link className="nav-link" to="bootstrap-carousel.html">Carousel</Link></li>
                            <li><Link className="nav-link" to="bootstrap-collapse.html">Collapse</Link></li>
                            <li><Link className="nav-link" to="bootstrap-dropdown.html">Dropdown</Link></li>
                            <li><Link className="nav-link" to="bootstrap-form.html">Form</Link></li>
                            <li><Link className="nav-link" to="bootstrap-list-group.html">List Group</Link></li>
                            <li><Link className="nav-link" to="bootstrap-media-object.html">Media Object</Link></li>
                            <li><Link className="nav-link" to="bootstrap-modal.html">Modal</Link></li>
                            <li><Link className="nav-link" to="bootstrap-nav.html">Nav</Link></li>
                            <li><Link className="nav-link" to="bootstrap-navbar.html">Navbar</Link></li>
                            <li><Link className="nav-link" to="bootstrap-pagination.html">Pagination</Link></li>
                            <li><Link className="nav-link" to="bootstrap-popover.html">Popover</Link></li>
                            <li><Link className="nav-link" to="bootstrap-progress.html">Progress</Link></li>
                            <li><Link className="nav-link" to="bootstrap-table.html">Table</Link></li>
                            <li><Link className="nav-link" to="bootstrap-tooltip.html">Tooltip</Link></li>
                            <li><Link className="nav-link" to="bootstrap-typography.html">Typography</Link></li>
                        </ul>
                    </li>
                    <li className="menu-header">Stisla</li>
                    <li className="dropdown">
                        <a href="#" className="nav-link has-dropdown">
                            <i className="fas fa-th-large"></i> <span>Components</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li><Link className="nav-link" to="components-article.html">Article</Link></li>
                            <li><Link className="nav-link beep beep-sidebar" to="components-avatar.html">Avatar</Link></li>
                            <li><Link className="nav-link" to="components-chat-box.html">Chat Box</Link></li>
                            <li><Link className="nav-link beep beep-sidebar" to="components-empty-state.html">Empty State</Link></li>
                            <li><Link className="nav-link" to="components-gallery.html">Gallery</Link></li>
                            <li><Link className="nav-link beep beep-sidebar" to="components-hero.html">Hero</Link></li>
                            <li><Link className="nav-link" to="components-multiple-upload.html">Multiple Upload</Link></li>
                            <li><Link className="nav-link beep beep-sidebar" to="components-pricing.html">Pricing</Link></li>
                            <li><Link className="nav-link" to="components-statistic.html">Statistic</Link></li>
                            <li><Link className="nav-link" to="components-tab.html">Tab</Link></li>
                            <li><Link className="nav-link" to="components-table.html">Table</Link></li>
                            <li><Link className="nav-link" to="components-user.html">User</Link></li>
                            <li><Link className="nav-link beep beep-sidebar" to="components-wizard.html">Wizard</Link></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a href="#" className="nav-link has-dropdown">
                            <i className="far fa-file-alt"></i> <span>Forms</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li><Link className="nav-link" to="forms-advanced-form.html">Advanced Form</Link></li>
                            <li><Link className="nav-link" to="forms-editor.html">Editor</Link></li>
                            <li><Link className="nav-link" to="forms-validation.html">Validation</Link></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a href="#" className="nav-link has-dropdown">
                            <i className="fas fa-map-marker-alt"></i> <span>Google Maps</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li><Link to="gmaps-advanced-route.html">Advanced Route</Link></li>
                            <li><Link to="gmaps-draggable-marker.html">Draggable Marker</Link></li>
                            <li><Link to="gmaps-geocoding.html">Geocoding</Link></li>
                            <li><Link to="gmaps-geolocation.html">Geolocation</Link></li>
                            <li><Link to="gmaps-marker.html">Marker</Link></li>
                            <li><Link to="gmaps-multiple-marker.html">Multiple Marker</Link></li>
                            <li><Link to="gmaps-route.html">Route</Link></li>
                            <li><Link to="gmaps-simple.html">Simple</Link></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a href="#" className="nav-link has-dropdown">
                            <i className="fas fa-plug"></i> <span>Modules</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li><Link className="nav-link" to="modules-calendar.html">Calendar</Link></li>
                            <li><Link className="nav-link" to="modules-chartjs.html">ChartJS</Link></li>
                            <li><Link className="nav-link" to="modules-datatables.html">DataTables</Link></li>
                            <li><Link className="nav-link" to="modules-flag.html">Flag</Link></li>
                            <li><Link className="nav-link" to="modules-font-awesome.html">Font Awesome</Link></li>
                            <li><Link className="nav-link" to="modules-ion-icons.html">Ion Icons</Link></li>
                            <li><Link className="nav-link" to="modules-owl-carousel.html">Owl Carousel</Link></li>
                            <li><Link className="nav-link" to="modules-sparkline.html">Sparkline</Link></li>
                            <li><Link className="nav-link" to="modules-sweetalert.html">Sweet Alert</Link></li>
                            <li><Link className="nav-link" to="modules-toastr.html">Toastr</Link></li>
                            <li><Link className="nav-link" to="modules-vector-maps.html">Vector Maps</Link></li>
                            <li><Link className="nav-link" to="modules-weather-icon.html">Weather Icon</Link></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a href="#" className="nav-link has-dropdown">
                            <i className="fas fa-cogs"></i> <span>Settings</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li><Link className="nav-link" to="settings-activity.html">Activity</Link></li>
                            <li><Link className="nav-link" to="settings-general.html">General</Link></li>
                            <li><Link className="nav-link" to="settings-privacy.html">Privacy</Link></li>
                        </ul>
                    </li>
                </ul>
            </aside>
        </div>
    );
}

export default Sidebar;
