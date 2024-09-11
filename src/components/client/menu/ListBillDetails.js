import React, {useEffect, useState} from "react";
import { Col, Row, Table ,Button} from 'react-bootstrap';
import BillDetail from "./BillDetail";
import * as serviceService from "../services/ServiceService";

const ListBillDetails = ({ cartItems, handleStatusChange,handleDeleteCartItems , handleSentBillDetail , tableInfo}) => {

    const [items, setItems] = useState(cartItems);

    useEffect(() => {
        setItems(cartItems);
    }, [cartItems]);

    const handleDelete = () => {
        if (cartItems.length === 0) {
            console.log("Please choose a service!");
            return;
        }

        // Lọc các mục có thể xóa (status = true và isOrder = false)
        const deletableItems = items.filter(item => item.status && !item.isOrder);

        // Nếu không có mục nào có thể xóa
        if (deletableItems.length === 0) {
            console.log("No items can be deleted because they are either already ordered or have status false");
            return;
        }

        // Cập nhật giỏ hàng, giữ lại những mục không thể xóa
        let updatedItems = items.filter(item => !item.status || item.isOrder)
        updatedItems = updatedItems.filter(item => ({...item, status: false}));
        setItems(updatedItems);
        handleDeleteCartItems(updatedItems);
    };

    const handleOrder = async () => {

        const orderItems = items.filter(item => item.status && !item.isOrder);
        if (orderItems.length === 0) {
            console.log("No items selected for ordering.");
            return;
        }

        const updatedOrderItems = orderItems.map(orderItem => ({...orderItem, isOrder: true}));

        try {
            await serviceService.orderItems(updatedOrderItems);

            const updatedItems = items.map(item => {
                if (orderItems.some(orderItem => orderItem.service.serviceId === item.service.serviceId)) {
                    return { ...item, isOrder: true ,status: false};
                }
                return item;
            });

            setItems(updatedItems);
            handleSentBillDetail(updatedItems);

            console.log(updatedOrderItems);
            console.log("Order placed successfully!");
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };



    const btnAction = [
        {
            text: "Xóa",
            handleAction: () => handleDelete(),
            variant: "danger" // Màu đỏ để cảnh báo
        },
        {
            text: "Gọi món",
            handleAction: () => handleOrder(),
            variant: "primary" // Màu xanh dương chính
        },
        {
            text: "Thanh toán",
            handleAction: () => console.log("Thanh toán"),
            variant: "success" // Màu xanh lá cây để biểu thị thành công
        },
        {
            text: "Gọi phục vụ",
            handleAction: () => console.log("Gọi phục vụ"),
            variant: "info" // Màu xanh dương nhạt cho thông tin
        },
        {
            text: "Phản hồi",
            handleAction: () => console.log("Phản hồi"),
            variant: "secondary" // Màu xám cho hành động phụ
        }
    ];

    return (
        <Row className="mt-4">
            <Col md={2}></Col>
            <Col md={10} className="text-center mb-4">
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
                            handleStatusChange={handleStatusChange}/>
                    ))}
                </Table>
                {btnAction.map(btn => (
                    <Button onClick={btn.handleAction} variant={btn.variant ? btn.variant : 'default'}>{btn.text}</Button>
                ))}
                <p>Số bàn: {tableInfo ? tableInfo.code : 'N/A'}</p>
                <p>Ngày: {new Date().toLocaleDateString()}</p>

            </Col>
        </Row>
    );
};

export default ListBillDetails;
