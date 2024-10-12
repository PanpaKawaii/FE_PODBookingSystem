import React from 'react'
import { Button } from 'react-bootstrap';
import { Row, Col, Card } from 'react-bootstrap';
import { PODs } from '../../List/ListOfPods';
import { Link } from 'react-router-dom';
import './UserControlContent.css'

import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Icon } from 'react-materialize';

import UserSideBar from '../UserSideBar/UserSideBar';

export default function UserHistoryBooking() {
    return (
        <div className='user-control-center'>
            <div className='user-control-center-container'>

                <UserSideBar className='user-side-bar-container' />

                <div className='user-information-right-container'>
                    <Row className='image-row'>
                        {PODs.slice(0, 4).map((pod, index) => (
                            <Col xxl={12} className='image-col'>
                                <Card key={pod.Id} className='image-card'>
                                    <img src={pod.img} alt={pod.PodName} style={{ width: '400px' }} />
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
                                                    <Link to={`booking/${pod.StoreId}/${pod.Id}`}><p><Button className='btn' style={{ backgroundColor: '#28a745' }}>Select</Button></p></Link>
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
        </div>
    )
}
