import React, { Component } from 'react'

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
                        <li><Link to='/manage'>Manage</Link></li>
                    </ul>
                    <ul>
                        <li><Link to='/'>Admin</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}
