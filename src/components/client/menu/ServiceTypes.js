import React from 'react';
import { Button, Col } from 'react-bootstrap';

const ServiceTypes = ({ menuItems, selectedType, handleButtonClick }) => {
    return (
        <Col md={2}>
            <div className="list-group">
                {menuItems.map((item) => (
                    <Button
                        key={item.typeId}
                        variant={item.typeId === selectedType ? 'primary' : 'light'}
                        className="list-group-item w-100 text-start"
                        onClick={() => handleButtonClick(item.typeId)}
                    >
                        {item.typeName}
                    </Button>
                ))}
            </div>
        </Col>
    );
};

export default ServiceTypes;
