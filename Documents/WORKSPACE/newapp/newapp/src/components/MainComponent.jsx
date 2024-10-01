import React, { Component } from 'react'
import { Players } from './Shared/Players'
import ContentPre from './ContentPre'

export default class MainComponent extends Component {
    constructor(){
        super()
        this.state={
            players: Players
        }
    }
  render() {
    return (
      <div>
            <ContentPre playerData={this.state.players}/>
      </div>
    )
  }
}
