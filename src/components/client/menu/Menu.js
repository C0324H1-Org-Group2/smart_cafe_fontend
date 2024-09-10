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
    const itemsPerPage = 8;

    useEffect(() => {
        allMenuItems();
    }, []);

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
        const existingItem = cartItems.find(item => item.serviceId === service.serviceId);
        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.serviceId === service.serviceId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            const newItem = { ...service, quantity: 1, status: false };
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
                />
            </Container>
        </section>
    );
};

export default Menu;
