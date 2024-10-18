import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import './HomeContent.css'

import home from '../BackgroundImage/home.jpg'
import space from '../BackgroundImage/space.jpg'

export default function HomeContent() {

    const [PODs, setPODs] = useState(null);
    const [TYPEs, setTYPEs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

            <img src={home} alt='home' />

            <div className='shortcut-booking-pod'>
                <h1><b>BEST SOLUTIONS</b></h1>
                <Row className='image-row'>
                    {(PODs ? PODs.slice(0, 4) : []).map((pod, index) => ( // Check if PODs is not null
                        <Col key={pod.id} xs={12} sm={12} md={6} lg={6} xl={6} xxl={3} className='image-col'>
                            <Card className='image-card'>
                                <img src={pod.image} alt={pod.name} />
                                <div className='rating'>
                                    {[...Array(pod.rating)].map((_, i) => (
                                        <span key={i} style={{ color: 'gold', fontSize: '1.5em' }}>★</span>
                                    ))}
                                </div>

                                <div className='capacity'>
                                    {getCapacity(pod.typeId) === 10 ?
                                        (
                                            <span className='capacity-icon' style={{ padding: '5px' }}><i className='fa-solid fa-user' style={{ paddingRight: '5px' }}></i><b> x 10</b></span>
                                        ) :
                                        (
                                            [...Array(getCapacity(pod.typeId))].map((_, i) => (
                                                <span key={i} className='capacity-icon' style={{ padding: '5px' }}><i className='fa-solid fa-user'></i></span>
                                            ))
                                        )
                                    }
                                </div>

                                <Card.Body className='card-body'>
                                    <Card.Title className='card-tittle'>
                                        <h4><b>{pod.name}</b></h4>
                                    </Card.Title>
                                    <Card.Text className='card-info'>
                                        <div className='full-detail'>
                                            <div className='short-detail'>
                                                <p>TypeId: {pod.typeId}</p>
                                                <p>StoreId: {pod.storeId}</p>
                                            </div>
                                            <div className='active-button'>
                                                <Link to={`booking/store/${pod.storeId}/pod/${pod.id}`}>
                                                    <Button className='btn' style={{ backgroundColor: '#28a745' }}>Select</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            <div className='shortcut-contact'>
                <h1><b>GOT ANY PROBLEM?</b></h1>
                <div className='card-contact'>
                    <img src={space} alt='space' />
                    <Form className='card-form'>
                        <h1>CONTACT US</h1>
                        <Form.Text><p>InnoSpace luôn sẵn sàng lắng nghe câu hỏi và ý kiến đóng góp từ bạn!</p></Form.Text>
                        <Form.Text><p>Chúng tôi sẽ phản hồi ngay trong 24h tiếp theo!</p></Form.Text>

                        <Form.Group controlId='formName'>
                            <Form.Control className='input' type='text' placeholder='Name' />
                        </Form.Group>

                        <Form.Group controlId='formEmail'>
                            <Form.Control className='input' type='text' placeholder='Email' />
                        </Form.Group>

                        <Form.Group controlId='formPhoneNumber'>
                            <Form.Control className='input' type='text' placeholder='Phone Number' />
                        </Form.Group>

                        <Form.Group controlId='formYourProblem'>
                            <Form.Control className='input' type='text' placeholder='Your Problem' />
                        </Form.Group>
                        <Button className='btn'>SUBMIT</Button>
                    </Form>
                </div>
            </div>

        </div >
    )
}
