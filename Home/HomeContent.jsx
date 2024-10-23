import React from 'react'
import { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import './HomeContent.css'
import home from '../BackgroundImage/home.jpg'
import Carousel from 'react-bootstrap/Carousel';
import why2 from '../BackgroundImage/why2.jpg'
import why3 from '../BackgroundImage/why3.jpg'
import why4 from '../BackgroundImage/why4.jpg'

export default function HomeContent() {

    const [PODs, setPODs] = useState(null);
    const [TYPEs, setTYPEs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stores, setStores] = useState(null); // Thêm state để lưu trữ thông tin cửa hàng
    const [slots, setSlots] = useState(null);

    const calculateStoreRatings = (stores, pods) => {
        return stores.map(store => {
            const relatedPods = pods.filter(pod => pod.storeId === store.id); // Assuming each POD has a storeId
            const averageRating = relatedPods.length > 0 
                ? (relatedPods.reduce((sum, pod) => sum + pod.rating, 0) / relatedPods.length).toFixed(1) // Updated to one decimal place
                : 0;
            return { ...store, rating: averageRating }; // Update store with new rating
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const podResponse = await fetch('https://localhost:7166/api/Pod');
                if (!podResponse.ok) throw new Error('Network response was not ok');
                const podData = await podResponse.json();
                setPODs(podData);

                const typeResponse = await fetch('https://localhost:7166/api/Type');
                if (!typeResponse.ok) throw new Error('Network response was not ok');
                const typeData = await typeResponse.json();
                setTYPEs(typeData);

                // Lấy thông tin cửa hàng
                const storeResponse = await fetch('https://localhost:7166/api/Store'); // API để lấy thông tin cửa hàng
                if (!storeResponse.ok) throw new Error('Network response was not ok');
                const storeData = await storeResponse.json();
                const updatedStores = calculateStoreRatings(storeData, podData);
                setStores(updatedStores); // Update state with stores having average ratings

                const slotResponse = await fetch('https://localhost:7166/api/Slot');
                if (!slotResponse.ok) throw new Error('Network response was not ok');
                const slotData = await slotResponse.json();
                setSlots(slotData);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getCapacity = (typeId) => {
        const type = TYPEs ? TYPEs.find(type => type.id === typeId) : null;
        return type ? type.capacity : 0;
    };
    return (
        <div className='POD-home'>
            <img src={home} alt='home' className='header-image' />

            <div className='overlay'> {/* Lớp overlay để chứa chữ */}
                <div className='intro-text'>
                    <div className='hello-customers'>INNOSPACE</div>
                    <div className='intro-text-1'>NƠI LÀM VIỆC SÁNG TẠO VÀ HIỆU QUẢ</div>
                    <p className='intro-text-2'>Tự hào mang đến cho bạn giải pháp tối ưu để làm việc tại bất kỳ đâu, với không gian linh hoạt và dịch vụ chất lượng cao!</p>
                </div>
            </div>
            <h1 className='section-title'><b>CỬA HÀNG SẴN CÓ</b></h1>
            <div className='shortcut-booking-pod'>

                <Row xs={1} sm={2} md={4} lg={4} className='image-row'>
                    {stores && stores.map(store => {
                        return (

                            <Col key={store.id} className='image-col'>
                                <Card className='image-card'>
                                    <Card.Img src={home} alt={store.name} className='pod-image' />

                                    <Card.Body className='card-body'>
                                        <Card.Title className='card-title'>
                                            <h4><b>{store.name}</b></h4>
                                        </Card.Title>
                                        <Card.Text className='card-info'>
                                            <div className='full-detail'>
                                                <div className='short-detail'>
                                                    <p key={store.id}>Địa chỉ: {store.address}</p>
                                                </div>
                                                <span className='short-detail'>
                                                    Đa dạng loại hình:
                                                    <span className='type-list'>
                                                        {TYPEs && TYPEs.map((type, index) => (
                                                            <span key={type.id}>
                                                                {type.name}{index < TYPEs.length - 1 ? ', ' : ''}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </span>
                                                <div className='short-detail'>
                                                    {TYPEs && TYPEs.length > 0 ? (
                                                        <span>
                                                            {/* Lấy số bé nhất và lớn nhất trong capacity */}
                                                            {Math.min(...TYPEs.map(type => type.capacity))} - {Math.max(...TYPEs.map(type => type.capacity))}
                                                            {/* Hiển thị một icon user */}
                                                            <span className='capacity-icon'> <i className='fa-solid fa-user'></i></span>
                                                        </span>
                                                    ) : null}
                                                </div>
                                                <div>
                                                {slots && slots.length > 0 ? (
                                                        <span>
                                                            {Math.min(...slots.map(slot => slot.price))} - {Math.max(...slots.map(slot => slot.price))}
                                                            <span className='capacity-icon'> vnđ</span>
                                                        </span>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className='star-rating' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> {/* Added flexbox styles */}
                                                <div> {/* Wrap stars in a div for alignment */}
                                                        <span key={store.id} className='yellow-star'>{store.rating}★</span>
                                                </div>
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                        );
                    })}
                </Row>
            </div>
            <h1 className='section-title'><b>TẠI SAO CHỌN INNOSPACE?</b></h1>

            <Carousel data-bs-theme="light">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={why2}
                        alt="First slide"
                    />
                    <Carousel.Caption className='carousel-text'>
                        <h5>KHÔNG GIAN LÀM VIỆC ĐA DẠNG</h5>
                        <p>Đáp ứng nhu cầu đa dạng từ các sinh viên, freelancer đến doanh nghiệp nhỏ, với lựa chọn đa dạng từ phòng làm việc cá nhân đến không gian làm việc nhóm.</p>                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={why3}

                        alt="Second slide"
                    />
                    <Carousel.Caption className='carousel-text'>
                        <h5>QUẢN LÝ ĐẶT CHỖ THÔNG MINH</h5>
                        <p>Giao diện thân thiện, cho phép bạn dễ dàng tìm kiếm và đặt chỗ theo nhu cầu, thời gian và ngân sách.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={why4}

                        alt="Third slide"
                    />
                    <Carousel.Caption className='carousel-text'>
                        <h5>DỊCH VỤ TOÀN DIỆN</h5>
                        <p>
                            Hỗ trợ quản lý lịch làm việc, thanh toán trực tuyến và cung cấp các gói dịch vụ linh hoạt kèm các tiện ích.                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

        </div>
    );
}
