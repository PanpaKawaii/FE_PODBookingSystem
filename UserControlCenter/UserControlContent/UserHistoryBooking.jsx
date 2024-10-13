import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import { BOOKINGs } from '../../List/ListOfPods';
import './UserControlContent.css'

import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Icon } from 'react-materialize';

import UserSideBar from '../UserSideBar/UserSideBar';

export default function UserHistoryBooking() {

    const [USERs, setUSERs] = useState(null);
    const [BOOKINGs, setBOOKINGs] = useState(null);
    const [PODs, setPODs] = useState(null);
    const [TYPEs, setTYPEs] = useState(null);
    const [STOREs, setSTOREs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await fetch('https://localhost:7166/api/User');
                if (!userResponse.ok) throw new Error('Network response was not ok');
                const userData = await userResponse.json();
                setUSERs(userData);

                const bookingResponse = await fetch('https://localhost:7166/api/Booking');
                if (!bookingResponse.ok) throw new Error('Network response was not ok');
                const bookingData = await bookingResponse.json();
                setBOOKINGs(bookingData);

                const podResponse = await fetch('https://localhost:7166/api/Pod');
                if (!podResponse.ok) throw new Error('Network response was not ok');
                const podData = await podResponse.json();
                setPODs(podData);

                const typeResponse = await fetch('https://localhost:7166/api/Type');
                if (!typeResponse.ok) throw new Error('Network response was not ok');
                const typeData = await typeResponse.json();
                setTYPEs(typeData);

                const storeResponse = await fetch('https://localhost:7166/api/Store');
                if (!storeResponse.ok) throw new Error('Network response was not ok');
                const storeData = await storeResponse.json();
                setSTOREs(storeData);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredResults = BOOKINGs ? BOOKINGs.filter(booking => 
        booking.userId == 3 // 3 => ThisUser.id
    ) : [];

    const getPodName = (podId) => {
        const pod = PODs ? PODs.find(pod => pod.id === podId) : null;
        return pod ? pod.name : null;
    };

    const getPodImage = (podId) => {
        const pod = PODs ? PODs.find(pod => pod.id === podId) : null;
        return pod ? pod.image : null;
    };

    const getPodRating = (podId) => {
        const pod = PODs ? PODs.find(pod => pod.id === podId) : null;
        return pod ? pod.rating : 0;
    };

    const getPodCapacity = (podId) => {
        const pod = PODs ? PODs.find(pod => pod.id === podId) : null;
        const type = TYPEs ? TYPEs.find(type => type.id === pod.typeId) : null;
        return type ? type.capacity : 0;
    };

    const getTypeName = (podId) => {
        const pod = PODs ? PODs.find(pod => pod.id === podId) : null;
        const type = TYPEs ? TYPEs.find(type => type.id === pod.typeId) : null;
        return type ? type.name : null;
    };

    const getStoreId = (podId) => {
        const pod = PODs ? PODs.find(pod => pod.id === podId) : null;
        const store = STOREs ? STOREs.find(store => store.id === pod.storeId) : null;
        return store ? store.id : null;
    };

    const getStoreName = (podId) => {
        const pod = PODs ? PODs.find(pod => pod.id === podId) : null;
        const store = STOREs ? STOREs.find(store => store.id === pod.storeId) : null;
        return store ? store.name : null;
    };

    return (
        <div className='user-control-center'>
            <div className='user-control-center-container'>

                <UserSideBar className='user-side-bar-container' />

                <div className='user-content-right-container'>
                    <Row className='image-row'>
                        {filteredResults ? (
                            filteredResults.map((booking, index) => (
                                <Col xxl={12} className='image-col'>
                                    <div key={booking.id} className='image-card'>
                                        <img src={getPodImage(booking.podId)} alt={getPodName(booking.podId)} />

                                        <div className='card-body'>
                                            <div className='card-tittle'>
                                                <h4><b>{getPodName(booking.podId)}</b></h4>
                                            </div>

                                            <div className='card-rating-capacity'>
                                                <div className='rating'>
                                                    {[...Array(getPodRating(booking.podId))].map((_, i) => (
                                                        <span key={i} style={{ color: 'gold', fontSize: '1.5em' }}>★</span>
                                                    ))}
                                                </div>

                                                <div className='capacity'>
                                                    {getPodCapacity(booking.podId) === 10 ?
                                                        (
                                                            <span className='capacity-icon' style={{ paddingRight: '5px' }}><Icon>person</Icon><b> x 10</b></span>
                                                        ) :
                                                        (
                                                            [...Array(getPodCapacity(booking.podId))].map((_, i) => (
                                                                <span key={i} className='capacity-icon'><Icon>person</Icon></span>
                                                            ))
                                                        )
                                                    }
                                                </div>
                                            </div>

                                            <div className='card-info'>
                                                <p>Date: {booking.date}</p>
                                                <p>Store: {getStoreName(booking.podId)} / Type: {getTypeName(booking.podId)} / Utility: {booking.utility}</p>
                                                <p>Feedback: {booking.feedback}</p>
                                            </div>
                                        </div>

                                        <div className='active-button'>
                                            <Link to={`../booking/store/${getStoreId(booking.podId)}/pod/${booking.podId}`}><Button className='btn'>REBOOK</Button></Link>
                                        </div>
                                    </div>
                                </Col>
                            ))
                        ) : (
                            <p>No bookings available.</p>
                        )}
                    </Row>
                </div>
            </div>
        </div>
    )
}
