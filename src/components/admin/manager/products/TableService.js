import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../ManagerOrder.css';
import ServiceDetailModal from "./ServiceDetailModal";
import {deleteService, getAllServicesIdDesc, getAllServicesIdDescNotDeleted} from "../../service/ServiceService";

const TableService = () => {


    const [allServices, setAllServices] = useState([]);
    const [services, setServices] = useState([]);
    const [page, setPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const itemsPerPage = 10;
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const totalPages = Math.ceil(allServices.length / itemsPerPage);
    const isLastPage = page >= totalPages - 1;
    const [showDeleted, setShowDeleted] = useState(true);





    useEffect(() => {
        const fetchData = async () => {
            let data;
            if (showDeleted) {
                data = await getAllServicesIdDesc(page);
            } else {
                data = await getAllServicesIdDescNotDeleted(page);
            }
            setAllServices(data);
        };

        fetchData();
    }, [page,showDeleted]);

    useEffect(() => {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const servicesForCurrentPage = allServices.slice(startIndex, endIndex);
        setServices(servicesForCurrentPage);
    }, [page, allServices]);

    const handleShowModal = (service) => {
        setSelectedService(service);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedService(null);
        setShowModal(false);
    };

    const handleSearch = () => {
        const filteredServices = allServices.filter(service =>
            service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setServices(filteredServices);
    };
    const handleCreateClick = () => {
        navigate('/admin/service/add'); // Điều hướng đến trang tạo bàn
    };


    return (
    <>
        <div className="main-content">
            <div className="section-body">
                <h2 className="section-title">Service List</h2>
                <div className="card-body">
                    <div className="mb-3">
                        <button className="btn btn-primary" onClick={handleCreateClick}>+ Create Product</button>
                        <button className={`btn ${showDeleted ? 'btn-secondary' : 'btn-success'} float-right`}
                                onClick={() => {
                                    setShowDeleted(!showDeleted);
                                }}>
                            {showDeleted ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <div>

                    </div>

                    <div className="row">
                        <div className="col-md-2">
                        <input
                                type="text"
                                className="form-control"
                                placeholder="Search by service name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                        </div>

                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-striped table-md">
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {services.map((service, index) => (
                                <tr key={service.serviceId}>
                                    <td>{page * itemsPerPage + index + 1}</td>
                                    <td>{service.serviceName}</td>
                                    <td>{service.price.toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    })}</td>
                                    <td>
                                        <div
                                            className={`badge ${service.is_delete === 'true' ? 'badge-secondary' : 'badge-success'}`}>
                                            {service.is_delete === 'true' ? 'Hide' : 'Showed'}
                                        </div>
                                    </td>
                                    <td>
                                        <button className="btn btn-secondary"
                                                onClick={() => handleShowModal(service)}>Detail
                                        </button>
                                        <Link to={`/admin/service/update/${service.serviceId}`}
                                              className="btn btn-primary">
                                            Update
                                        </Link>
                                        <button className="btn btn-danger"
                                                onClick={() => deleteService(service.serviceId)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card-footer text-right">
                    <nav className="d-inline-block">
                        <ul className="pagination mb-0">
                            <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
                                <Link className="page-link" to="#" onClick={() => setPage(page - 1)}
                                      tabIndex="-1"><i className="fas fa-chevron-left"></i></Link>
                            </li>
                            <li className="page-item active"><Link className="page-link" to="#">{page + 1} <span
                                className="sr-only">(current)</span></Link></li>
                            <li className={`page-item ${isLastPage ? 'disabled' : ''}`}>
                                <Link className="page-link" to="#" onClick={() => !isLastPage && setPage(page + 1)}><i
                                    className="fas fa-chevron-right"></i></Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>

        <ServiceDetailModal
            show={showModal}
            handleClose={handleCloseModal}
            serviceDetails={selectedService}
        />
    </>
    );
};

export default TableService;