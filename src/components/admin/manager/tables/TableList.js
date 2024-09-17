import React, { useEffect, useState } from "react";
import { deleteTable, getAllTables } from "../../service/tableService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import './TableList.css';

function TableList() {
    const [tables, setTables] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [codeSearch, setCodeSearch] = useState('');
    const [isAscending, setIsAscending] = useState(true);
    const [userRole, setUserRole] = useState('ROLE_EMPLOYEE');
    const [includeDeleted, setIncludeDeleted] = useState(false);
    const [onFilter, setOnFilter] = useState(null); // Filter for `on`

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await getAllTables(codeSearch, onFilter, page, 10, includeDeleted);
                if (response && response.content) {
                    setTables(response.content);
                    setTotalPages(response.totalPages);
                } else {
                    setTables([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Unable to load tables.');
            }
        };
        fetchTables();
    }, [codeSearch, page, includeDeleted, onFilter]);

    useEffect(() => {
        const fetchUserRole = () => {
            const authorities = JSON.parse(localStorage.getItem('authorities'));
            if (authorities) {
                const role = authorities[0].authority;
                setUserRole(role);
            }
        };

        fetchUserRole();
    }, []);

    const handleSort = () => {
        const sorted = [...tables].sort((a, b) => {
            return isAscending ? a.code.localeCompare(b.code) : b.code.localeCompare(a.code);
        });
        setTables(sorted);
        setIsAscending(!isAscending);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleDeleteClick = async (table, type) => {
        if (window.confirm(`Are you sure you want to delete table with code ${table.code}?`)) {
            try {
                await deleteTable(table.tableId, type);
                toast.success(type === 'hard' ? 'Table hard delete successful!' : 'Table soft delete successful!');

                // Reload data to ensure accuracy
                const newPage = Math.max(page, 0); // Ensure page is not negative
                const response = await getAllTables(codeSearch, onFilter, newPage, 10, includeDeleted);
                if (response && response.content) {
                    setTables(response.content);
                    setTotalPages(response.totalPages);

                    // Update page if necessary
                    const updatedTablesCount = response.content.length;
                    const currentPageItems = updatedTablesCount % 10;
                    if (currentPageItems === 0 && page > 0) {
                        setPage(page - 1);
                    }
                } else {
                    setTables([]);
                }
            } catch (error) {
                console.error('Error deleting table:', error);
                toast.error('Table deletion failed.');
            }
        }
    };

    return (
        <>
            <div className="main-content">
                <div className="section-body">
                    <h2 className="section-title">Table List</h2>
                    <div className="card-header">
                        {userRole === 'ROLE_ADMIN' && (
                            <Link to="/admin/tables/create" className="btn btn-success">
                                <i className="fas fa-plus"></i> Create Table
                            </Link>
                        )}
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by code"
                                    value={codeSearch}
                                    onChange={(e) => setCodeSearch(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4">
                                <select
                                    className="form-control"
                                    value={onFilter || ''}
                                    onChange={(e) => setOnFilter(e.target.value ? JSON.parse(e.target.value) : null)}
                                >
                                    <option value="">All Status</option>
                                    <option value="true">On</option>
                                    <option value="false">Off</option>
                                </select>
                            </div>
                            <div className="col-md-4 d-flex align-items-end">
                                {userRole === 'ROLE_ADMIN' && (
                                    <button
                                        className="btn btn-success"
                                        onClick={() => setIncludeDeleted(!includeDeleted)}
                                    >
                                        {includeDeleted ? 'Hide Deleted' : 'Show Deleted'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="card-header">
                        <h4>Tables</h4>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-striped table-md">
                                <thead>
                                <tr>
                                    <th className="table-header">#</th>
                                    <th
                                        className="table-header sortable"
                                        onClick={handleSort}
                                    >
                                        Table Code {isAscending ? '↑' : '↓'}
                                    </th>
                                    <th className="table-header">State</th>
                                    <th className="table-header">Status</th>
                                    {userRole === 'ROLE_ADMIN' && (
                                        <th className="table-header">Is Deleted</th>
                                    )}
                                    <th className="table-header">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tables && tables.length > 0 ? (
                                    tables.map((table, index) => (
                                        <tr key={table.tableId}>
                                            <td>{index + 1 + page * 10}</td>
                                            <td>{table.code}</td>
                                            <td>{table.state}</td>
                                            <td>{table.on ? 'On' : 'Off'}</td>
                                            {userRole === 'ROLE_ADMIN' && (
                                                <td>{table.delete ? 'Yes' : 'No'}</td>
                                            )}
                                            <td>
                                                {userRole === 'ROLE_ADMIN' && (
                                                    <>
                                                        <Link
                                                            to={`/admin/tables/edit/${table.tableId}`}
                                                            className="btn btn-primary ml-2"
                                                            title="Edit"
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </Link>
                                                        <button
                                                            className="btn btn-warning ml-2"
                                                            onClick={() => handleDeleteClick(table, 'soft')}
                                                            title="Soft Delete"
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-danger ml-2"
                                                            onClick={() => handleDeleteClick(table, 'hard')}
                                                            title="Hard Delete"
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </>
                                                )}
                                                {userRole === 'ROLE_EMPLOYEE' && (
                                                    <button
                                                        className="btn btn-warning ml-2"
                                                        onClick={() => handleDeleteClick(table, 'soft')}
                                                        title="Soft Delete"
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={userRole === 'ROLE_ADMIN' ? '6' : '5'} className="text-center">
                                            No Tables Found
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="card-footer text-right">
                        <nav className="d-inline-block">
                            <ul className="pagination mb-0">
                                <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(page - 1)}
                                        disabled={page === 0}
                                    >
                                        <i className="fas fa-chevron-left"></i>
                                    </button>
                                </li>
                                {[...Array(totalPages).keys()].map((pageIndex) => (
                                    <li key={pageIndex} className={`page-item ${pageIndex === page ? 'active' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(pageIndex)}
                                        >
                                            {pageIndex + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${page === totalPages - 1 ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(page + 1)}
                                        disabled={page === totalPages - 1}
                                    >
                                        <i className="fas fa-chevron-right"></i>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TableList;
