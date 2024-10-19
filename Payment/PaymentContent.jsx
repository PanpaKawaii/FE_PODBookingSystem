import React from 'react'
import { Button } from 'react-bootstrap';
import './PaymentContent.css';

export default function PaymentContent() {
    return (
        <div className='POD-booking-payment'>
            <div className='booking-payment-container'>
                <h1>Cost: $999</h1>
                <Button>Purchase</Button>
            </div>
        </div>
    )
}
