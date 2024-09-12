import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTableById, updateTable } from '../../service/tableService';
import { toast } from 'react-toastify';

const TableEdit = () => {
    const { tableId } = useParams();
    const navigate = useNavigate();
    const [table, setTable] = useState(null);
    const [code, setCode] = useState('');
    const [state, setState] = useState('');
    const [isOn, setIsOn] = useState(true);

    useEffect(() => {
        const fetchTable = async () => {
            try {
                const data = await getTableById(tableId);
                setTable(data);
                setCode(data.code);
                setState(data.state);
                setIsOn(data.on); // Sửa từ isOn thành on
            } catch (error) {
                console.error('Lỗi khi lấy thông tin bàn:', error);
                toast.error('Lỗi khi lấy thông tin bàn.');
            }
        };

        fetchTable();
    }, [tableId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateTable(tableId, { code, state, on: isOn }); // Sửa từ isOn thành on
            toast.success('Cập nhật bàn thành công!');
            navigate('/admin/tables/list'); // Điều hướng về trang danh sách bảng
        } catch (error) {
            console.error('Lỗi khi cập nhật bàn:', error);
            toast.error('Cập nhật bàn thất bại.');
        }
    };

    if (!table) return <p>Đang tải...</p>;

    return (
        <div className="main-content">
            <div className="section-body">
                <h2 className="section-title">Sửa Bàn</h2>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Mã Bàn</label>
                            <input
                                type="text"
                                className="form-control"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Tình Trạng</label>
                            <input
                                type="text"
                                className="form-control"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Trạng Thái</label>
                            <select
                                className="form-control"
                                value={isOn}
                                onChange={(e) => setIsOn(e.target.value === 'true')}
                            >
                                <option value={true}>Bật</option>
                                <option value={false}>Tắt</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Cập Nhật</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TableEdit;
