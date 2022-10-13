import React from 'react'
import { formatToLocalTime } from '../services/weatherService'

const TimeAndLocation = ({weather: {dt, timezone, name, details}}) => {
  return (
    <div className='flex flex-col'>
      <h1 className='text-5xl font-bold'>{`${name}`}</h1>
      <p className='text-sm mt-4 text-slate-700'>{formatToLocalTime(dt, timezone)}</p>
      <p className='font-semibold'>{details}</p>
    </div>
  )
}

export default TimeAndLocation