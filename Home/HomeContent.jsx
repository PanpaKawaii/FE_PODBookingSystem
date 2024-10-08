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

import about from '../BackgroundImage/about.jpg'
import space from '../BackgroundImage/space.jpg'

export default function HomeContent() {
    return (
        <div className='POD-home'>

            <img src={about} alt='about' />

            <div className='shortcut-solution'>
                <h2 className='title'>BEST SOLUTIONS</h2>
                <Row className='image-row'>
                    {PODs.slice(0, 4).map((pod, index) => (
                        <Col sm={12} md={6} lg={6} xl={6} xxl={3} className='image-col'>
                            <Card key={pod.id} className='image-card'>
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
                                                {pod.status === 'Available' ?
                                                    (<Link to={`solution/${pod.id}`}><p><Button className='btn' style={{ backgroundColor: '#28a745' }}>Available</Button></p></Link>) :
                                                    (<Link                 ><p><Button className='btn' style={{ backgroundColor: '#dc3545' }}>Unavailable</Button></p></Link>)
                                                }
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
                <img src={space} alt='space' />
                <Form className='card-form'>
                    <h1>CONTACT US</h1>
                    <Form.Text><p>InnoSpace always appreciate all the opinions from you!</p></Form.Text>
                    <Form.Text><p>We will reply in the nearest 24 hours!</p></Form.Text>

                    <Form.Group controlId='formBasicName'>
                        <Form.Control className='input' type='text' placeholder='Name' />
                    </Form.Group>

                    <Form.Group controlId='formBasicEmail'>
                        <Form.Control className='input' type='text' placeholder='Email' />
                    </Form.Group>

                    <Form.Group controlId='formBasicPhoneNumber'>
                        <Form.Control className='input' type='text' placeholder='Phone Number' />
                    </Form.Group>

                    <Form.Group controlId='formBasicYourProblem'>
                        <Form.Control className='input' type='text' placeholder='Your Problem' />
                    </Form.Group>
                    <Button className='submit'>SUBMIT</Button>
                </Form>
            </div>

        </div>
    )
}
