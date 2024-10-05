import React, { Component } from 'react'
import home from '../../src/PODimage/adminhome.jpg'

export default class Home extends Component {
  render() {
    return (
      <>
        <div 
          className='admin-home'
          style={{ 
            backgroundImage: `url(${home})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh' 
          }}
        >
          <p>Hello</p>
        </div>
      </>
    )
  }
}
