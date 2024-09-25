import React, { Component } from 'react'

export default class HeaderUs extends Component {
  render() {
    return (
      <div className='header'>
        <a href="/home">Home</a>
        <a href="/about">About</a>
        <a href="/solution">Solution</a>
        <a href="/contact">Contact</a>
      </div>
    )
  }
}
