import React from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { PODs } from '../List/ListOfPods';
import './BookingPodDetailContent.css';

export default function BookingPodDetailContent() {
    const PodId = useParams();
    const pod = PODs.find(obj => {
        return obj.Id == PodId.Id;
    });
    return (
        <div className='POD-booking-pod-detail'>
            <div className='booking-pod-detail-container'>
                <h1>{pod.PodName}</h1>
                <div className='short-detail'>
                    <p>{pod.TypeName} (Capacity: {pod.capacity}) / {pod.UtilityName} / {pod.StoreName}</p>
                    <p style={{ color: 'gold', fontSize: '1.5em' }}>★ {pod.rating}</p>
                    <p></p>
                </div>
                <img src={pod.img}></img>
                <p>{pod.description}</p>
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
