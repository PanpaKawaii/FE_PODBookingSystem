import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import './BookingPodDetailContent.css';

import single1 from '../assets/PODs/single1.jpg'
import double1 from '../assets/PODs/double1.jpg'
import group1 from '../assets/PODs/group1.jpg'

export default function BookingPodDetailContent() {

    const [id, setId] = useState(null);
    const UserId = localStorage.getItem('UserId');
    useEffect(() => {
        const UserIdInt = parseInt(UserId, 10);
        setId(UserIdInt);
    }, [UserId]);

    const [PODs, setPODs] = useState(null);
    const [TYPEs, setTYPEs] = useState(null);
    const [UTILITIes, setUTILITIes] = useState(null);
    const [SLOTs, setSLOTs] = useState([]);
    const [STOREs, setSTOREs] = useState(null);
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

                const utilityResponse = await fetch('https://localhost:7166/api/Utility');
                if (!utilityResponse.ok) throw new Error('Network response was not ok');
                const utilityData = await utilityResponse.json();
                setUTILITIes(utilityData);

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

    // Lấy Id của Pod được chọn
    const PodId = useParams();
    const Pod = PODs ? PODs.find(obj => { return obj.id == PodId.Id; }) : null;

    // Lấy những Utility của Pod đó
    const AvailableUTILITIes = UTILITIes ? UTILITIes.filter(utility => utility.pods && utility.pods.some(pod => pod.id === Pod.id)) : [];

    // Lấy những Slot của Pod đó
    const AvailableSLOTs = SLOTs ? SLOTs.filter(slot => slot.podId === Pod?.id) : [];

    // Lấy Type của Pod đó
    const thisTYPE = TYPEs ? TYPEs.find(type => type.id === Pod?.typeId) : null;

    // Lấy Store của Pod đó
    const thisSTORE = STOREs ? STOREs.find(store => store.id === Pod?.storeId) : null;



    const [MaxID, setMaxID] = useState(null);
    const [date, setDate] = useState('');
    const [SlotId, setSlotId] = useState('');
    const [Confirm, setConfirm] = useState(false);

    // Lấy Slot được chọn
    const thisSLOT = AvailableSLOTs ? AvailableSLOTs.find(slot => String(slot.id) === SlotId) : null;

    const Booking = async () => {
        const SlotIdInt = parseInt(SlotId, 10);

        if (!MaxID) {
            console.error('Please wait for the system');
            return;
        }
        if (!Pod || !id) {
            console.error('Pod or UserId is not defined');
            return;
        }
        if (date == '' || SlotId == '') {
            console.error('Date or SlotId is not defined');
            return;
        }
        if (Confirm == false) {
            console.error('You have not confirmed yet');
            return;
        }
        
        const bookingData = {
            id: MaxID + 1,
            date: date,
            status: 'Chờ xác nhận',
            feedback: 'null',
            podId: Pod.id,
            slotIds: [SlotIdInt],
            userId: id,
        };
        console.log('Booking data:', bookingData);
        console.log('Confirm status:', Confirm);

        const token = localStorage.getItem('token');
        console.log('Token data:', token);

        try {
            const response = await fetch('https://localhost:7166/api/Booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            setConfirm(false);
            console.log('Booking successful:', result);
        } catch (error) {
            console.error('Error during booking:', error);
        }
    };

    useEffect(() => {
        if (date && SlotId) {
            Booking(date, SlotId);
        }
    }, [Confirm]);

    const [Amount, setAmount] = useState(0);
    const [IsPopupOpen, setIsPopupOpen] = useState(false);
    const [IsQROpen, setIsQROpen] = useState(false);

    const handleBooking = async (e) => {
        e.preventDefault();
        const date = e.target.BookingDate.value;
        const SlotId = e.target.BookingSlot.value;
        setDate(date);
        setSlotId(SlotId);
        setIsPopupOpen(true);

        const fetchMaxBookingId = async () => {
            try {
                const bookingResponse = await fetch('https://localhost:7166/api/Booking');
                if (!bookingResponse.ok) throw new Error('Network response was not ok');
                const bookingData = await bookingResponse.json();
                const MaxID = bookingData.reduce((max, booking) => Math.max(max, booking.id), 0);
                setMaxID(MaxID);
                console.log('Max Booking ID:', MaxID);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };
        await fetchMaxBookingId();
        console.log({ date, SlotId, IsPopupOpen, Confirm });
        window.location.href = '#popupConfirm';
    };

    const handleConfirm = () => {
        setIsQROpen(true)
        setConfirm(true);
        Booking();
    };


    return (

        //[Store] (Id, Name, Address, Contact, Status)
        //[Pod] (Id, Name, Image, Description, Rating, Status, TypeId, StoreId)
        //[Type] (Id, Name, Capacity)
        //[Utility] (Id, Name, Image, Description)
        //[Slot] (Id, Name, StartTime, EndTime, Price, Status, PodId)
        //[Booking] (Id, Date, Status, Feedback, PodId, UserId)

        <div className='POD-booking-pod-detail'>
            <div className='booking-pod-detail-container'>
                {Pod ? (
                    <>
                        <h1><b>{Pod.name}</b></h1>
                        <div className='image-detail'>
                            <div className='image-detail-1'>
                                <img src={single1} alt={Pod.name}></img>
                            </div>
                            <div className='image-detail-2'>
                                <div className='image-detail-2-item'>
                                    <img src={double1} alt={Pod.name}></img>
                                </div>
                                <div className='image-detail-2-item'>
                                    <img src={group1} alt={Pod.name}></img>
                                </div>
                            </div>
                        </div>

                        <div className='detail-container'>
                            <div className='short-detail'>
                                <h5><b>{thisSTORE ? `${thisSTORE.name} / ${thisSTORE.address} / Hotline: ${thisSTORE.contact}` : 'Store not found'}</b></h5>
                                <p>{thisTYPE ? `${thisTYPE.name} / Sức chứa: ${thisTYPE.capacity} người` : 'Type not found'}</p>

                                <div className='favorite'>
                                    <div className='favorite-title'>
                                        <h5><b><i className="fa-solid fa-heart"></i> Yêu thích <i className="fa-solid fa-heart"></i></b></h5>
                                    </div>
                                    <div className='favorite-text'>
                                        <p><b>Khách đánh giá đây là một trong những căn phòng được yêu thích nhất trên InnoSpace</b></p>
                                    </div>
                                    <div className='favorite-rating'>
                                        <h4>{Pod.rating}</h4>
                                        {Array.from({ length: Pod.rating }, (_, index) => (
                                            <span key={index} style={{ color: 'gold', fontSize: '2em' }}>★</span>
                                        ))}
                                    </div>
                                    <p></p>
                                </div>

                                <h5><b>Tiện nghi có sẵn:</b></h5>
                                {AvailableUTILITIes.map((utility) => (
                                    <li key={utility.id}>{utility.name}: {utility.description}</li>
                                ))}
                                <h5><b>Mô tả về POD:</b></h5>
                                <p>{Pod.description}</p>
                            </div>

                            <div className='payment-card'>
                                <Card>
                                    <Card.Body>

                                        <h4><b>Price: {Amount / 1000}.000đ</b></h4>

                                        <Form className='form-card' onSubmit={handleBooking}>
                                            <Form.Group controlId='BookingDate' className='form-group'>
                                                <Form.Control className='input' type='date' onChange={(e) => {
                                                    const selectedDate = e.target.value;
                                                    console.log(selectedDate);
                                                }} />
                                            </Form.Group>

                                            <Form.Group controlId='BookingSlot' className='form-group'>
                                                <Form.Control as='select' onChange={(e) => {
                                                    const selectedSlot = AvailableSLOTs.find(slot => String(slot.id) === e.target.value);
                                                    if (selectedSlot) {
                                                        setAmount(selectedSlot.price);
                                                    } else {
                                                        setAmount(0);
                                                    }
                                                    console.log(e.target.value);
                                                }}>
                                                    <option value=''>[Slot]</option>
                                                    {AvailableSLOTs.map((slot, index) => (
                                                        <option key={index} value={slot.id}>
                                                            {`[${slot.name}] ${slot.startTime}:00 - ${slot.endTime}:00 (${slot.price / 1000}.000đ)`}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>

                                            <a href='#popupConfirm' id='openPopUp'>
                                                <Button type='submit' className='btn'>SELECT</Button>
                                            </a>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>

                        <hr />

                        <div className='big-rating'>
                            <h1><b>{Pod.rating} <span style={{ color: 'gold' }}>★</span></b></h1>
                            <h4>Được khách hàng yêu thích</h4>
                            <h5>Một trong căn phòng nhà được yêu thích nhất trên InnoSpace dựa trên điểm xếp hạng, đánh giá và độ tin cậy</h5>
                        </div>

                        <div>

                        </div>

                    </>
                ) : (
                    <p>Pod not found.</p>
                )}


                {/*
                [Store] (Id, Name, Address, Contact, Status)
                [Pod] (Id, Name, Image, Description, Rating, Status, TypeId, StoreId)
                [Type] (Id, Name, Capacity)
                [Utility] (Id, Name, Image, Description)
                [Slot] (Id, Name, StartTime, EndTime, Price, Status, PodId)
                [Booking] (Id, Date, Status, Feedback, PodId, UserId)
                */}

                {IsPopupOpen && date && SlotId && (
                    <div id='popupConfirm' className='overlay'>
                        <div className='popup'>
                            <div className='confirm-information'>

                                <h2><b>{Pod.name}</b></h2>
                                <img src={single1} alt={Pod.name}></img>
                                {/* <img src={Pod.image} alt={Pod.name}></img> */}

                                <h5><b>{thisSTORE ? `${thisSTORE.name} / ${thisSTORE.address}` : 'Store not found'}</b></h5>

                                <p>{thisTYPE ? `${thisTYPE.name} / Sức chứa: ${thisTYPE.capacity} người` : 'Type not found'}</p>

                                {/* <h5><b>Tiện nghi có sẵn:</b></h5>
                                {AvailableUTILITIes.map((utility) => (
                                    <li key={utility.id}>{utility.name}</li>
                                ))} */}

                                <h5><b>Ngày nhận phòng: {date}</b></h5>
                                {/* <p>SlotId: {SlotId}</p> */}
                                {/* {SlotId.map((slot, index) => (
                                    <option key={index} value={slot.id}>
                                        {`[Slot ${index + 1}] ${slot.startTime}:00 - ${slot.endTime}:00 (${slot.price / 1000}.000đ)`}
                                    </option>
                                ))} */}
                                <p>{`Giờ nhận phòng: [${thisSLOT.name}] ${thisSLOT.startTime}:00 - ${thisSLOT.endTime}:00 (${thisSLOT.price / 1000}.000đ)`}</p>

                                <div className='button-confirm-amount'>
                                    <h3><b>Amount: {Amount / 1000}.000đ</b></h3>
                                    <Button type='submit' className='btn' onClick={handleConfirm}>CONFIRM</Button>
                                </div>

                                <a className='close' href='#' onClick={() => { setIsPopupOpen(false); setIsQROpen(false); }}>&times;</a>
                            </div>
                            <div className='payment-qrcode'>
                                <h1><b>Payment</b></h1>
                                {IsQROpen && (
                                    <img src={double1} alt='QR CODE'></img>
                                )}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
