import React, {useEffect, useState, useRef} from "react";
import * as sellService from "../service/SellService";
import {useReactToPrint} from "react-to-print";
import {toast} from "react-toastify";
import SellNotification from "./SellNotification";
import SockJS from "sockjs-client";
import {Client} from "@stomp/stompjs";

function Sell() {
    const [tables, setTables] = useState([])
    const [bills, setBills] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [itemsPerPage] = useState(6); // Số lượng ban trên mỗi trang
    const componentPDF = useRef();
    const [selectedTableId, setSelectedTableId] = useState(null);
    const [selectedIsPay, setSelectedIsPay] = useState(false)
    const [loading, setLoading] = useState(false);
    const [table,setTable]=useState([])
    const nameEmployee = localStorage.getItem("employeeName");


    useEffect(() => {
        getAllTables();
    }, [table]);


    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onStompError: (error) => {
                console.error('STOMP error', error);
            },
            onWebSocketClose: () => {
                console.error('WebSocket connection closed');
            }
        });

        stompClient.onConnect = () => {
            console.log('Connected to WebSocket');

            stompClient.subscribe('/topic/admin/sell/order', (message) => {
                const updatedTables = JSON.parse(message.body);
                setTable(updatedTables);
            });

            stompClient.subscribe('/topic/admin/sell/pay', (message) => {
                const updatedTables = JSON.parse(message.body);
                setTable(updatedTables);
            });

            stompClient.subscribe('/topic/admin/sell/callEmployee', (message) => {
                const updatedTables = JSON.parse(message.body);
                setTable(updatedTables);
            });
        };

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
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
            const billsPromise = await sellService.getBillByTableId(tableId);
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
        <div className="main-content">
            <div className="section-body">
                <div className="container my-4">
                    <div className="mb-5">
                        <h2 className="section-title">Bán hàng</h2>
                        <SellNotification/>
                    </div>

                    <div className="row">
                        {/* Khu vực bàn */}
                        <div className="col-md-6">
                            <div className="row g-4">
                                {currentTables.map((table) => (
                                    <div className="col-4" key={table.tableId}>
                                        {/* Thêm hiệu ứng hover */}
                                        <div
                                            className={`card p-3 ${selectedTableId === table.tableId ? "border border-primary" : ""} ${table.on === true ? "bg-secondary" : "bg-light"}`}
                                            onClick={() => getBillByTableId(table.tableId, table.pay)}
                                            style={{cursor: 'pointer', transition: 'background-color 0.3s'}}
                                        >

                                            <div
                                                className={`card-body text-center ${table.on === false ? "" : "bg-secondary"}`}
                                                style={{transition: 'background-color 0.3s'}}
                                            >
                                                {table.code}
                                            </div>

                                            {/* Pay, Order, Employee buttons */}
                                            <div className="d-grid gap-2 mt-2">
                                                <button className={`btn ${table.pay ? "btn-danger" : "btn-primary"}`}>
                                                    <i className="fas fa-money-bill-wave"></i> Pay
                                                </button>

                                                <button className={`btn ${table.bill ? "btn-warning" : "btn-primary"}`}
                                                        onClick={() => setStatusOrder(table.tableId)}>
                                                    <i className="fas fa-utensils"></i> Order
                                                </button>

                                                <button
                                                    className={`btn ${table.callEmployee ? "btn-success" : "btn-primary"}`}
                                                    onClick={() => setStatusEmployee(table.tableId)}>
                                                    <i className="fas fa-bell"></i> Employee
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bảng thông tin hóa đơn */}
                        <div className="col-md-6" ref={componentPDF}>
                            <table className="table table-striped"  style={{width: '100%'}}>
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
                                                <span className="visually-hidden">Đang tải hóa đơn...</span>
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
                                    <td colSpan="5" className="text-end">Tổng tiền</td>
                                    <td>{formatCurrency(calculateTotal())}</td>
                                </tr>
                                </tbody>
                            </table>

                            {/* Chữ "Thu ngân" căn phải */}
                            <div className="w-100 text-end mt-2" style={{fontSize: '0.875rem'}}>
                                Thu ngân: {nameEmployee}
                            </div>

                            {/* Nút tính tiền và làm mới */}
                            <div className="d-flex justify-content-end mt-3">
                                <button className="btn btn-primary me-2" onClick={checkBillBeforPay}>Tính tiền</button>
                                <button className="btn btn-secondary"
                                        onClick={() => getBillByTableId(selectedTableId, selectedIsPay)}>Làm mới bảng
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Phân trang */}
                    <div className="text-end mt-4">
                        <nav>
                            <ul className="pagination mb-0">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                        <i className="fas fa-chevron-left"></i>
                                    </button>
                                </li>
                                {[...Array(totalPages)].map((_, pageIndex) => (
                                    <li key={pageIndex + 1}
                                        className={`page-item ${currentPage === pageIndex + 1 ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(pageIndex + 1)}>
                                            {pageIndex + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                        <i className="fas fa-chevron-right"></i>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default Sell;
