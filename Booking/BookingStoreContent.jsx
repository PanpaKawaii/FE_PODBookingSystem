import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import './BookingStoreContent.css';

export default function BookingStoreContent() {

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

    const [selectedStore, setSelectedStore] = useState('');
    const [storeName, setStoreName] = useState('');

    const filteredResults = STOREs ? STOREs.filter(store =>
        (store.name === selectedStore || !selectedStore) &&
        store.name.toLowerCase().includes(storeName.toLowerCase())
    ) : [];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ selectedStore, storeName });
    };

    return (
        <div className='POD-booking-store'>

            <div className='search-container'>
                <Form className='search' onSubmit={handleSubmit}>

                    <Form.Group controlId='formStore' className='form-group'>
                        <Form.Control as='select' value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)}>
                            <option value=''>[Store]</option>
                            {STOREs && STOREs.map(store => (
                                <option key={store.id} value={store.name}>{store.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formName' className='form-group form-input'>
                        <Form.Control className='input' type='text' placeholder='Store Name' value={storeName} onChange={(e) => setStoreName(e.target.value)} />
                    </Form.Group>

                </Form>

                <hr style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }} />

            </div>

            <div className='booking-store-container'>
                <Row className='image-row'>
                    {filteredResults.length > 0 ? (
                        filteredResults.map((store, index) => (
                            <Col key={store.id} xs={12} sm={12} md={12} lg={6} xl={6} xxl={6} className='image-col'>
                                <Card className='image-card'>
                                    <Link to={`${store.id}`}><img src={store.image} alt={store.name} /></Link>
                                    <Card.Body className='card-body'>
                                        <h4><b>{store.name}</b></h4>
                                        <div className='full-detail'>
                                            <div className='short-detail'>
                                                <p>Address: {store.address}</p>
                                                <p>Contact: {store.contact}</p>
                                            </div>
                                            <div className='active-button'>
                                                <Link to={`${store.id}`}>
                                                    <Button className='btn' style={{ backgroundColor: '#28a745' }}>GO!</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>No stores available.</p>
                    )}
                </Row>
            </div>
        </div>
    )
}
