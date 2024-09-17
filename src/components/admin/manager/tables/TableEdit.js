import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTableById, updateTable } from '../../service/tableService';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Định nghĩa schema xác thực với Yup
const validationSchema = Yup.object({
    code: Yup.string()
        .matches(/^TB\d+$/, 'Code must start with "TB" followed by numbers') // Biểu thức chính quy để kiểm tra định dạng
        .required('Code is required'),
    state: Yup.string()
        .required('State is required'),
    on: Yup.boolean()
});

const TableEdit = () => {
    const { tableId } = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState(null);

    useEffect(() => {
        const fetchTable = async () => {
            try {
                const data = await getTableById(tableId);
                setInitialValues({
                    code: data.code,
                    state: data.state,
                    on: data.on
                });
            } catch (error) {
                console.error('Lỗi khi lấy thông tin bàn:', error);
                toast.error('Lỗi khi lấy thông tin bàn.');
            }
        };

        fetchTable();
    }, [tableId]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await updateTable(tableId, values);
            toast.success('Cập nhật bàn thành công!');
            navigate('/admin/tables/list'); // Điều hướng về trang danh sách bảng
        } catch (error) {
            console.error('Lỗi khi cập nhật bàn:', error);
            toast.error('Cập nhật bàn thất bại.');
        } finally {
            setSubmitting(false);
        }
    };

    if (!initialValues) return <p>Đang tải...</p>;

    return (
        <div className="main-content">
            <div className="section-body">
                <h2 className="section-title">Sửa Bàn</h2>
                <div className="card-body">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="code">Code</label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="code"
                                        name="code"
                                    />
                                    <ErrorMessage name="code" component="div" className="text-danger" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="state">State</label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="state"
                                        name="state"
                                    />
                                    <ErrorMessage name="state" component="div" className="text-danger" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="on">Status</label>
                                    <Field as="select" className="form-control" id="on" name="on">
                                        <option value={true}>Bật</option>
                                        <option value={false}>Tắt</option>
                                    </Field>
                                    <ErrorMessage name="on" component="div" className="text-danger" />
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Updating...' : 'Cập Nhật'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default TableEdit;
