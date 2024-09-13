// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import {getServiceDetails, getServiceTypes, updateService} from "../../service/ServiceService";
//
// const ServiceFormUpdate = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [service, setService] = useState(null);
//     const [types, setTypes] = useState([]);
//
//
//     useEffect(() => {
//         const fetchService = async () => {
//             try {
//                 const data = await getServiceDetails(id);
//                 setService(data);
//             } catch (error) {
//                 console.error('Lỗi khi lấy thông tin sản phẩm:', error);
//                 toast.error('Lỗi khi lấy thông tin sản phẩm');
//             }
//         };
//
//         fetchService();
//     }, [id]);
//
//     useEffect(() => {
//         const fetchTypes = async () => {
//             try {
//                 const data = await getServiceTypes(); // Hàm này cần được định nghĩa để lấy danh sách các loại dịch vụ từ server
//                 setTypes(data);
//             } catch (error) {
//                 console.error('Lỗi khi lấy danh sách loại dịch vụ:', error);
//                 toast.error('Lỗi khi lấy danh sách loại dịch vụ');
//             }
//         };
//
//         fetchTypes();
//     }, []);
//     const handleSubmit = async (values) => {
//         try {
//             await updateService(id, values);
//             toast.success('Dịch vụ được cập nhật thành công!');
//             navigate('/admin/service');
//         } catch (error) {
//             console.error('Cập nhật dịch vụ thất bại:', error);
//             toast.error('Cập nhật dịch vụ thất bại');
//         }
//     };
//     const handleCancel = () => {
//         navigate('/admin/service');
//     };
//
//     if (!service) return <p>Đang tải...</p>;
//
//     const validationSchema = Yup.object().shape({
//         serviceCode: Yup.string()
//             .required('Trường không được bỏ trống')
//             .test('is-format-correct', function (value) {
//                 const { typeId } = this.parent;
//                 let prefix;
//                 let errorMessage;
//                 switch (typeId) {
//                     case 'Cà Phê':
//                         prefix = 'CF';
//                         errorMessage = 'Yêu cầu cú pháp:  "CF + 4 chữ số"';
//                         break;
//                     case 'Freeze':
//                         prefix = 'FZ';
//                         errorMessage = 'Yêu cầu cú pháp:  "FZ + 4 chữ số"';
//                         break;
//                     case 'Trà':
//                         prefix = 'TEA';
//                         errorMessage = 'Yêu cầu cú pháp:  "TEA + 4 chữ số"';
//                         break;
//                     default:
//                         prefix = 'OT';
//                         errorMessage = 'Yêu cầu cú pháp:  "OT + 4 chữ số"';
//                         break;
//                 }
//                 const regex = new RegExp(`^${prefix}\\d{4}$`);
//                 return regex.test(value) ? true : this.createError({ message: errorMessage });
//             }),
//         serviceName: Yup.string()
//             .required('Trường không được bỏ trống'),
//         typeId: Yup.string()
//             .required('Trường không được bỏ trống'),
//         price: Yup.number()
//             .required('Trường không được bỏ trống')
//             .positive('Giá tiền phải là một số dương')
//             .max(30000000, 'Giá không được vượt quá 30 triệu'),
//         description: Yup.string()
//             .notRequired()
//             .default(null)
//             .min(3, 'Mô tả phải có ít nhất 3 từ')
//             .max(1000, 'Mô tả không được vượt quá 1000 từ'),
//         imageUrl: Yup.string()
//             .required('URL ảnh là bắt buộc'),
//         waitTime: Yup.string()
//             .required('Trường không được bỏ trống')
//             .matches(
//                 /^([0-5]?[0-9]):([0-5]?[0-9])$/,
//                 'Thời gian chờ phải có định dạng mm:ss'
//             ),
//         status: Yup.string()
//             .required('Trạng thái là bắt buộc'),
//         delete: Yup.boolean()
//     });
//
//
//     return (
//         <div className="main-content">
//             <div className="section-body">
//                 <h2 className="section-title">Cập nhật Dịch Vụ</h2>
//                 <div className="card-body">
//                     <Formik
//                         initialValues={{...service, typeId: service.type.typeId.toString()}}
//                         onSubmit={(values) => {
//                             const valuesToSend = {...values, typeId: {typeId: values.typeId}};
//                             handleSubmit(valuesToSend);
//                         }}
//                         validationSchema={validationSchema}
//                     >
//                         {({ setFieldValue, values }) => (
//                             <Form>
//                                 <div className="form-group mb-3">
//                                     <label htmlFor="serviceCode">Mã Sản Phẩm </label><br/>
//                                     <small>Chọn loại dịch vụ trước</small>
//                                     <Field name="serviceCode" type="text" className="form-control"
//                                            disabled={!values.typeId}/>
//                                     <ErrorMessage name="serviceCode" component="p" className="text-danger"/>
//                                 </div>
//                                 <div className="form-group mb-3">
//                                     <label htmlFor="serviceName">Tên Sản Phẩm</label>
//                                     <Field name="serviceName" type="text" className="form-control"/>
//                                     <ErrorMessage name="serviceName" component="p" className="text-danger"/>
//                                 </div>
//                                 <div className="form-group mb-3">
//                                     <label htmlFor="typeId">Loại Dịch Vụ:</label>
//                                     <Field as="select" name="typeId" className="form-control">
//                                         <option value="">Chọn loại dịch vụ</option>
//                                         {types.map(type => (
//                                             <option key={type.id} value={type.id}>
//                                                 {type.typeName}
//                                             </option>
//                                         ))}
//                                     </Field>
//                                     <ErrorMessage name="typeId" component="p" className="text-danger"/>
//                                 </div>
//                                 <div className="form-group mb-3">
//                                     <label htmlFor="price">Giá:</label>
//                                     <Field name="price" type="number" className="form-control"/>
//                                     <ErrorMessage name="price" component="p" className="text-danger"/>
//                                 </div>
//                                 <div className="form-group mb-3">
//                                     <label htmlFor="description">Mô Tả:</label>
//                                     <Field as="textarea" name="description" className="form-control"/>
//                                     <ErrorMessage name="description" component="p" className="text-danger"/>
//                                 </div>
//                                 <div className="form-group mb-3">
//                                     <label htmlFor="imageUrl">URL Ảnh:</label>
//                                     <Field name="imageUrl" type="text" className="form-control"/>
//                                     <ErrorMessage name="imageUrl" component="p" className="text-danger"/>
//                                 </div>
//                                 <div className="form-group mb-3">
//                                     <label htmlFor="status">Trạng Thái:</label>
//                                     <Field as="select" name="status" className="form-control">
//                                         <option value="available">Available</option>
//                                         <option value="unavailable">Unavailable</option>
//                                         <option value="out_of_stock">Out of Stock</option>
//                                     </Field>
//                                     <ErrorMessage name="status" component="p" className="text-danger"/>
//                                 </div>
//                                 <div className="d-flex justify-content-between">
//                                     <button type="submit" className="btn btn-primary">Tạo Dịch Vụ</button>
//                                     <button type="button" className="btn btn-secondary"
//                                             onClick={handleCancel}>Hủy
//                                     </button>
//                                 </div>
//                             </Form>
//                         )}
//                     </Formik>
//                 </div>
//             </div>
//         </div>
//     );
//
// };
//
//
// export default ServiceFormUpdate;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Button, Container } from 'react-bootstrap';
import { getServiceDetails, updateService } from "../../service/ServiceService";

const ServiceFormUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState({
        serviceCode: "",
        serviceName: "",
        typeId: "",
        price: "",
        description: "",
        imageUrl: "",
        status: "",
        is_delete: false,

    });

    useEffect(() => {
        const fetchService = async () => {
            try {
                const data = await getServiceDetails(id);
                setService(data);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin sản phẩm:', error);
                toast.error('Lỗi khi lấy thông tin sản phẩm');
            }
        };

        fetchService();
    }, [id]);

    const handleChange = (e) => {
        setService({ ...service, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateService(id, service);
            toast.success('Dịch vụ được cập nhật thành công!');
            navigate('/admin/service');
        } catch (error) {
            console.error('Cập nhật dịch vụ thất bại:', error);
            toast.error('Cập nhật dịch vụ thất bại');
        }
    };

    const handleCancel = () => {
        navigate('/admin/service');
    };

    return (
        <Container>
            <h2 className="mt-4">Cập nhật Dịch Vụ</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="serviceCode">
                    <Form.Label>Mã Sản Phẩm</Form.Label>
                    <Form.Control
                        type="text"
                        name="serviceCode"
                        value={service.serviceCode}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="serviceName">
                    <Form.Label>Tên Sản Phẩm</Form.Label>
                    <Form.Control
                        type="text"
                        name="serviceName"
                        value={service.serviceName}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="typeId">
                    <Form.Label>Loại Dịch Vụ:</Form.Label>
                    <Form.Control
                        type="text"
                        name="typeId"
                        value={service.typeId}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="price">
                    <Form.Label>Giá:</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={service.price}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Mô Tả:</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        value={service.description}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="imageUrl">
                    <Form.Label>URL Ảnh:</Form.Label>
                    <Form.Control
                        type="text"
                        name="imageUrl"
                        value={service.imageUrl}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="status">
                    <Form.Label>Trạng Thái:</Form.Label>
                    <Form.Control
                        type="text"
                        name="status"
                        value={service.status}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <div className="d-flex justify-content-between">
                    <Button variant="primary" type="submit" className="mt-3">Cập nhật</Button>
                    <Button type="button" variant="secondary" className="mt-3"
                            onClick={handleCancel}>Hủy</Button>
                </div>
            </Form>
        </Container>
    );
};

export default ServiceFormUpdate;