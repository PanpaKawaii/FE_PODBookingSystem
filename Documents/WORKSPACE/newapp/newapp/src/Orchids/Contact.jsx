import React, { Component } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'


export default function Contact() {
  const context = useContext(ThemeContext);
  return (

    <div className={context.theme}>
      <div className='contact-container'>
        <div className='contact-content'>
          <p className='contact-title'>Liên hệ với chúng tôi</p>
          <p className='text-contact'>Hãy điền vào biểu mẫu bên dưới và chúng tôi sẽ liên hệ để tìm hiểu thêm về sản phẩm và dịch vụ của chúng tôi!</p>
          <FloatingLabel controlId="floatingInput" label="First Name" className="mb-3">
            <Form.Control type="Fname" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Last Name" className="mb-3">
            <Form.Control type="Lname" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
            <Form.Control type="email" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Phone number" className="mb-3">
            <Form.Control type="phone" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Comments">
            <Form.Control
              as="textarea"
              
              style={{ height: '100px' }}
            />
          </FloatingLabel>
          <Card.Footer className="text-center">
            <Button className='contact-button' variant="secondary">Submit</Button>
          </Card.Footer>

        </div>
      </div>
    </div>


  )

}

