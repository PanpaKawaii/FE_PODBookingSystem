import React from 'react'

export default function Header() {
  return (
    <div >
    
    <div class="header">
    
      <Link to='/' >Home</Link>
      <Link to={`contact/${orchid.id}`}>Detail</Link>
      <Link to='/new'>New</Link>
      
    </div>
  </div>
)
}
