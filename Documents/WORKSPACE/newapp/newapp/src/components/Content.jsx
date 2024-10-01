import React, { Component } from 'react';

import {Players} from 'C:/Users/admin/Documents/WORKSPACE/newapp/newapp/src/components/Shared/Players.js';
export default class Content extends Component {
  render() {
    return (
      <div>
        <div className='container'>
        {Players.map((player)=>(
           <div className='column'>
           <div className='card'>
           <img src={player.img}/>
             <h3>{player.name}</h3>
             <p className='title'>{player.club}</p>
             <p><button>Detail</button></p>
           </div>
         </div>
        ))}
    </div>

      </div>
    );
  }
}

