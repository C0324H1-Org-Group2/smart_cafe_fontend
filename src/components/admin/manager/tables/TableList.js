import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'; // Import useNavigate
import { getAllTables } from '../../service/tableService'; // Đường dẫn đến file chứa phương thức getAllTables

const TableList = () => {
    const [tables, setTables] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Khởi tạo useNavigate

    useEffect(() => {
        const fetchTables = async () => {
            try {
                setLoading(true);
                const data = await getAllTables(page);
                setTables(data.content); // Assuming `data.content` contains the table data
                setTotalPages(data.totalPages); // Assuming `data.totalPages` contains the total number of pages
            } catch (error) {
                console.error('Lỗi khi lấy danh sách bảng:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTables();
    }, [page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleCreateClick = () => {
        navigate('/admin/tables/create'); // Điều hướng đến trang tạo bàn
    };

    return (
        <div className="main-content">
            <div className="section-body">
                <h2 className="section-title">Table List</h2>
                <div className="card-header">
                    <button className="btn btn-primary" onClick={handleCreateClick}>Create Table</button> {/* Nút tạo bàn */}
                </div>
                <div className="card-body">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped table-md">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Code</th>
                                    <th>State</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tables.length > 0 ? (
                                    tables.map((table, index) => (
                                        <tr key={table.tableId}>
                                            <td>{index + 1 + page * 10}</td>
                                            <td>{table.code}</td>
                                            <td>{table.state}</td>
                                            <td>{table.isOn ? 'On' : 'Off'}</td>
                                            <td>
                                                <Link to={`/admin/tables/edit/${table.tableId}`}
                                                      className="btn btn-secondary">
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No tables found</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                <div className="card-footer text-right">
                    <nav className="d-inline-block">
                        <ul className="pagination mb-0">
                            <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(page - 1)}
                                        disabled={page === 0}>
                                    <i className="fas fa-chevron-left"></i>
                                </button>
                            </li>
                            {[...Array(totalPages).keys()].map((pageIndex) => (
                                <li key={pageIndex} className={`page-item ${pageIndex === page ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(pageIndex)}>
                                        {pageIndex + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${page === totalPages - 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(page + 1)}
                                        disabled={page === totalPages - 1}>
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default TableList;
