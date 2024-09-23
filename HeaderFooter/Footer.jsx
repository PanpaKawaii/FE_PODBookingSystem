import React, { Component } from 'react'
import './Footer.css';

export default class Footer extends Component {
    render() {
        return (
            <div className='footer'>
                <div className='container-footer'>
                    <div className="logo">
                        <p>POD logo</p>
                    </div>
                    <div className="location">
                        <h3>Location</h3>
                        <p>Gmail: trieudnhse180392@fpt.edu.vn</p>
                        <p>ID: SE180392</p>
                        <p>Class: SE1868</p>
                    </div>
                    <div className="contact">
                        <h3>Contact Us</h3>
                        <input type="text" placeholder="Email">
                        </input>
                        <input type="text" placeholder="Phone Number">
                        </input>
                        <button>Submit</button>
                    </div>
                </div>
                <div className="something">
                    bla bla bla
                </div>
            </div>
        )
    }
}
