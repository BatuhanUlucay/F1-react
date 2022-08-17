import React from 'react'
import TeamCard from './TeamCard'

function TeamCards({ids}) {

  return (
    <div className='grid grid-cols-2'>{ids.map((id) => {
        return <TeamCard id={id}/>
    })}</div>
  )
}

export default TeamCards