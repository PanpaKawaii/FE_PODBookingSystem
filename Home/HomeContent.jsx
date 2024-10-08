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

import about from '../imagePOD/about.jpg'
import space from '../imagePOD/space.jpg'

export default function HomeContent() {
    return (
        <div className='POD-home'>

            <img src={about} alt='about' />

            <div>
                <h4>Hệ thống giải pháp không gian linh hoạt của chúng tôi</h4>
                <Row className='image-row'>
                    {PODs.map((pod, index) => (
                        <Col sm={12} md={6} lg={6} xl={4} xxl={3} className='image-col'>
                            <Card key={pod.id} className='image-card'>
                                <img src={pod.img} alt={pod.PodName} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            <div className='contact-card'>
                <img src={space} alt='space' />
                <div className='card-form'>
                    <Form className='contact-us'>
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

            <div className='home-container'>

            </div>
        </div>
    )
}
