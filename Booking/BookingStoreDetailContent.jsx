import React from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { STOREs } from '../List/ListOfPods';
import './BookingStoreDetailContent.css';

export default function BookingStoreDetailContent() {
    const StoreId = useParams();
    const store = STOREs.find(obj => {
        return obj.Id == StoreId.Id;
    });
    return (
        <div className='POD-booking-store-detail'>
            <div className='booking-store-detail-container'>
                <h1>{store.PodName}</h1>
                <div className='short-detail'>
                    <p>{store.TypeName} (Capacity: {store.capacity}) / {store.UtilityName} / {store.StoreName}</p>
                    <p style={{ color: 'gold', fontSize: '1.5em' }}>★ {store.rating}</p>
                    <p></p>
                </div>
                <img src={store.img}></img>
                <p>{store.description}</p>
                <Link to={`pod`}><Button>VIEW PODS</Button></Link>
            </div>
        </div>
    )
}
