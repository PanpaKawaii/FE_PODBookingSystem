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
    
    const [stores, setStores] = useState(null); // Thêm state để lưu trữ thông tin cửa hàng
    

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
                setStores(storeData); // Lưu trữ thông tin cửa hàng

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
            <h1 className='section-title'><b>CƠ SỞ MỚI SẮP RA MẮT!</b></h1>
            <div className='shortcut-booking-pod'>

                <Row xs={1} sm={2} md={4} lg={4} className='image-row'>
                    {(PODs ? PODs.slice(0, 4) : []).map((pod) => {
                        return (

                            <Col key={pod.id} className='image-col'>
                                <Card className='image-card'>
                                    <Card.Img src={home} alt={pod.name} className='pod-image' />

                                    <Card.Body className='card-body'>
                                        <Card.Title className='card-title'>
                                            <h4><b>{pod.name}</b></h4>
                                        </Card.Title>
                                        <Card.Text className='card-info'>
                                            <div className='full-detail'>
                                                <div className='short-detail'>
                                                    {/* Hiển thị tất cả tên và địa chỉ của cửa hàng */}
                                                    {stores && stores.map(store => (
                                                        <p key={store.id}>{store.name}: {store.address}</p>
                                                    ))}
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
                                                        <>
                                                            {/* Lấy số bé nhất và lớn nhất trong capacity */}
                                                            {Math.min(...TYPEs.map(type => type.capacity))} - {Math.max(...TYPEs.map(type => type.capacity))}
                                                            {/* Hiển thị một icon user */}
                                                             <span className='capacity-icon'> <i className='fa-solid fa-user'></i></span>
                                                        </>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className='star-rating' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> {/* Added flexbox styles */}
                                                <div> {/* Wrap stars in a div for alignment */}
                                                    {[...Array(pod.rating)].map((_, i) => (
                                                        <span key={i} className='yellow-star'>★</span>
                                                    ))}
                                                </div>
                                                <p className='price'>80.000/slot</p>
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
