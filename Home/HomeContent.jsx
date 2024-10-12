import React from 'react'
import { Form, Button } from 'react-bootstrap';
import { Row, Col, Card } from 'react-bootstrap';
import { PODs } from '../List/ListOfPods';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './HomeContent.css'

import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Icon } from 'react-materialize';

import home from '../BackgroundImage/home.jpg'
import space from '../BackgroundImage/space.jpg'

export default function HomeContent() {
    return (
        <div className='POD-home'>

            <img src={home} alt='home' />

            <div className='shortcut-booking-pod'>
                <h1><b>BEST SOLUTIONS</b></h1>
                <Row className='image-row'>
                    {PODs.slice(0, 4).map((pod, index) => (
                        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={3} className='image-col'>
                            <Card key={pod.Id} className='image-card'>
                                <img src={pod.img} alt={pod.PodName} />
                                <div className='rating'>
                                    {[...Array(pod.rating)].map((_, i) => (
                                        <span key={i} style={{ color: 'gold', fontSize: '1.5em' }}>★</span>
                                    ))}
                                </div>

                                <div className='capacity'>
                                    {pod.capacity === 10 ?
                                        (
                                            <span className='capacity-icon' style={{ fontWeight: 'bold', paddingRight: '5px' }}><Icon>person</Icon> x 10</span>
                                        ) :
                                        (
                                            [...Array(pod.capacity)].map((_, i) => (
                                                <span key={i} className='capacity-icon'><Icon>person</Icon></span>
                                            ))
                                        )
                                    }
                                </div>

                                <Card.Body className='card-body'>
                                    <Card.Title className='card-tittle'>
                                        <h4>{pod.PodName}</h4>
                                    </Card.Title>
                                    <Card.Text className='card-info'>
                                        <div className='full-detail'>
                                            <div className='short-detail'>
                                                <p>Type: {pod.TypeName}</p>
                                                <p>Slot: 8:00 - 10:00</p>
                                            </div>
                                            <div className='active-button'>
                                                <Link to={`booking/store/${pod.StoreId}/pod/${pod.Id}`}><p><Button className='btn' style={{ backgroundColor: '#28a745' }}>Select</Button></p></Link>
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
                        <Form.Text><p>InnoSpace always appreciate all the opinions from you!</p></Form.Text>
                        <Form.Text><p>We will reply in the nearest 24 hours!</p></Form.Text>

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
                        <Button className='submit'>SUBMIT</Button>
                    </Form>
                </div>
            </div>

        </div >
    )
}
