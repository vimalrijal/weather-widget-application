import React from 'react'

import {
  UilTemperature,
  UilTear,
  UilWind
} from "@iconscout/react-unicons";
import {  iconUrlFromCode } from '../services/weatherService';

const TemperatureAndDetails = ({weather: {
  icon, temp, speed, humidity, feels_like
}}) => {
  return (
    <div className='flex flex-row mt-5'>
      <div className='basis-1/2 '>
        <div className='flex flex-row'>
          <img className='w-20' src={iconUrlFromCode(icon)} alt=''/>
          <h1 className='text-black font-light text-5xl'>{temp}°</h1>
        </div>
      </div>
      <div className='basis-1/2 '>
        <div className='flex flex-col space-y-2'>

          <div className='flex font-light text-sm items-center justify-center'>
            <UilTemperature size={18} className="mr-1 "/>
            Real Fell
            <span className='font-medium ml-1'>{feels_like}</span>
          </div>

          <div className='flex font-light text-sm items-center justify-center'>
            <UilTear size={18} className="mr-1 "/>
            Humidity: 
            <span className='font-medium ml-1'>{humidity}%</span>
          </div>

          <div className='flex font-light text-sm items-center justify-center'>
            <UilWind size={18} className="mr-1 "/>
            Wind: 
            <span className='font-medium ml-1'>{speed}km/ph</span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default TemperatureAndDetails