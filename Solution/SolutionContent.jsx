import React from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PODs } from '../List/ListOfPods';
import './SolutionContent.css';

import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Icon } from 'react-materialize';

export default function SolutionContent() {
    return (
        <div className='POD-solution'>

            <div className='search-container'>
                <Form className='search'>

                    <Form.Group controlId='formPOD' className='form-group'>
                        <Form.Control as='select'>
                            <option value=''>[POD]</option>
                            <option value='option1'>Cao cấp</option>
                            <option value='option2'>Tiêu chuẩn</option>
                            <option value='option3'>Sáng tạo</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formType' className='form-group'>
                        <Form.Control as='select'>
                            <option value=''>[Type]</option>
                            <option value='option1'>Đơn</option>
                            <option value='option2'>Đôi</option>
                            <option value='option3'>Nhóm</option>
                            <option value='option4'>Phòng họp</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formUtility' className='form-group'>
                        <Form.Control as='select'>
                            <option value=''>[Utility]</option>
                            <option value='option1'>Ổ cắm điện</option>
                            <option value='option2'>Máy chiếu</option>
                            <option value='option3'>Máy pha cà phê</option>
                            <option value='option4'>Bảng trắng thông minh</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formBasicSearch' className='form-group form-input'>
                        <Form.Control className='input' type='text' placeholder='POD Name' />
                    </Form.Group>

                    <Button className='submit'>SEARCH</Button>
                </Form>

                <hr style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }} />

            </div>

            <div className='solution-container'>
                <Row className='image-row'>
                    {PODs.map((pod, index) => (
                        <Col sm={12} md={6} lg={6} xl={4} xxl={3} className='image-col'>
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
                                                    (<Link to={`${pod.id}`}><p><Button className='btn' style={{ backgroundColor: '#28a745' }}>Available</Button></p></Link>) :
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
        </div>
    )
}
