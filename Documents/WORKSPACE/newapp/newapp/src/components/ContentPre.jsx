import React from 'react'

export default function ContentPre({ playerData }) {
  return (
    <div>
      {playerData.map((player,index) => (
        <div key={index}>
          <img src={player.img}></img>
          <p>{player.name}</p>
        </div>
      )
      )}
    </div>
  )
}
