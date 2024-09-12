import React, { useState } from 'react';
import UseScrollToHash from "../common/UseScrollToHash";
import * as serviceService from "../services/ServiceService";

const ContactForm = () => {
    UseScrollToHash();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form

        try {
            const response = await serviceService.sendFeedback({email, message});
            console.log('Feedback sent:', response);
            // Xử lý phản hồi từ server (như hiển thị thông báo thành công)
        } catch (error) {
            console.error('Error sending feedback:', error);
            // Xử lý lỗi (như hiển thị thông báo lỗi)
        }
    };

    return (
        <section className="ftco-section contact-section" id="feedback">
            <div className="container mt-5">
                <div className="row block-9">
                    <div className="col-md-4 contact-info">
                        <div className="row">
                            <div className="col-md-12 mb-4">
                                <h2 className="h4">Contact Information</h2>
                            </div>
                            <div className="col-md-12 mb-3">
                                <p><span>Address:</span> 198 West 21th Street, Suite 721 New York NY 10016</p>
                            </div>
                            <div className="col-md-12 mb-3">
                                <p><span>Phone:</span> <a href="tel://1234567920">+ 1235 2355 98</a></p>
                            </div>
                            <div className="col-md-12 mb-3">
                                <p><span>Email:</span> <a href="mailto:info@yoursite.com">info@yoursite.com</a></p>
                            </div>
                            <div className="col-md-12 mb-3">
                                <p><span>Website:</span> <a href="#">yoursite.com</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="phone"
                                            placeholder="Your Phone Number"
                                            pattern="[0-9]{10}"
                                            required
                                            />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    cols="30"
                                    rows="7"
                                    className="form-control"
                                    placeholder="Message Feedback"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="btn btn-primary py-3 px-5"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactForm;
