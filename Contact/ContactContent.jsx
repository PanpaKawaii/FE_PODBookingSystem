import React from 'react'
import { Form, Button } from 'react-bootstrap';
import './ContactContent.css'

import service from '../BackgroundImage/service.jpg'

export default function ContactContent() {
    return (
        <div className='POD-contact'>
            <div className='contact-container'>

                <div className='service'>
                    <h3><b>CHÚNG TÔI SẴN SÀNG</b></h3>
                    <h3><b>LẮNG NGHE BẠN!</b></h3>
                    <img src={service} alt='service' />
                </div>

                <Form className='contact-us'>
                    <h1>CONTACT US</h1>
                    <Form.Text><p>InnoSpace luôn sẵn sàng lắng nghe câu hỏi và ý kiến đóng góp từ bạn!</p></Form.Text>
                    <Form.Text><p>Chúng tôi sẽ phản hồi ngay trong 24h tiếp theo!</p></Form.Text>

                    <Form.Group controlId='formName'>
                        <Form.Control className='input' type='text' placeholder='Name' />
                    </Form.Group>

                    <Form.Group controlId='formEmail'>
                        <Form.Control className='input' type='text' placeholder='Email' />
                    </Form.Group>

                    <Form.Group controlId='formPhoneNumber'>
                        <Form.Control className='input' type='text' placeholder='Phone Number' />
                    </Form.Group>

                    <Form.Group controlId='formYourProblem'>
                        <Form.Control className='input' type='text' placeholder='Your Problem' />
                    </Form.Group>
                    <Button className='btn'>SUBMIT</Button>
                </Form>
            </div>
        </div>
    )
}

