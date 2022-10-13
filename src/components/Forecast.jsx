import React from 'react'
import { iconUrlFromCode } from '../services/weatherService'

const Forecast = ({weather:{list}}) => {
    console.log(list)

    const objectEqualArray = (a,b) => a.title === b.title;
    const result = []

    list.forEach((item) => {
        const itemInResult = result.find((resultItem)=>
            objectEqualArray(item, resultItem)
        );
        if(!itemInResult){
            result.push(item)
        }
    })

    console.log(result)
    
    

  return (
    <div className=''>
        <div className="grid grid-cols-1 md:grid-cols-6 mt-[100px] gap-3">
        {
                result.map((dailyWeather) => (
                    <div key={dailyWeather.title} className='flex flex-row md:flex-col items-center justify-center  border border-black hover:bg-blue-200 transition ease-out hover:scale-150'>
                        
                            <p className='text-sm font-semibold'>{dailyWeather.title}</p>
                            <img className='w-12 my-1' src={iconUrlFromCode(dailyWeather.icon)} alt=''/>
                            <p className='font-medium text-xs'>{dailyWeather.temp}°</p>
                        
                    </div>
                ))
            }
        </div>
    </div>

    
  )
}

export default Forecast