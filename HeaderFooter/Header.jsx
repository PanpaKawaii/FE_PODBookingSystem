import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

// import { Navbar } from 'react-materialize';
// import { Navbar, Nav } from 'react-bootstrap';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Header() {

    const [id, setId] = useState(null);
    const UserId = localStorage.getItem('UserId');
    useEffect(() => {
        const UserIdInt = parseInt(UserId, 10);
        setId(UserIdInt);
    }, [UserId]);

    return (
        <div className='user-header'>
            {/* <Navbar className='menu'
                alignLinks='right'
                brand={<Link to='/' className='brand-logo'><span>InnoSpace</span></Link>}
                id='orchids-nav'
                menuIcon={<i class='fa-solid fa-bars'></i>}>
                <ul className='links'>
                    <li><Link to='/'><i class='fa-solid fa-house'></i> Home</Link></li>
                    <li><Link to='/about'><i class='fa-solid fa-circle-info'></i> About</Link></li>
                    <li><Link to='/booking/store'><i class='fa-solid fa-list'></i> Booking</Link></li>
                    <li><Link to='/contact'><i class='fa-regular fa-address-card'></i> Contact</Link></li>
                    <li><Link to='/user/information'><i class='fa-solid fa-circle-user' style={{ fontSize: '50px' }}></i></Link></li>
                    <li><Link to='/signinsignup'><i class='fa-solid fa-circle-user' style={{ fontSize: '30px' }}></i></Link></li>
                </ul>
            </Navbar> */}
            {/* <Navbar
                expand='lg'
                className='menu'>
                <Navbar.Brand><Link to='/' className='brandlogo'><span>InnoSpace</span></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>
                        <Nav.Link><Link to='/'><i class='fa-solid fa-house'></i> Home</Link></Nav.Link>
                        <Nav.Link><Link to='/about'><i class='fa-solid fa-circle-info'></i> About</Link></Nav.Link>
                        <Nav.Link><Link to='/booking/store'><i class='fa-solid fa-list'></i> Booking</Link></Nav.Link>
                        <Nav.Link><Link to='/contact'><i class='fa-regular fa-address-card'></i> Contact</Link></Nav.Link>
                        <Nav.Link><Link to='/user/information'><i class='fa-solid fa-circle-user' style={{ fontSize: '50px' }}></i></Link></Nav.Link>
                        <Nav.Link><Link to='/signinsignup'><i class='fa-solid fa-circle-user' style={{ fontSize: '30px' }}></i></Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar> */}

            <AppBar className='menu' position='static'>
                <Toolbar>
                    <Typography variant='h4' component='div' sx={{ flexGrow: 1 }}>
                        <Link to='/' className='brandlogo'>InnoSpace</Link>
                    </Typography>
                    <Link to='/'><><i className='fa-solid fa-house'></i> Home</></Link>
                    <Link to='/about'><><i className='fa-solid fa-circle-info'></i> About</></Link>
                    <Link to='/booking/store'><><i className='fa-solid fa-list'></i> Booking</></Link>
                    <Link to='/contact'><><i className='fa-regular fa-address-card'></i> Contact</></Link>

                    {isNaN(id) ?
                        (<Link to='/signinsignup'><><i className='fa-solid fa-circle-user' style={{ fontSize: '50px' }}></i></></Link>)
                        : (<Link to='/user/information'><><i className='fa-solid fa-circle-user' style={{ fontSize: '50px' }}></i></></Link>)
                    }
                </Toolbar>
            </AppBar>

        </div>
    )
}
