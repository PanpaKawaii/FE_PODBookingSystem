import React from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { STOREs } from '../List/ListOfPods';
import './BookingStoreContent.css';

import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Icon } from 'react-materialize';

export default function BookingStoreContent() {
    return (
        <div className='POD-booking-store'>

            <div className='search-container'>
                <Form className='search'>

                    <Form.Group controlId='formName' className='form-group form-input'>
                        <Form.Control className='input' type='text' placeholder='Store Name' />
                    </Form.Group>

                    <Button className='submit'>SEARCH</Button>
                </Form>

                <hr style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }} />

            </div>

            <div className='booking-store-container'>
                <Row className='image-row'>
                    {STOREs.map((store, index) => (
                        <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6} className='image-col'>
                            <Card key={store.Id} className='image-card'>
                                <Link to={`${store.Id}`}><img src={store.img} alt={store.StoreName} /></Link>
                                <div className='rating'>
                                    {[...Array(store.rating)].map((_, i) => (
                                        <span key={i} style={{ color: 'gold', fontSize: '1.5em' }}>★</span>
                                    ))}
                                </div>

                                <div className='capacity'>
                                    {store.capacity === 10 ?
                                        (
                                            <span className='capacity-icon' style={{ fontWeight: 'bold', paddingRight: '5px' }}><Icon>person</Icon> x 10</span>
                                        ) :
                                        (
                                            [...Array(store.capacity)].map((_, i) => (
                                                <span key={i} className='capacity-icon'><Icon>person</Icon></span>
                                            ))
                                        )
                                    }
                                </div>

                                <Card.Body className='card-body'>
                                    <Card.Title className='card-tittle'>
                                        <h4>{store.StoreName}</h4>
                                    </Card.Title>
                                    <Card.Text className='card-info'>
                                        <div className='full-detail'>
                                            <div className='short-detail'>
                                                <p>Type: {store.StoreName}</p>
                                            </div>
                                            <div className='active-button'>
                                                <Link to={`${store.Id}`}><Button className='btn' style={{ backgroundColor: '#28a745' }}>GO!</Button></Link>
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
