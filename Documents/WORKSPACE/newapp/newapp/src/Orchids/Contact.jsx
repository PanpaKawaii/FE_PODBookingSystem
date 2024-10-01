import React, { Component } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
// import './Contact.css'
import 'bootstrap/dist/css/bootstrap.min.css';
export default class Contact extends Component {
  render() {
    return (
      <>
      
        <Card border="light"  className='contact-form' style={{ width: '50%' }}>
          <Card.Body>
            <Card.Title>Liên hệ với chúng tôi</Card.Title>

            <p className='text-contact'>Hãy điền vào biểu mẫu bên dưới và chúng tôi sẽ liên hệ để tìm hiểu thêm về sản phẩm và dịch vụ của chúng tôi!</p>
            <FloatingLabel controlId="floatingInput" label="Fullname" className="mb-3">
              <Form.Control type="name" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
              <Form.Control type="email" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Phone number" className="mb-3">
              <Form.Control type="phone" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingTextarea2" label="Comments">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
              />
            </FloatingLabel>
            <Card.Footer className="text-center">
            <Button variant="primary">Submit</Button>
            </Card.Footer>
            
          </Card.Body>

        </Card>

      </>
    )
  }
}

