import React, { Component } from 'react'
import './Header.css';

export default class Header extends Component {
    render() {
        return (
            <div className='header'>
                <div className="navbar">
                    <ul>
                        <li className="navbar-brand">POD logo</li>
                    </ul>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/solution">Solution</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}
