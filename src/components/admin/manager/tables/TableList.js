import React, { useEffect, useState } from "react";
import { deleteTable, getAllTables } from "../../service/tableService";
import './TableList.css';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function TableList() {
    const [tables, setTables] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [codeSearch, setCodeSearch] = useState('');
    const [isAscending, setIsAscending] = useState(true);
    const [includeDeleted, setIncludeDeleted] = useState(false);


    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await getAllTables(codeSearch, page, 10, includeDeleted);
                if (response && response.content) {
                    setTables(response.content);
                    setTotalPages(response.totalPages);
                } else {
                    setTables([]);
                }
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
                toast.error('Không thể tải dữ liệu bàn.');
            }
        };
        fetchTables();
    }, [codeSearch, page, includeDeleted]);

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
        if (window.confirm(`Bạn có chắc chắn muốn xóa bảng với mã ${table.code}?`)) {
            try {
                await deleteTable(table.tableId, type);
                toast.success(type === 'hard' ? 'Xóa cứng bảng thành công!' : 'Xóa mềm bảng thành công!');

                // Tải lại dữ liệu để đảm bảo tính chính xác
                const newPage = Math.max(page, 0); // Đảm bảo trang không âm
                const response = await getAllTables(codeSearch, newPage, 10, includeDeleted);
                if (response && response.content) {
                    setTables(response.content);
                    setTotalPages(response.totalPages);

                    // Cập nhật trang nếu cần thiết
                    const updatedTablesCount = response.content.length;
                    const currentPageItems = updatedTablesCount % 10;
                    if (currentPageItems === 0 && page > 0) {
                        setPage(page - 1);
                    }
                } else {
                    setTables([]);
                }
            } catch (error) {
                console.error('Lỗi khi xóa bảng:', error);
                toast.error('Xóa bảng thất bại.');
            }
        }
    };

    return (
        <>
            <div className="main-content">
                <div className="section-body">
                    <h2 className="section-title">Table List</h2>
                    <div className="card-header">
                        <Link to="/admin/tables/create" className="btn btn-success">
                            <i className="fas fa-plus"></i> Create Table
                        </Link>
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
                            <div className="col-md-4 d-flex align-items-end">
                                <button className="btn btn-success" onClick={() => setIncludeDeleted(!includeDeleted)}>
                                    {includeDeleted ? 'Hide Deleted' : 'Show Deleted'}
                                </button>
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
                                            <td>
                                                <Link to={`/admin/tables/edit/${table.tableId}`}
                                                      className="btn btn-primary ml-2" title="Edit">
                                                    <i className="fas fa-edit"></i>
                                                </Link>
                                                <button className="btn btn-warning ml-2"
                                                        onClick={() => handleDeleteClick(table, 'soft')}
                                                        title="Soft Delete">
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                                <button className="btn btn-danger ml-2"
                                                        onClick={() => handleDeleteClick(table, 'hard')}
                                                        title="Hard Delete">
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">No Tables Found</td>
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
                </div>
            </div>
        </>
    );
}

export default TableList;
