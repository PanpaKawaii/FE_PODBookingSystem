import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useContext } from 'react'
import { ThemeContext, ThemeProvider } from './ThemeContext'
import { Link } from 'react-router-dom'

export default function PresentationOrchids({ orchidsData }) {
    const context = useContext(ThemeContext)
    const [showPopup, setShowPopup] = useState(false)
    const [selectedOrchid, setSelectedOrchid] = useState(null)


    const openPopup = (orchid) => {
        setSelectedOrchid(orchid);
        setShowPopup(true);
        document.documentElement.style.overflow = 'hidden';
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedOrchid(null);
        document.documentElement.style.overflow = 'auto';
    };


    return (

        < >
            <ThemeProvider>

                <div className={context.theme}>
                    <div className='container-card' >
                        <Row xs={1} sm={2} md={3} lg={4} className="g-5">
                            {orchidsData.map((orchid, index) => (
                                <Col key={index}>
                                    <Card style={{ maxwidth: '100%', maxWidth: '17rem' }}>
                                        <Card.Img className='home-img' variant="top" src={orchid.image} alt={orchid.name} />
                                        <Card.Body>
                                            <Card.Title>{orchid.id}. {orchid.name}</Card.Title>
                                            <div>Rating: {orchid.rating}</div>
                                            <div>Color: {orchid.color}</div>
                                            <div>Origin: {orchid.origin}</div>
                                            <div>Category: {orchid.category}</div>
                                            {orchid.isSpecial ? <div className='special'>Special</div> : <div className='not-special'>Not Special</div>}
                                            <Card.Footer className="text-center">
                                                <Button variant="secondary" onClick={() => openPopup(orchid)}>Open</Button>{' '}
                                                <Link to={`orchid/${orchid.id}`}>
                                                    <Button variant="secondary">Detail</Button>{' '}
                                                </Link>
                                            </Card.Footer>

                                        </Card.Body>

                                    </Card>
                                </Col>

                            ))}
                        </Row>

                        {showPopup && ( // Hiển thị pop-up nếu showPopup là true
                            <div className="modal-overlay">

                                <span className="close-button" onClick={closePopup}>&times;</span>
                                {selectedOrchid && ( // Hiển thị thông tin hoa lan được chọn
                                    <Card style={{ width: '100%', maxWidth: '18rem' }}>
                                        <Card.Img variant="top" src={selectedOrchid.image} alt={selectedOrchid.name} />
                                        <Card.Body>
                                        <Card.Title>{selectedOrchid.id}. {selectedOrchid.name}</Card.Title>
                                        <Card.Text>{selectedOrchid.inf}</Card.Text>
                                        </Card.Body>
                                        <Modal.Footer >
                                            <Button variant="secondary" onClick={closePopup} >Close</Button>{' '}
                                        </Modal.Footer>



                                    </Card>
                                )}

                            </div>
                        )}
                    </div>
                </div>
            </ThemeProvider>
        </>
    );

}

