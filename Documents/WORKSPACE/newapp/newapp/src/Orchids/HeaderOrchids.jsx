import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { useContext } from 'react';
import { ThemeContext, ThemeProvider } from './ThemeContext';

export default function HeaderOrchids() {
  const context = useContext(ThemeContext);
  return (
    <div >

      {/* <div className='header'>
          <Link to='/' >Home</Link>
          <Link to='/contact' >Contact</Link>
          <Link to='/new' >New</Link>
          <Link to='/about' >About</Link>
        </div> */}
      <ThemeProvider>
        <Navbar className='header' bg="dark" data-bs-theme="dark">
          <Container>
            <Nav className="me-auto logo">
              <Navbar.Brand as={Link} to="/">Orchid</Navbar.Brand>
            </Nav>
            <Nav className="me-auto page">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              <Nav.Link as={Link} to="/new">New</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/natural">Special</Nav.Link>
            </Nav>
            <Nav className="button">
              <Button variant="secondary" onClick={context.toggleTheme} >{context.theme}</Button>
            </Nav>
          
        </Container>
      </Navbar>
    </ThemeProvider>
    </div >
  )

}


