import React from 'react';
import { Link } from 'react-router-dom';

const TableService = () => {
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
                                <th>#</th>
                                <th>Name</th>
                                <th>Created At</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Irwansyah Saputra</td>
                                <td>2017-01-09</td>
                                <td>
                                    <div className="badge badge-success">Active</div>
                                </td>
                                <td><Link to="#" className="btn btn-secondary">Detail</Link></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Hasan Basri</td>
                                <td>2017-01-09</td>
                                <td>
                                    <div className="badge badge-success">Active</div>
                                </td>
                                <td><Link to="#" className="btn btn-secondary">Detail</Link></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Kusnadi</td>
                                <td>2017-01-11</td>
                                <td>
                                    <div className="badge badge-danger">Not Active</div>
                                </td>
                                <td><Link to="#" className="btn btn-secondary">Detail</Link></td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Rizal Fakhri</td>
                                <td>2017-01-11</td>
                                <td>
                                    <div className="badge badge-success">Active</div>
                                </td>
                                <td><Link to="#" className="btn btn-secondary">Detail</Link></td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>Isnap Kiswandi</td>
                                <td>2017-01-17</td>
                                <td>
                                    <div className="badge badge-success">Active</div>
                                </td>
                                <td><Link to="#" className="btn btn-secondary">Detail</Link></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card-footer text-right">
                    <nav className="d-inline-block">
                        <ul className="pagination mb-0">
                            <li className="page-item disabled">
                                <Link className="page-link" to="#" tabIndex="-1"><i className="fas fa-chevron-left"></i></Link>
                            </li>
                            <li className="page-item active"><Link className="page-link" to="#">1 <span
                                className="sr-only">(current)</span></Link></li>
                            <li className="page-item">
                                <Link className="page-link" to="#">2</Link>
                            </li>
                            <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                            <li className="page-item">
                                <Link className="page-link" to="#"><i className="fas fa-chevron-right"></i></Link>
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
