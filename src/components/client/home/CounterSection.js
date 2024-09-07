import React from 'react';

const CounterSection = () => {
    return (
        <section
            className="ftco-counter ftco-bg-dark img"
            id="section-counter"
            style={{ backgroundImage: 'url(images/bg_2.jpg)' }}
            data-stellar-background-ratio="0.5"
        >
            <div className="overlay"></div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap">
                                <div className="block-18 text-center">
                                    <div className="text">
                                        <div className="icon"><span className="flaticon-coffee-cup"></span></div>
                                        <strong className="number" data-number="100">0</strong>
                                        <span>Coffee Branches</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap">
                                <div className="block-18 text-center">
                                    <div className="text">
                                        <div className="icon"><span className="flaticon-coffee-cup"></span></div>
                                        <strong className="number" data-number="85">0</strong>
                                        <span>Number of Awards</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap">
                                <div className="block-18 text-center">
                                    <div className="text">
                                        <div className="icon"><span className="flaticon-coffee-cup"></span></div>
                                        <strong className="number" data-number="10567">0</strong>
                                        <span>Happy Customer</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap">
                                <div className="block-18 text-center">
                                    <div className="text">
                                        <div className="icon"><span className="flaticon-coffee-cup"></span></div>
                                        <strong className="number" data-number="900">0</strong>
                                        <span>Staff</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CounterSection;
