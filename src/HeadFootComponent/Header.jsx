import React, { Component } from 'react'
import './Header.css';
import { Link } from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <div className='header'>
                <div className='navbar'>
                    <ul>
                        <li className='navbar-brand'>InnoSpace</li>
                    </ul>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/about'>AboutUs</Link></li>
                        <li><Link to='/solution'>Solution</Link></li>
                        <li><Link to='/contact'>Contact</Link></li>
                    </ul>
                    <ul>
                        <li><a href='/'>User</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}
