import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './BookingStoreDetailContent.css';

import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Icon } from 'react-materialize';

export default function BookingStoreDetailContent() {

    const [STOREs, setSTOREs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
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
    
    const StoreId = useParams();
    const Store = STOREs ? STOREs.find(obj => {
        return obj.id == StoreId.Id;
    }) : null;

    return (
        <div className='POD-booking-store-detail'>
            <div className='booking-store-detail-container'>
                {Store ? (
                    <>
                        <h1>{Store.name}</h1>
                        <div className='short-detail'>
                            <p>{Store.name} / {Store.contact} / {Store.address}</p>
                            <p style={{ color: 'gold', fontSize: '1.5em' }}>★ {Store.rating}</p>
                            <p></p>
                        </div>
                        <img src={Store.image} alt={Store.name}></img>
                        <p>{Store.description}</p>
                        <Link to={`pod`}>
                            <Button>VIEW PODS</Button>
                        </Link>
                    </>
                ) : (
                    <p>Store not found.</p>
                )}
            </div>
        </div>
    )
}
