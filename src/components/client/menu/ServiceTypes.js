import React from 'react';
import { Button, Col } from 'react-bootstrap';

const ServiceTypes = ({ menuItems, selectedType, handleButtonClick, rangeValue, setRangeValue }) => {
    const handleRangeChange = (e) => {
        const value = parseInt(e.target.value); // Cập nhật giá trị range khi người dùng thay đổi
        setRangeValue(value);
    };

    return (
        <Col md={2}>
            <div className="list-group mb-4">
                <h4 className="mb-2">Categories</h4>
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

            <div className="list-group mb-4">
                <div className="mb-3">
                    <h4 className="mb-2">Price</h4>
                    <input
                        type="range"
                        className="form-range w-100"
                        id="rangeInput"
                        name="rangeInput"
                        min="0"
                        max="500000"
                        value={rangeValue}
                        onChange={handleRangeChange} // Cập nhật khi kéo thanh
                    />
                    <span id="amount" className="mt-2 d-block">
                        {rangeValue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </span>
                </div>
            </div>
        </Col>
    );
};

export default ServiceTypes;
