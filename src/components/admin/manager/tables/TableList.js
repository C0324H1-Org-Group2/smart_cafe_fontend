import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllTables, getTableById } from '../../service/tableService';

const TableList = () => {
    const [tables, setTables] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchId, setSearchId] = useState('');
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTables = async () => {
            try {
                setLoading(true);
                setError(''); // Reset error message
                if (searching) {
                    if (searchId.trim() === '') {
                        setError('Please enter a keyword!');
                        setSearching(false);
                        return;
                    }
                    const data = await getTableById(searchId);
                    setTables(data ? [data] : []);
                    setTotalPages(data ? 1 : 0); // Only one page of results for search
                } else {
                    const data = await getAllTables(page);
                    setTables(data.content);
                    setTotalPages(data.totalPages);
                }
            } catch (error) {
                console.error('Error fetching tables:', error);
                setError('Error fetching data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchTables();
    }, [page, searching, searchId]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchId.trim() === '') {
            setError('Please enter a keyword!');
            return;
        }
        setSearching(true);
        setPage(0); // Reset to first page on new search
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        setSearching(false); // Reset searching state when changing page
    };

    const handleSearchIdChange = (e) => {
        setSearchId(e.target.value);
    };

    const handleCreateClick = () => {
        navigate('/admin/tables/create');
    };

    return (
        <div className="main-content">
            <div className="section-body">
                <h2 className="section-title">Table List</h2>
                <div className="card-header">
                    <button className="btn btn-primary" onClick={handleCreateClick}>Create Table</button>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSearch} className="mb-4">
                        <div className="form-row align-items-center">
                            <div className="col-auto">
                                <label htmlFor="searchId" className="sr-only">Search by ID</label>
                                <input
                                    type="text"
                                    id="searchId"
                                    className="form-control"
                                    value={searchId}
                                    onChange={handleSearchIdChange}
                                    placeholder="Enter table ID"
                                />
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-primary">Search</button>
                            </div>
                        </div>
                    </form>
                    {error && <p className="text-danger">{error}</p>} {/* Display error message */}
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
                                            <td>{table.on ? 'On' : 'Off'}</td>
                                            <td>
                                                <Link to={`/admin/tables/edit/${table.tableId}`} className="btn btn-secondary">
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            {searching ? 'Not found!' : 'No tables found'}
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                {!searching && (
                    <div className="card-footer text-right">
                        <nav className="d-inline-block">
                            <ul className="pagination mb-0">
                                <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
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
                                    <button className="page-link" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>
                                        <i className="fas fa-chevron-right"></i>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TableList;
