import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import './SignInSignUp.css';

import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Icon } from 'react-materialize';

export default class SignInSignUp extends Component {

    moveImage = () => {
        const img = document.getElementById('movingImg');
        img.classList.remove('img-left') //Add if unavailable, remove if available
        img.classList.add('img-right') //Add if unavailable, remove if available
        img.style.marginRight = '50%';
        // document.querySelector('.content').style.backgroundColor = '#b4b7fa';
        const cardsignin = document.getElementById('card-signin');
        cardsignin.classList.remove('card-appear')
        cardsignin.classList.add('card-disappear')
        const cardsignup = document.getElementById('card-signup');
        cardsignup.classList.remove('card-disappear')
        cardsignup.classList.add('card-appear')
    }

    moveImageBack = () => {
        const img = document.getElementById('movingImg');
        img.classList.remove('img-right') //Add if unavailable, remove if available
        img.classList.add('img-left') //Add if unavailable, remove if available
        img.style.marginRight = '0%';
        // document.querySelector('.content').style.backgroundColor = '#ffffb0';
        const cardsignin = document.getElementById('card-signin');
        cardsignin.classList.remove('card-disappear')
        cardsignin.classList.add('card-appear')
        const cardsignup = document.getElementById('card-signup');
        cardsignup.classList.remove('card-appear')
        cardsignup.classList.add('card-disappear')
    }

    resetInputsBox1 = () => {
        var inputs = document.querySelectorAll('.form-box1 input');
        inputs.forEach(function (input) {
            input.value = '';
        });
    }

    resetInputsBox2 = () => {
        var inputs = document.querySelectorAll('.form-box2 input');
        inputs.forEach(function (input) {
            if (!input.readOnly) {
                input.value = '';
            }
        });
    }

    render() {
        return (
            <div className='POD-signin-signup'>
                <div className='signin-signup-container'>
                    <div className='card-box'>
                        
                        <div className='card-body card-appear' id='card-signin'>
                            <h1 className='title'>Sign In</h1>
                            <div className='form-box form-box1'>
                                <div className='form-input'>
                                    <span className='icon'><Icon>person</Icon></span>
                                    <input type='text' placeholder='UserID' required />
                                </div>
                                <div className='form-input'>
                                    <span className='icon'><Icon>key</Icon></span>
                                    <input type='password' placeholder='Password' required />
                                </div>
                                <a href='#' className='forget-link'>Forget Password?</a>
                                <div className='btn-box'>
                                    <Button type='reset' className='btn' onClick={this.resetInputsBox1}>CLEAR</Button>
                                    <Button type='submit' className='btn'>LOGIN</Button>
                                </div>
                                <hr />
                                <Button id='signup' className='btn btn-signup' onClick={this.moveImage}>SIGN UP</Button>
                            </div>
                        </div>

                        <div className='card-body card-disappear' id='card-signup'>
                            <h1 className='title'>Sign Up</h1>
                            <div className='form-box form-box2'>
                                <div className='form-input'>
                                    <span className='icon'><Icon>person</Icon></span>
                                    <input type='text' placeholder='UserID' required />
                                </div>
                                <div className='form-input'>
                                    <span className='icon'><Icon>person</Icon></span>
                                    <input type='text' placeholder='Full Name' required />
                                </div>
                                <div className='form-input'>
                                    <span className='icon'><Icon>person</Icon></span>
                                    <input type='text' placeholder='Role' value='User' readOnly />
                                </div>
                                <div className='form-input'>
                                    <span className='icon'><Icon>key</Icon></span>
                                    <input type='password' placeholder='Password' required />
                                </div>
                                <div className='form-input'>
                                    <span className='icon'><Icon>key</Icon></span>
                                    <input type='password' placeholder='Confirm' required />
                                </div>
                                <div className='btn-box'>
                                    <Button type='reset' className='btn' onClick={this.resetInputsBox2}>CLEAR</Button>
                                    <Button type='submit' className='btn'>CREATE</Button>
                                </div>
                                <hr />
                                <Button id='login' className='btn btn-already' onClick={this.moveImageBack}>I ALREADY HAVE AN ACCOUNT</Button>
                            </div>
                        </div>

                        <div className='img-left' id='movingImg'></div>

                    </div>
                </div>
            </div>
        )
    }
}
