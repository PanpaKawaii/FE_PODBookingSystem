import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './BookingPodDetailContent.css';

import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Icon } from 'react-materialize';

export default function BookingPodDetailContent() {

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

    const PodId = useParams();
    const Pod = PODs ? PODs.find(obj => {
        return obj.id == PodId.Id;
    }) : null;

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

    return (
        <div className='POD-booking-pod-detail'>
            <div className='booking-pod-detail-container'>
                {Pod ? (
                    <>
                        <h1>{Pod.name}</h1>
                        <div className='short-detail'>
                            <p>{getTypeName(Pod.id)} (Capacity: {getPodCapacity(Pod.id)}) / {Pod.utilityId} / {Pod.name}</p>
                            <p style={{ color: 'gold', fontSize: '1.5em' }}>★ {Pod.rating}</p>
                            <p></p>
                        </div>
                        <img src={Pod.img}></img>
                        <p>{Pod.description}</p>
                    </>
                ) : (
                    <p>Pod not found.</p>
                )}
                <Form className=''>

                    <Form.Group controlId='formDate' className='form-group'>
                        <Form.Control as='select'>
                            <option value=''>[Date]</option>
                            <option value='date1'>[Date 1]</option>
                            <option value='date2'>[Date 2]</option>
                            <option value='date3'>[Date 3]</option>
                            <option value='date4'>[Date 4]</option>
                            <option value='date5'>[Date 5]</option>
                            <option value='date6'>[Date 6]</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formSlot' className='form-group'>
                        <Form.Control as='select'>
                            <option value=''>[Slot]</option>
                            <option value='slot1'>[Slot 1] 7:00 - 9:00</option>
                            <option value='slot2'>[Slot 2] 10:00 - 12:00</option>
                            <option value='slot3'>[Slot 3] 13:00 - 15:00</option>
                            <option value='slot4'>[Slot 4] 16:00 - 18:00</option>
                            <option value='slot5'>[Slot 5] 19:00 - 21:00</option>
                            <option value='slot6'>[Slot 6] 22:00 - 24:00</option>
                        </Form.Control>
                    </Form.Group>

                    <Link to={`payment`}><Button className='submit'>Select</Button></Link>
                </Form>
            </div>
        </div>
    )
}
