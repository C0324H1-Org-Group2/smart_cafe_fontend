import React, {useEffect, useState, useRef} from "react";
import {Link} from "react-router-dom";
import * as sellService from "./service/SellService";
import {useReactToPrint} from "react-to-print";
import alert from "bootstrap/js/src/alert";
import {boolean} from "yup";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function Sell() {
    const navigate = useNavigate()
    const [tables,setTables] = useState([{
            tableId : 0,
            code : "",
            state : "",
            isOn : false,
            isDelete : false,
            isBill : false
        }])
    const [bills, setBills] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [itemsPerPage] = useState(8); // Số lượng phản hồi trên mỗi trang
    const componentPDF = useRef();
    const [selectedTableId, setSelectedTableId] = useState(null);



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
            setSelectedTableId(tableId); // Lưu lại tableId hiện tại
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

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Chi tiết hóa đơn",
        onAfterPrint: async () => {
            await changeStatusBillByTableId(selectedTableId);
            await getAllTables();
        }
    });


    const changeStatusBillByTableId = async (tableId) => {
        try {
            let isSuccess = await sellService.changeStatusBillByTableId(tableId);
            if (isSuccess) {
                toast.success("Tính tiền thành công");
                navigate("/admin/sell");
            } else {
                toast.error("Tính tiền thất bại");
            }
        } catch (e) {
            console.error("Lỗi khi cập nhật trạng thái hóa đơn", e);
        }
    };

    return (
        <div className="main-content my-4">
            <div className="section-body">
                <h2 className="section-title">Quản lý bán hàng</h2>
            </div>
            <div className="row">
                {/* Khu vực bàn */}
                <div className="col-md-4">
                    <div className="row g-4">
                        {currentTables.map((table) => (
                            <div className="col-4" key={table.tableId} onClick={() => getBillByTableId(table.tableId)}>
                                <div className={table.bill === false ? "table-card" : "table-card-red"}>
                                    {table.code}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Bảng thông tin hóa đơn */}
                <div ref={componentPDF} style={{width: '100%'}} className="col-md-8">
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
                        {bills.length === 0 ? <h3>Bàn này chưa có bill</h3> :
                            bills.map((bill, index) => (
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
                </div>
                {/* Nút tính tiền và làm mới */}
                <div className="d-flex m-md-auto">
                    <button className="btn btn-primary" onClick={generatePDF}>Tính tiền</button>
                    <button className="btn btn-secondary" onClick={() => getAllTables()}>Làm mới bảng</button>
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
