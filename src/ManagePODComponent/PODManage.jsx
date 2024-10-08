import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import POD from '../Admin_image/adminhome.jpg'

export default function PODManage() {
  return (
  <>

<Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-5">
      {Array.from({ length: 12 }).map((_, idx) => (
        <Col key={idx}>
          <Card 
          style={{ maxwidth: '18rem' }}
          >
            <Card.Img variant="top" src= {POD} />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </>
  )
}
