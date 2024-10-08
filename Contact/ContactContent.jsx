import React from 'react'
import './ContactContent.css'

import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import service from '../imagePOD/service.jpg'

export default function ContactContent() {
  return (
    <div className='POD-contact'>
      <div className='contact-container'>

        <div className='service'>
          <h3>CHÚNG TÔI SẴN SÀNG</h3>
          <h3>LẮNG NGHE BẠN!</h3>
          <img src={service} alt='service' />
        </div>

        <Form className='contact-us'>
          <h1>CONTACT US</h1>
          <Form.Text><p>InnoSpace always appreciate all the opinions from you!</p></Form.Text>
          <Form.Text><p>We will reply in the nearest 24 hours!</p></Form.Text>

          <Form.Group controlId='formBasicName'>
            <Form.Control className='input' type='text' placeholder='Name' />
          </Form.Group>

          <Form.Group controlId='formBasicEmail'>
            <Form.Control className='input' type='text' placeholder='Email' />
          </Form.Group>

          <Form.Group controlId='formBasicPhoneNumber'>
            <Form.Control className='input' type='text' placeholder='Phone Number' />
          </Form.Group>

          <Form.Group controlId='formBasicYourProblem'>
            <Form.Control className='input' type='text' placeholder='Your Problem' />
          </Form.Group>
          <Button className='submit'>SUBMIT</Button>
        </Form>
      </div>

      <div className='inform'>
        <h4>Company Information</h4>
        <div>
          <p>Address: 30/24/05, Phuong 7, Quan Phu Nhuan, TP.HCM</p>
          <p>Email: info@innospace.com</p>
          <p>Hotline: 0123456789</p>
        </div>
      </div>

    </div>
  )
}

