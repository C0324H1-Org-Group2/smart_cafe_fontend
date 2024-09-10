import React, {useEffect, useState} from "react";
import { Col, Row, Table ,Button} from 'react-bootstrap';
import BillDetail from "./BillDetail";

const ListBillDetails = ({ cartItems, handleStatusChange,handleDeleteCartItems }) => {
    console.log(cartItems)

    const [items, setItems] = useState(cartItems);

    useEffect(() => {
        setItems(cartItems);
    }, [cartItems]);

    const handleDelete = () => {
        if (cartItems.length === 0) {
            console.log("Please choose a service!");
            return;
        }

        const deletableItems = items.filter(item => item.status);

        // Nếu không có mục nào có thể xóa
        if (deletableItems.length === 0) {
            console.log("No items can be deleted because their waiting time is 00:00:00 or status is false");
            return;
        }

        // Cập nhật giỏ hàng, giữ lại những mục không thể xóa
        const updatedItems = items.filter(item => !item.status );

        setItems(updatedItems);
        handleDeleteCartItems(updatedItems);
    };


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
                    {cartItems.map((item, index ) => (
                            <BillDetail
                                key={index || item.serviceId}
                                index = {index}
                                item={item}
                                handleStatusChange={handleStatusChange}/>
                    ))}
                </Table>
                <Button onClick={handleDelete} variant="danger">Xóa</Button>
            </Col>
        </Row>
    );
};

export default ListBillDetails;
