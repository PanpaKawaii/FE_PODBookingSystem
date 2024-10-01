import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class HeaderOrchids extends Component {
  render() {
    return (
      <div >

        <div className='header'>
          <Link to='/' >Home</Link>
          <Link to='/contact' >Contact</Link>
          <Link to='/new' >New</Link>
          <Link to='/about' >About</Link>
        </div>

        {/* <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
              <Nav.Link href="/new">New</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
          </Container>
        </Navbar> */}

      </div>
    )
  }
}


