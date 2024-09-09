import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const getAllServices = async (page) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/services/all-services?page=${page}&size=10`);
        return response.data;
    } catch (e) {
        console.error('Lỗi lấy tất cả :', e);
        return [];
    }
}

const TableService = () => {
    const [allServices, setAllServices] = useState([]);
    const [services, setServices] = useState([]);
    const [page, setPage] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllServices(page);
            setAllServices(data);
        };

        fetchData();
    }, [page]);

    useEffect(() => {
        // Calculate start and end index
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Get services for current page
        const servicesForCurrentPage = allServices.slice(startIndex, endIndex);

        setServices(servicesForCurrentPage);
    }, [page, allServices]);

    return (
        <>
            <div className="main-content">
                <div className="section-body">
                    <h2 className="section-title">Table</h2>
                    <p className="section-lead">Example of some Bootstrap table components.</p>
                    <div className="card-header">
                        <h4>Full Width</h4>
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
                                    <tr key={service.id}>
                                        <td>{page * itemsPerPage + index + 1}</td>
                                        <td>{service.serviceName}</td>
                                        <td>{service.price.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        })}</td>
                                        <td>
                                            <div className="badge badge-success">
                                                {service.status}
                                            </div>
                                        </td>
                                        <td><Link to="#" className="btn btn-secondary">Detail</Link></td>
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
                                <li className="page-item">
                                    <Link className="page-link" to="#" onClick={() => setPage(page + 1)}><i
                                        className="fas fa-chevron-right"></i></Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TableService;