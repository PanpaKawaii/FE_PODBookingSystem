import React, { Component } from 'react'
import { Orchids } from './Data/ListOfOrchids'
import PresentationOrchids from './PresentationOrchids'

export default class MainComponentOrchids extends Component {
    constructor(){
        super()
        this.state={
            orchids: Orchids
        }
    }
  render() {
    return (
      <div>
            <PresentationOrchids orchidsData={this.state.orchids}/>
      </div>
    )
  }
}
