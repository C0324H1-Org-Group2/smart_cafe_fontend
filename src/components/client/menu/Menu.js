import React, { useEffect, useState } from 'react';
import * as serviceService from "../services/ServiceService";
import { Container, Row, Col } from 'react-bootstrap';
import ListBillDetails from './ListBillDetails';
import ServiceTypes from './ServiceTypes';
import ListServiceByType from './ListServiceByType';
import './Menu.css';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [services, setServices] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [tableInfo, setTableInfo] = useState(null);
    const [billInfo, setBillInfo] = useState(null);
    const itemsPerPage = 8;

    useEffect(() => {
        createTableAndBill()
    }, []);

    const createTableAndBill = async () => {
        try {
            const table = await serviceService.getRandomAvailableTable();
            if (table) {
                const bill = await serviceService.updateTableStatusAndCreateBill(table.tableId);
                console.log("Created bill:", bill);
                setTableInfo(table);
                setBillInfo(bill);
                allMenuItems();
            }
        } catch (error) {
            console.error('Error creating table and bill:', error);
        }
    };

    const allMenuItems = async () => {
        const data = await serviceService.getMenuItems();
        setMenuItems(data);

        if (data.length > 0) {
            const firstTypeId = data[0].typeId;
            handleButtonClick(firstTypeId);
        }
    };

    const handleButtonClick = async (typeId) => {
        const response = await serviceService.getServicesByType(typeId);
        setServices(response);
        setSelectedType(typeId);
        setCurrentPage(1);
    };

    const handleAddToCart = (service) => {
        const existingItem = cartItems.find(item => item.service.serviceId === service.serviceId);

        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.service.serviceId === service.serviceId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            const newItem = {
                service: { ...service },
                isOrder: false,
                bill: billInfo ? { ...billInfo } : null, // Lưu toàn bộ đối tượng billInfo
                quantity: 1,
                tableId: tableInfo?.tableId ?? null
            };
            setCartItems([...cartItems, newItem]);
        }
    };

    const handleStatusChange = (index) => {
        const updatedItems = [...cartItems];
        updatedItems[index] = { ...updatedItems[index], status: !updatedItems[index].status };
        setCartItems(updatedItems);
    };

    const handleDeleteCartItems = (updatedItems) => {
        setCartItems(updatedItems);
    };

    const handleSentBillDetail = (updatedItems) => {
        setCartItems(updatedItems);
    }

    return (
        <section className="ftco-section">
            <Container>
                <Row className="mt-4">
                    <ServiceTypes
                        menuItems={menuItems}
                        selectedType={selectedType}
                        handleButtonClick={handleButtonClick}
                    />
                    <ListServiceByType
                        services={services}
                        handleAddToCart={handleAddToCart}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        isTransitioning={isTransitioning}
                        setIsTransitioning={setIsTransitioning}
                        itemsPerPage={itemsPerPage}
                        cartItems={cartItems}
                        handleStatusChange={handleStatusChange}
                    />
                </Row>
                <ListBillDetails
                    cartItems={cartItems}
                    handleStatusChange={handleStatusChange}
                    handleDeleteCartItems={handleDeleteCartItems}
                    handleSentBillDetail={handleSentBillDetail}
                    tableInfo={tableInfo}
                />
            </Container>
        </section>
    );
};

export default Menu;
