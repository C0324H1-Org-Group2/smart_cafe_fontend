import React, { useEffect, useState } from "react";
import * as sellService from '../client/services/SellService';
import {Link} from "react-router-dom";

function Sell() {
    const [tables, setTables] = useState([]);
    const [bills, setBills] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [itemsPerPage] = useState(4); // Số lượng phản hồi trên mỗi trang

    useEffect(() => {
        getAllTables();
    }, []);


    const getAllTables = async () => {
        try {
            let tables = await sellService.getAllTables();
            setTables(tables);
        } catch (e) {
            console.error("Lỗi danh sách bàn", e);
        }
    };

    const getBillByTableId = async (tableId) => {
        try {
            let bills = await sellService.getBillByTableId(tableId);
            setBills(bills);
        } catch (e) {
            console.error("Lỗi danh sách hóa đơn", e);
        }
    };


    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    const calculateTotal = () => {
        return bills.reduce((total, bill) => total + (bill.price * bill.quantity), 0);
    };

    // Tính toán dữ liệu phân trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTables = tables.slice(indexOfFirstItem, indexOfLastItem); // Lấy các bàn cho trang hiện tại

    const totalPages = Math.ceil(tables.length / itemsPerPage); // Tổng số trang

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div className="main-content my-4">
            <div className="section-body">
                <h2 className="section-title">Quản lý bán hàng</h2>
            </div>
            <div className="row">
                {/* Khu vực bàn */}
                <div className="col-md-6">
                    <div className="row">
                        {currentTables.map((table) => (
                            <div className="col-4" key={table.tableId} onClick={() => getBillByTableId(table.tableId)}>
                                <div className="table-card">
                                    {table.code}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bảng thông tin hóa đơn */}
                <div className="col-md-6">
                    <table className="table table-bordered menu-table">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên món</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Số bàn</th>
                            <th>Tổng tiền</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bills.map((bill, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{bill.name}</td>
                                <td>{bill.quantity}</td>
                                <td>{formatCurrency(bill.price)}</td>
                                <td>{bill.numberTable}</td>
                                <td>{formatCurrency(bill.price * bill.quantity)}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="5" className="text-right">Tổng tiền</td>
                            <td>{formatCurrency(calculateTotal())}</td>
                        </tr>
                        </tbody>
                    </table>

                    {/* Nút tính tiền và làm mới */}
                    <div className="d-flex justify-content-between mt-3">
                        <button className="btn btn-primary">Tính tiền</button>
                        <button className="btn btn-secondary" onClick={()=>getAllTables()}>Làm mới bảng</button>
                    </div>
                </div>
            </div>

            {/* Phân trang */}
            <div className="card-footer text-right">
                <nav className="d-inline-block">
                    <ul className="pagination mb-0">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <Link
                                className="page-link"
                                to="#"
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                <i className="fas fa-chevron-left"></i>
                            </Link>
                        </li>
                        {[...Array(totalPages)].map((_, pageIndex) => (
                            <li
                                key={pageIndex + 1}
                                className={`page-item ${currentPage === pageIndex + 1 ? 'active' : ''}`}
                            >
                                <Link
                                    className="page-link"
                                    to="#"
                                    onClick={() => handlePageChange(pageIndex + 1)}
                                >
                                    {pageIndex + 1}
                                </Link>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <Link
                                className="page-link"
                                to="#"
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                <i className="fas fa-chevron-right"></i>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Sell;
