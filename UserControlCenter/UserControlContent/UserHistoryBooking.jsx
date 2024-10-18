import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import './UserControlContent.css'

import UserSideBar from '../UserSideBar/UserSideBar';

import avatar from '../UserSideBar/YellowBanana.jpg'

export default function UserHistoryBooking() {

    const [id, setId] = useState(null);
    const UserId = localStorage.getItem('UserId');
    useEffect(() => {
        const UserIdInt = parseInt(UserId, 10);
        setId(UserIdInt);
    }, [UserId]);

    const [BOOKINGs, setBOOKINGs] = useState(null);
    const [PODs, setPODs] = useState(null);
    const [TYPEs, setTYPEs] = useState(null);
    const [SLOTs, setSLOTs] = useState([]);
    const [STOREs, setSTOREs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
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

                const slotResponse = await fetch('https://localhost:7166/api/Slot');
                if (!slotResponse.ok) throw new Error('Network response was not ok');
                const slotData = await slotResponse.json();
                setSLOTs(slotData);

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

    // const [thisBOOKING, setThisBOOKING] = useState(null);
    // const [thisPOD, setThisPOD] = useState(null);
    // const [thisTYPE, setThisTYPE] = useState(null);
    // const [thisSLOT, setThisSLOT] = useState([]);
    // const [thisSTORE, setThisSTORE] = useState(null);

    // Lấy những Booking của User này
    const filteredBOOKINGs = id && BOOKINGs ? BOOKINGs.filter(booking => booking.userId == id) : [];

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

    const getSlots = (bookingId) => {
        const slots = SLOTs ? SLOTs.filter(slot =>
            slot.bookings && slot.bookings.some(booking => booking.id === bookingId)
        ) : [];
        return slots;
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

    const getStoreAddress = (podId) => {
        const pod = PODs ? PODs.find(pod => pod.id === podId) : null;
        const store = STOREs ? STOREs.find(store => store.id === pod.storeId) : null;
        return store ? store.address : null;
    };

    return (
        <div className='user-control-center'>
            <div className='user-control-center-container'>

                <UserSideBar className='user-side-bar-container' />

                <div className='user-booking'>
                    <Row className='booking-row'>
                        {filteredBOOKINGs ? (
                            filteredBOOKINGs.map((booking, index) => (
                                <Col key={index} xxl={12} className='booking-col'>
                                    <div className='booking-card'>
                                        <div className='card-information'>
                                            <img src={avatar} alt={getPodName(booking.podId)} />
                                            {/* <img src={getPodImage(booking.podId)} alt={getPodName(booking.podId)} /> */}

                                            <div className='card-info'>
                                                <h4><b>{getPodName(booking.podId)}</b></h4>

                                                <div className='card-rating-capacity'>
                                                    <div className='rating'>
                                                        {[...Array(getPodRating(booking.podId))].map((_, i) => (
                                                            <span key={i} style={{ color: 'gold', fontSize: '1.5em' }}>★</span>
                                                        ))}
                                                    </div>

                                                    <div className='capacity'>
                                                        {getPodCapacity(booking.podId) === 10 ?
                                                            (
                                                                <span className='capacity-icon' style={{ padding: '5px' }}><i className='fa-solid fa-user' style={{ paddingRight: '5px' }}></i><b> x 10</b></span>
                                                            ) :
                                                            (
                                                                [...Array(getPodCapacity(booking.podId))].map((_, i) => (
                                                                    <span key={i} className='capacity-icon' style={{ padding: '5px' }}><i className='fa-solid fa-user'></i></span>
                                                                ))
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <p>{getStoreName(booking.podId)}: {getStoreAddress(booking.podId)}</p>
                                                <p>{getTypeName(booking.podId)}</p>
                                                <p>Trạng thái: {booking.status}</p>
                                                <p>Feedback: {booking.feedback}</p>
                                            </div>

                                            <div className='card-date'>
                                                <p><b>Ngày nhận phòng:</b> {booking.date}</p>
                                                <div className='slot-name'>
                                                    {getSlots(booking.id).slice(0, 3).map((slot, index) => (
                                                        <span key={index}>
                                                            <p>{slot.name}</p>
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className='slot-name'>
                                                    {getSlots(booking.id).slice(3, 6).map((slot, index) => (
                                                        <span key={index}>
                                                            <p>{slot.name}</p>
                                                        </span>
                                                    ))}
                                                </div>
                                                <h4>Amount: 999 ngàn đồng</h4>
                                            </div>
                                        </div>

                                        <div className='rebook-button'>
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
