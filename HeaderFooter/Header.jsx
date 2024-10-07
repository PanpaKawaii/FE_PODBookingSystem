import React from 'react'
import { Link } from 'react-router-dom';
import './Header.css';

import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Navbar, Icon } from 'react-materialize';

export default function Header() {
    return (
        <div className='header'>
            <Navbar className='menu'
                alignLinks='right'
                brand={<Link to='/' className='brand-logo'><span>InnoSpace</span></Link>}
                id='orchids-nav'
                menuIcon={<Icon>menu</Icon>}>
                <ul>
                    <li><Link to='/'><Icon left>home</Icon>Home</Link></li>
                    <li><Link to='/about'><Icon left>info_outline</Icon>About</Link></li>
                    <li><Link to='/solution'><Icon left>dvr</Icon>Solution</Link></li>
                    <li><Link to='/contact'><Icon left>contacts</Icon>Contact</Link></li>
                    <li><Link to='/user/information'><Icon style={{ fontSize: '50px' }}>account_circle</Icon></Link></li>
                </ul>
            </Navbar>
        </div>
    )
}
