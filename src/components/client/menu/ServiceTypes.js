import React from 'react';
import { Col } from 'react-bootstrap';

const ServiceTypes = ({ menuItems, selectedType, handleButtonClick, rangeValue, setRangeValue }) => {
    const handleRangeChange = (e) => {
        const value = parseInt(e.target.value); // Cập nhật giá trị range khi người dùng thay đổi
        setRangeValue(value);
    };

    return (
        <Col md={2}>
            <div className="list-group mb-4">
                <h2 className="mb-2">Categories</h2>
                {menuItems.map((item) => (
                    <div
                        key={item.typeId}
                        className="mb-1 pb-1"
                        onClick={() => handleButtonClick(item.typeId)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="d-flex align-items-center">
                            <i className="bi bi-cup-hot-fill custom-icon me-2"></i>
                            <h4 className={`custom-h4 ${item.typeId === selectedType ? 'text-primary' : 'text-dark'}`}>
                                {item.typeName}
                            </h4>
                        </div>
                    </div>
                ))}
            </div>

            <div className="list-group mb-4">
                <div className="mb-3">
                    <h2 className="mb-2">Price</h2>
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
