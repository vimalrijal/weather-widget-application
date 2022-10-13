import './App.css';
import { useState, useEffect } from 'react';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';

import ClipLoader from "react-spinners/ClipLoader";

function App() {

  const [query, setQuery] = useState({q: 'melbourne'});
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState()
  const [error, seterror] = useState({
    errorMsg:'',
    active: true
  })

  // this will call initially, and whenever the (query, units) data gets change it will rerender
  useEffect(() => {
    seterror({error: '', active: true})
    setLoading(true)

    const fetchWeather = async () =>{
      await getFormattedWeatherData({...query, units}).then(data =>{
        setWeather(data);
        data ? setLoading(false)  : setLoading(true)
  
      },err => {
        seterror({
          errorMsg: 'no data found',
          active: false
        })
        setLoading(false)
    })
    }
  
    fetchWeather();

  },[query, units])



  return (
    <div className='flex w-max-full h-screen '>
        {
          weather && (
            <div className='w-[90%] m-auto shadow-xl p-7 bg-white'>
              {/* loading spinner component 👇 */}
              {
                loading ? <ClipLoader
                color='blue'
                className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                loading={loading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              /> : null
              }
              <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>
              <h1 hidden={error.active} className='text-xs font-bold text-red-500'>{error.errorMsg}</h1>
              <TimeAndLocation weather={weather}/>
              <TemperatureAndDetails weather={weather}/>
              <Forecast weather={weather} />
            </div>
          )
        }
    </div>
  );

}

export default App;
