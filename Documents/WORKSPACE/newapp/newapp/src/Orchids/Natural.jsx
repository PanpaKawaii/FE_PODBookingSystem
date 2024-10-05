import React from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Orchids } from './Data/ListOfOrchids'
import { useContext } from 'react'
import { ThemeContext, ThemeProvider } from './ThemeContext'

export default function Natural() {
    // Lọc ra những orchid có isSpecial=true
    const specialOrchids = Orchids.filter(orchid => orchid.isSpecial === true)
    const context = useContext(ThemeContext)
    return (
        <ThemeProvider>
            <div className={context.theme}>
                <div className='container-card'>
                    <h1>Special Orchids</h1>
                    <Row xs={1} sm={2} md={3} lg={4} className="g-5">
                        {specialOrchids.map((orchid, index) => (
                            <Col key={index}>
                                <Card style={{ maxwidth: '100%', maxWidth: '17rem' }}>
                                    <Card.Img className='home-img' variant="top" src={orchid.image} alt={orchid.name} />
                                    <Card.Body>
                                        <Card.Title>{orchid.id}. {orchid.name}</Card.Title>
                                        <div>Rating: {orchid.rating}</div>
                                        <div>Color: {orchid.color}</div>
                                        <div>Origin: {orchid.origin}</div>
                                        <div>Category: {orchid.category}</div>
                                        {orchid.isSpecial && <div className='special'>Special</div>}
                                    </Card.Body>
                                    {/* <Card.Footer className="text-center">
                                <Button variant="primary">Learn More</Button>
                            </Card.Footer> */}
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </ThemeProvider>
    );
}
