import React from 'react';
import { useParams } from 'react-router-dom'
import { Orchids } from './Data/ListOfOrchids'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'
// import { useState } from 'react'
import Row from 'react-bootstrap/Row'
import { useContext } from 'react'
import { ThemeContext, ThemeProvider } from './ThemeContext'

const OrchidDetail = () => {
    const { id } = useParams(); // Destructure 'id' from useParams
    const orchid = Orchids.find(obj => obj.id == id); // Find the orchid based on ID
    // const [showVideo, setShowVideo] = useState(false);

    // const handleShowVideo = () => {
    //     setShowVideo(true); // Show video when button is clicked
    // };
    // const closeVideo = () => {
    //     setShowVideo(false);
    // };
    const context = useContext(ThemeContext);
    return (
        <div className={context.theme}>
        <Container >
            <Row className="justify-content-lg-center">
                <Col md="auto">
                    <Card style={{ width: '100%', maxWidth: '50rem' }}>
                        <Card.Img style ={{maxWidth: '30rem', margin: 'auto'}} variant="top" src={orchid.image} alt={orchid.name} />
                        <Card.Body>
                        <h2>{orchid.name}</h2>
                        <p><strong>Rating:</strong> {orchid.rating}</p>
                        <p><strong>Color:</strong> {orchid.color}</p>
                        <p><strong>Origin:</strong> {orchid.origin}</p>
                        <p><strong>Category:</strong> {orchid.category}</p>
                        <p><strong>Description:</strong> {orchid.inf}</p>
                        </Card.Body>
                        {/* <Button variant="secondary" onClick={handleShowVideo}>Video</Button>{' '}
                {showVideo && (
                    <div className="video-container">
                        <iframe
                            className='video'
                            src={orchid.video}
                            title='YouTube video player'
                            frameborder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                            referrerPolicy='strict-origin-when-cross-origin'
                            allowFullScreen>
                        </iframe>
                    </div>
                )} */}
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
    );
};

export default OrchidDetail;
