import React, {useEffect, useState} from "react";
import { Col, Row, Table, Button } from 'react-bootstrap';
import BillDetail from "./BillDetail";
import TableSelectionModal from './TableSelectionModal'; // Import modal component
import * as serviceService from "../services/ServiceService";
import { toast } from "react-toastify";

const ListBillDetails = ({ cartItems, handleStatusChange, handleDeleteCartItems, handleSentBillDetail, tableInfo, allTables, onUpdateTableInfo  }) => {
    const [items, setItems] = useState(cartItems);
    const [showTableModal, setShowTableModal] = useState(false); // State để điều khiển modal
    const [selectedTable, setSelectedTable] = useState(tableInfo);
    const [currentBill, setCurrentBill] = useState(null);

    useEffect(() => {
        setItems(cartItems);
    }, [cartItems]);

    console.log(items);
    const handleDelete = () => {
        if (cartItems.length === 0) {
            toast.error("Please choose a service!")
            return;
        }

        const deletableItems = items.filter(item => item.status && !item.isOrder);

        if (deletableItems.length === 0) {
            toast.error("No items can be deleted");
            return;
        }

        let updatedItems = items.filter(item => !item.status || item.isOrder)
        updatedItems = updatedItems.filter(item => ({ ...item, status: false }));
        setItems(updatedItems);
        handleDeleteCartItems(updatedItems);
    };

    const handleOrder = async () => {
        const orderItems = items.filter(item => item.status && !item.isOrder);

        if (orderItems.length === 0) {
            toast.error("No items selected for ordering.");
            return;
        }

        try {
            let bill = currentBill;

            if (!selectedTable.bill) {
                // Nếu chưa có bill, tạo bill mới
                bill = await serviceService.updateTableStatusAndCreateBill(selectedTable.tableId);
                setSelectedTable(bill.table);
                setCurrentBill(bill); // Cập nhật vào state, sẽ được render ở lần sau
            }

            // Cập nhật các mặt hàng vào bill hiện tại
            const updatedOrderItems = orderItems.map(orderItem => ({
                ...orderItem,
                order: true,
                bill: bill,
                status: false
            }));

            await serviceService.orderItems(updatedOrderItems);

            const updatedItems = items.map(item => {
                if (orderItems.some(orderItem => orderItem.service.serviceId === item.service.serviceId)) {
                    return { ...item, isOrder: true, status: false, bill: bill };
                }
                return item;
            });

            setItems(updatedItems);
            handleSentBillDetail(updatedItems);

            // Gọi lại API để lấy danh sách các bàn mới cập nhật
            const updatedTables = await serviceService.getAllTables();
            onUpdateTableInfo(updatedTables.find(table => table.tableId === selectedTable.tableId)); // Cập nhật thông tin bàn hiện tại

            toast.success("Order placed successfully.");
        } catch (error) {
            toast.error("Error placing order.");
        }
    };


    const handlePay = async () => {
        const orderItems = items.filter(item => item.isOrder);

        if (orderItems.length === 0) {
            toast.error("No items selected for payment.");
            return;
        }

        // Xóa tất cả các sản phẩm đã đặt khỏi danh sách hóa đơn
        const updatedItems = items.filter(item => !orderItems.some(orderItem => orderItem.service.serviceId === item.service.serviceId));
        setItems(updatedItems);
        handleSentBillDetail(updatedItems);

        try {
            // Cập nhật trạng thái bàn trên server
            await serviceService.updateTableStatus(selectedTable.tableId);
            
            const updatedTables = await serviceService.getAllTables();
            onUpdateTableInfo(updatedTables.find(table => table.tableId === selectedTable.tableId));

            toast.success("Payment processed successfully.");
        } catch (error) {
            toast.error("Error processing payment.");
        }
    }

    const handleSelectTable = (table) => {
        setSelectedTable(table);
        setShowTableModal(false);
        onUpdateTableInfo(table);
        // Cập nhật tất cả các món ăn trong giỏ hàng với tableId mới
        const updatedItems = items.map(item => ({
            ...item,
            tableId: table.tableId
        }));
        setItems(updatedItems);
        handleSentBillDetail(updatedItems);
    };


    const btnAction = [
        { text: "Xóa", handleAction: () => handleDelete(), variant: "danger" },
        { text: "Gọi món", handleAction: () => handleOrder(), variant: "primary" },
        { text: "Thanh toán", handleAction: () => handlePay(), variant: "success" },
        { text: "Phản hồi", handleAction: () => console.log("Phản hồi"), variant: "secondary" },
    ];

    return (
        <>
            <Row className="mt-4">
                <Col md={2}></Col>
                <Col md={10} className="text-center mb-4">
                    <div className="d-flex flex-column align-items-start mb-3" style={{ width: '400px', margin: '0 auto' }}>
                        <div className="d-flex justify-content-start align-items-center mb-3" style={{ width: '100%' }}>
                            <Button onClick={() => setShowTableModal(true)} variant="info" className="btn-lg rounded-pill ms-3">Chọn bàn</Button>
                            <Button onClick={() => console.log("Gọi phục vụ")} variant="info" className="btn-lg rounded-pill ms-3">Gọi phục vụ</Button>
                            <span><strong>Bàn của bạn :</strong> {selectedTable ? selectedTable.code : 'N/A'}</span>
                        </div>
                    </div>
                    <Table bordered className="text-center table-custom">
                        <thead>
                        <tr>
                            <th></th>
                            <th>STT</th>
                            <th>Tên món</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Thành tiền</th>
                            <th>Thời gian chờ</th>
                            <th>Trạng thái</th>
                        </tr>
                        </thead>
                        {cartItems.map((item, index) => (
                            <BillDetail
                                key={index || item.serviceId}
                                index={index}
                                item={item}
                                handleStatusChange={handleStatusChange} />
                        ))}
                    </Table>

                    <div className="d-flex justify-content-center mb-3">
                        {btnAction.map(btn => (
                            <Button className="btn-lg rounded-pill" onClick={btn.handleAction}
                                    variant={btn.variant ? btn.variant : 'default'}>{btn.text}</Button>
                        ))}
                    </div>
                </Col>
            </Row>

            <TableSelectionModal
                show={showTableModal}
                onHide={() => setShowTableModal(false)}
                tables={allTables}
                onSelectTable={handleSelectTable}
            />
        </>
    );
};

export default ListBillDetails;
