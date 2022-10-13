import React,{useState} from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import { UilLocationPoint } from '@iconscout/react-unicons'

const Inputs = ({setQuery, units, setUnits}) => {
  const [city, setCity] = useState("");
  const [scaleMetric, setscaleMetric] = useState('scale-150')
  const [scaleimperial, setscaleimperial] = useState('')

  const handleSearchClick = (e) => {
    if(city !== '') setQuery({q: city})
  }

  // function will call when we press enter button
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setQuery({q: city})
    }
  }

  // function to get current location 
  const handleLocationCLick = () =>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude

        setQuery({
          lat, lon
        })
      })
    }
  }

  // function to handle switching between metric and imperial
  const handleUnitsChange = (e) =>{
    const selectedUnit = e.currentTarget.name
    if(selectedUnit == 'metric') {
      setscaleMetric('scale-150')
      setscaleimperial('')
    }else if (selectedUnit == 'imperial'){
      setscaleimperial('scale-150')
      setscaleMetric('')
    }else{
      setscaleMetric('')
      setscaleimperial('')
    }
    if(units !== selectedUnit) setUnits(selectedUnit)
  }

  return (
    <div className='flex flex-row justify-center my-6'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
            <input 
                value={city}
                onKeyDown = {handleKeyDown}
                onChange={(e) => setCity(e.currentTarget.value)}
                type="text" 
                placeholder='search city......'
                className='text-xl font-light p-2 w-full border border-slate-300 rounded-md focus:outline-none capitalize placeholder:lowercase'/>
            
            <UilSearch 
            size={25} 
            onClick={(e)=>handleSearchClick(e)}
            className="text-black cursor-pointer hover:text-blue-500 transition ease-out hover:scale-125"/>
            <UilLocationPoint 
            size={25} 
            onClick={handleLocationCLick}
            className="text-black cursor-pointer hover:text-blue-500 transition ease-out hover:scale-125"/>
        </div>
        <div className='flex flex-row w-1/4 items-center justify-center'>
            <button name='metric' className={`text-xl text-black font-light  ${scaleMetric}`} onClick={handleUnitsChange}>°C</button>
            <p className='text-xl text-black mx-3 '>|</p>
            <button name='imperial' className={`text-xl text-black font-light  ${scaleimperial}`} onClick={handleUnitsChange}>°F</button>
        </div>
    </div>
  )
}

export default Inputs