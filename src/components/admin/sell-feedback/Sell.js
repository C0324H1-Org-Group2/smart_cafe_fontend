import React, {useEffect, useState, useRef} from "react";
import {Link} from "react-router-dom";
import * as sellService from "../service/SellService";
import {useReactToPrint} from "react-to-print";
import {toast} from "react-toastify";

function Sell() {
    const [tables, setTables] = useState([])
    const [bills, setBills] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [itemsPerPage] = useState(6); // Số lượng ban trên mỗi trang
    const componentPDF = useRef();
    const [selectedTableId, setSelectedTableId] = useState(null);
    const [selectedIsPay, setSelectedIsPay] = useState(false)
    const [loading, setLoading] = useState(false);

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

    const getBillByTableId = async (tableId, isPay) => {
        try {
            setLoading(true); // Bắt đầu hiển thị loading
            setSelectedIsPay(isPay);
            setSelectedTableId(tableId);

            // Hàm giả lập chờ trong một khoảng thời gian (ở đây là 500ms)
            const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

            // Bắt đầu tải dữ liệu hóa đơn và chờ ít nhất 500ms
            const billsPromise = sellService.getBillByTableId(tableId);
            const bills = await billsPromise;

            // Chờ thêm 500ms để đảm bảo spinner hiển thị
            await delay(500);

            // Sau khi cả dữ liệu và delay hoàn tất
            setBills(bills);
        } catch (e) {
            console.error("Lỗi danh sách hóa đơn", e);
        } finally {
            setLoading(false); // Ẩn loading khi hoàn tất
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


    const checkBillBeforPay = () => {
        if (selectedIsPay === true && bills.length > 0) {
            generatePDF();
        } else {
            toast.warning("Không tìm thấy bill hoặc chưa có yêu cầu tính tiền ");
        }
    }

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Chi tiết hóa đơn",
        onAfterPrint: async () => {
            await changeStatusBillByTableId(selectedTableId);
            await getBillByTableId(selectedTableId, false);
            await getAllTables();
        }

    });


    const changeStatusBillByTableId = async (tableId) => {
        try {
            let isSuccess = await sellService.changeStatusBillByTableId(tableId);
            if (isSuccess) {
                toast.success("Tính tiền thành công");
            } else {
                toast.error("Tính tiền thất bại");
            }
        } catch (e) {
            console.error("Lỗi khi cập nhật trạng thái hóa đơn", e);
        }
    };

    const setStatusEmployee = async (tableId)=> {
       try {
           await sellService.setStatusEmployee(tableId);
           await getAllTables();
       } catch (e){
           console.log("loi set status employee")
       }
    }

    const setStatusOrder = async (tableId) => {
        try {
            await sellService.setStatusOrder(tableId);
            await getAllTables();

        }catch (e){
            console.log("loi set status isBill")
        }
    }

    return (
        <div className="main-content my-4">
            <div className="section-body mb-5">
                <h2 className="section-title">Bán hàng</h2>
            </div>

            <div className="row">
                {/* Khu vực bàn */}
                <div className="col-md-6">
                    <div className="row g-4">
                        {currentTables.map((table) => (

                            <div className={`col-4 ${selectedTableId === table.tableId ? "selected-table" : ""}`}
                                 key={table.tableId}>
                                <div className={ table.on === false ? "table-card" : "table-card-grey"} style={{marginBottom: '20px'}}
                                     onClick={() => getBillByTableId(table.tableId, table.bill)}>
                                    {table.code}
                                </div>

                                <button className={ table.pay === true ? " button-def btn-red" :"button-def"}
                                        onClick={() => getBillByTableId(table.tableId, table.pay)}>Pay</button>

                                <button className={ table.bill === true ? " button-def btn-yellow" :"button-def"}
                                        onClick={() => {
                                            getBillByTableId(table.tableId, table.pay);
                                            setStatusOrder(table.tableId);
                                        }}>Order</button>

                                <button className={ table.callEmployee === true ? " button-def btn-green" :"button-def"}
                                        onClick={()=> setStatusEmployee(table.tableId)}>Employee</button>
                            </div>


                        ))}
                    </div>
                </div>


                {/* Bảng thông tin hóa đơn */}
                <div ref={componentPDF} style={{width: '100%'}} className="col-md-6">
                    <table className="table table-striped">
                        <thead className="table-active">
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
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Đang tải hóa đơn...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            <>
                                {bills.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center">Bàn này chưa có bill</td>
                                    </tr>
                                ) : (
                                    bills.map((bill, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{bill.name}</td>
                                            <td>{bill.quantity}</td>
                                            <td>{formatCurrency(bill.price)}</td>
                                            <td>{bill.tableCode}</td>
                                            <td>{formatCurrency(bill.price * bill.quantity)}</td>
                                        </tr>
                                    ))
                                )}
                            </>
                        )}

                        <tr>
                            <td colSpan="5" className="text-right">Tổng tiền</td>
                            <td>{formatCurrency(calculateTotal())}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                {/* Nút tính tiền và làm mới */}
                <div className="d-flex justify-content-end me-3 mb-5 ">
                    <button className="btn btn-primary" onClick={checkBillBeforPay}>Tính tiền</button>
                    <button className="btn btn-secondary"
                            onClick={() => getBillByTableId(selectedTableId, selectedIsPay)}>Làm mới bảng
                    </button>
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
