import React from 'react'
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import './SignInSignUp.css';

import Yellow from './YellowBanana.jpg'
import Blue from './BlueBanana.jpg'

export default function SignInSignUp() {

    const moveImage = () => {
        const img = document.getElementById('movingImage');
        img.style.marginRight = '50%';
        img.style.background = `url(${Blue}) center`;

        const signin = document.getElementById('card-signin');
        signin.classList.remove('card-appear');
        signin.classList.add('card-disappear');
        const signup = document.getElementById('card-signup');
        signup.classList.remove('card-disappear');
        signup.classList.add('card-appear');
    }

    const moveImageBack = () => {
        const img = document.getElementById('movingImage');
        img.style.marginRight = '0%';
        img.style.background = `url(${Yellow}) center`;

        const signin = document.getElementById('card-signin');
        signin.classList.remove('card-disappear');
        signin.classList.add('card-appear');
        const signup = document.getElementById('card-signup');
        signup.classList.remove('card-appear');
        signup.classList.add('card-disappear');
    }

    const resetInputsBox1 = () => {
        var inputs = document.querySelectorAll('.form-box1 input');
        inputs.forEach(function (input) {
            input.value = '';
        });
    }

    const resetInputsBox2 = () => {
        var inputs = document.querySelectorAll('.form-box2 input');
        inputs.forEach(function (input) {
            if (!input.readOnly) {
                input.value = '';
            }
        });
    }


    const [SignInEmail, setSignInEmail] = useState('');
    const [SignInPassword, setSignInPassword] = useState('');

    const [SignUpEmail, setSignUpEmail] = useState('');
    const [SignUpFullName, setSignUpFullName] = useState('');
    const [SignUpPhoneNumber, setSignUpPhoneNumber] = useState('');
    const [SignUpPassword, setSignUpPassword] = useState('');
    const [SignUpConfirm, setSignUpConfirm] = useState('');

    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const Login = async (SignInEmail, SignInPassword) => {
        try {
            const response = await fetch('https://localhost:7166/api/Login/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: SignInEmail, password: SignInPassword }),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setToken(data.token);
            setLoading(false);

            localStorage.removeItem('token');
            localStorage.setItem('token', data.token);
            localStorage.removeItem('UserId');
            localStorage.setItem('UserId', data.id);

            if (data.role && data.role === 'User') {
                window.location.href = 'http://localhost:5173/user/information';
            }
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const SignUp = async (SignUpEmail, SignUpFullName, SignUpPhoneNumber, SignUpPassword, SignUpConfirm) => {

        if (!SignUpEmail || !SignUpFullName || !SignUpPhoneNumber || !SignUpPassword || !SignUpConfirm) {
            console.error('Invalid value');
            return;
        }
        if (!/^\d+$/.test(SignUpPhoneNumber)) {
            console.error('Phone number must contain only digits');
            return;
        }
        if (SignUpPhoneNumber.length !== 10) {
            console.error('Phone number must contain exactly 10 digits');
            return;
        }
        if (SignUpPassword.length < 6) {
            console.error('Password must be at least 6 characters long');
            return;
        }
        if (SignUpPassword != SignUpConfirm) {
            console.error('Wrong confirm password');
            return;
        }

        const signupData = {
            id: 17,
            email: SignUpEmail,
            password: SignUpConfirm,
            name: SignUpFullName,
            image: '',
            role: 'User',
            type: 'Regular',
            phoneNumber: SignUpPhoneNumber,
            point: 0,
            description: 'Khách hàng mới',
        };
        console.log('Sign Up Data:', signupData);

        try {
            const response = await fetch('https://localhost:7166/api/User', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setLoading(false);

            if (data.role && data.role === 'User') {
                window.location.href = 'http://localhost:5173/signinsignup';
            }
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (SignInEmail && SignInPassword) {
            Login(SignInEmail, SignInPassword);
        }
    }, [SignInEmail, SignInPassword]);

    useEffect(() => {
        if (SignUpEmail && SignUpFullName && SignUpPhoneNumber && SignUpPassword && SignUpConfirm) {
            SignUp(SignUpEmail, SignUpFullName, SignUpPhoneNumber, SignUpPassword, SignUpConfirm);
        }
    }, [SignUpEmail, SignUpFullName, SignUpPhoneNumber, SignUpPassword, SignUpConfirm]);


    const handleSubmitSignIn = (e) => {
        e.preventDefault();
        const SignInEmail = e.target.SignInEmail.value;
        const SignInPassword = e.target.SignInPassword.value;
        setSignInEmail(SignInEmail);
        setSignInPassword(SignInPassword);
        Login(SignInEmail, SignInPassword);
        console.log({ SignInEmail, SignInPassword });
    };

    const handleSubmitSignUp = (e) => {
        e.preventDefault();
        const SignUpEmail = e.target.SignUpEmail.value;
        const SignUpFullName = e.target.SignUpFullName.value;
        const SignUpPhoneNumber = e.target.SignUpPhoneNumber.value;
        const SignUpPassword = e.target.SignUpPassword.value;
        const SignUpConfirm = e.target.SignUpConfirm.value;
        console.log({ SignUpEmail, SignUpFullName, SignUpPhoneNumber, SignUpPassword, SignUpConfirm });
        SignUp(SignUpEmail, SignUpFullName, SignUpPhoneNumber, SignUpPassword, SignUpConfirm);
    };

    // npm install nodemailer
    // const nodemailer = require('nodemailer');

    // // Tạo transporter
    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'your_email@gmail.com', // Email của bạn
    //         pass: 'your_password' // Mật khẩu của bạn hoặc mật khẩu ứng dụng
    //     }
    // });

    // // Cấu hình email
    // const mailOptions = {
    //     from: 'your_email@gmail.com', // Địa chỉ email gửi
    //     to: 'abc@gmail.com', // Địa chỉ email nhận
    //     subject: 'Test Email', // Tiêu đề email
    //     text: 'ThisContent' // Nội dung email
    // };

    // // Gửi email
    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log('Error:', error);
    //     } else {
    //         console.log('Email sent:', info.response);
    //     }
    // });

    return (
        <div className='POD-signin-signup'>
            <div className='signin-signup-container'>
                <div className='card-box'>

                    <div className='card-body card-appear' id='card-signin'>
                        <h1 className='title'>Sign In</h1>
                        <Form className='form-box form-box1' onSubmit={handleSubmitSignIn}>
                            <Form.Group controlId='SignInEmail' className='form-group form-input'>
                                <span className='icon'><i className='fa-solid fa-user' style={{ fontSize: '25px' }}></i></span>
                                <Form.Control className='input' type='email' placeholder='Email' required />
                            </Form.Group>
                            <Form.Group controlId='SignInPassword' className='form-group form-input'>
                                <span className='icon'><i className='fa-solid fa-key' style={{ fontSize: '25px' }}></i></span>
                                <Form.Control className='input' type='password' placeholder='Password' required />
                            </Form.Group>
                            <a href='#' className='forget-link'><b>Forget Password?</b></a>
                            <div className='btn-box'>
                                <Button type='reset' className='btn' onClick={resetInputsBox1}>CLEAR</Button>
                                <Button type='submit' className='btn' >LOGIN</Button>
                            </div>
                            <hr />
                            <Button id='signup' className='btn btn-signup' onClick={moveImage}>SIGN UP</Button>
                        </Form>
                    </div>

                    <div className='card-body card-disappear' id='card-signup'>
                        <h1 className='title'>Sign Up</h1>
                        <Form className='form-box form-box2' onSubmit={handleSubmitSignUp}>
                            <Form.Group controlId='SignUpEmail' className='form-group form-input'>
                                <span className='icon'><i className='fa-solid fa-user' style={{ fontSize: '25px' }}></i></span>
                                <Form.Control className='input' type='email' placeholder='Email' />
                            </Form.Group>
                            <Form.Group controlId='SignUpFullName' className='form-group form-input'>
                                <span className='icon'><i className='fa-solid fa-user' style={{ fontSize: '25px' }}></i></span>
                                <Form.Control className='input' type='text' placeholder='Full Name' />
                            </Form.Group>
                            <Form.Group controlId='SignUpPhoneNumber' className='form-group form-input'>
                                <span className='icon'><i className='fa-solid fa-user' style={{ fontSize: '25px' }}></i></span>
                                <Form.Control className='input' type='text' placeholder='Phone Number' />
                            </Form.Group>
                            <Form.Group controlId='SignUpPassword' className='form-group form-input'>
                                <span className='icon'><i className='fa-solid fa-key' style={{ fontSize: '25px' }}></i></span>
                                <Form.Control className='input' type='password' placeholder='Password' />
                            </Form.Group>
                            <Form.Group controlId='SignUpConfirm' className='form-group form-input'>
                                <span className='icon'><i className='fa-solid fa-key' style={{ fontSize: '25px' }}></i></span>
                                <Form.Control className='input' type='password' placeholder='Confirm' required />
                            </Form.Group>
                            <div className='btn-box'>
                                <Button type='reset' className='btn' onClick={resetInputsBox2}>CLEAR</Button>
                                <Button type='submit' className='btn'>CREATE</Button>
                            </div>
                            <hr />
                            <Button id='login' className='btn btn-already' onClick={moveImageBack}>I ALREADY HAVE AN ACCOUNT</Button>
                        </Form>
                    </div>

                    <div className='movingImage' id='movingImage'></div>

                </div>
            </div>
        </div>
    )
}
