import React, { useState, useEffect } from 'react'
import '../css/App.css'
import { api } from '../services/apiTempo'
import { FaTemperatureHigh, FaWind } from 'react-icons/fa'

function App() {

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Curitiba");
  const [cityText, setCityText] = useState(city);


  async function handleGetWeather(event) {
    event.preventDefault();
    const response = await api.get(city);
    console.log(response);
    setWeather(response.data);
    setCityText(city);

  }

  useEffect(() => { //handleGetWeather() 
  }, []);
  // ,[] para fazer a chamada só no comeco

  return (
    <div className="App">
      {/* <h1>Previsão para a cidade de {city}</h1> */}
      <header >
        <form onSubmit={handleGetWeather}>
          <input
            type='text' value={city}
            onChange={(event) => setCity(event.target.value)} />
          <button>Enviar</button>
        </form>
      </header>


      {weather &&
        <main>
          {/* <p>{JSON.stringify(weather)}</p> */}
          <h2>{cityText}</h2>
          <section className='currentWeather'>
            <h3>Previsão do tempo agora</h3>
            <p>{weather.description}</p>
            <p>{weather.temperature}</p>
          </section>
          <section className='forecast'>
            <h4>Previsão</h4>
            <ol>
              {weather.forecast.map(day =>
                <li>
                  <div>
                    <FaTemperatureHigh />
                    <p>{day.temperature}</p>
                  </div>
                  <div>
                    <FaWind />
                    <p>{day.wind}</p>
                  </div>
                </li>
              )}
            </ol>
          </section>
        </main>
      }
    </div>

  )
}

export default App
