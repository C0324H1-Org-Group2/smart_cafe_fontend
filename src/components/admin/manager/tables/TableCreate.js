import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTable } from '../../service/tableService'; // Đảm bảo đường dẫn đúng
import { toast } from 'react-toastify';

const TableCreate = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [state, setState] = useState('');
    const [isOn, setIsOn] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTable({ code, state, isOn });
            toast.success('Table created successfully!');
            navigate('/admin/tables/list'); // Điều hướng về trang danh sách bảng
        } catch (error) {
            console.error('Error creating table:', error);
            toast.error('Failed to create table.');
        }
    };

    return (
        <div className="main-content">
            <div className="section-body">
                <h2 className="section-title">Create Table</h2>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Code</label>
                            <input
                                type="text"
                                className="form-control"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>State</label>
                            <input
                                type="text"
                                className="form-control"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select
                                className="form-control"
                                value={isOn}
                                onChange={(e) => setIsOn(e.target.value === 'true')}
                            >
                                <option value={true}>On</option>
                                <option value={false}>Off</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TableCreate;
