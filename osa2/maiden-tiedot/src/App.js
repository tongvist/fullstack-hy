import {React, useState} from 'react';
import axios from 'axios';

const Find = ({onChange}) => {
  return (
    <div>
      <label>Find countries: </label>
      <input type="text" onChange={onChange}></input>
    </div>
  )
}

const Country = (props) => {
  const [weather, setWeather] = useState({});
  
  if (props.info === null) {
    return <p style={{display: "inline"}}>{props.countryName}</p>
  }

  const countryInfo = props.info[0];
  const languages = Object.values(countryInfo.languages).map(lang => <li key={lang}>{lang}</li>);
  const {capital, flag, name, subregion} = countryInfo;
  const apiKey = process.env.REACT_APP_API_KEY;

  try {
    axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(capital)}`)
    .then(response => {
      console.log("current", response.data.current);
      const weatherData = response.data.current;
        const weather = {
          temperature: weatherData.temperature,
          icon: weatherData.weather_icons,
          windSpeed: weatherData.wind_speed,
          windDirection: weatherData.wind_dir
        }
      
      setWeather(weather);
    });

  } catch(e) {
    console.log(e);
  }

  console.log("weatherInfo: ", weather);
  const {temperature, icon, windSpeed, windDirection} = weather;
        
  return (
    <div>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Region: {subregion}</p>

      <h3>Languages</h3>
    
      <ul>
        {languages}
      </ul>
      <div>
        <img src={flag} alt="" width="200px"></img>
      </div>

      <h3>Weather in {capital}</h3>
      <p>Temperature: {temperature} Celsius</p>
      <div>
        <img src={icon} alt="" width="100px"></img>
      </div>
      <p>Wind: {windSpeed} mph, direction {windDirection}</p>

    </div>
  );
  
}

const Results = (props) => {
  if (props.message) {
    return <p>{props.message}</p>
  }
  
  if (props.data.length === 1) {
    return <Country info={props.data}/>;
  }
  
  const countries = props.data.map(country => {
    return (
      <div key={country.name}>
        <Country countryName={country.name} buttonHandler={props.buttonHandler} info={null}/> 
        <button onClick={props.buttonHandler}>Show</button>
      </div>
    )
  });

  return <div>{countries}</div>
}

const App = () => {
  const [countries, setCountries] = useState(null);
  const [message, setMessage] = useState("Enter a search term.");

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    if(searchTerm === "") {
      setMessage("Enter a search term.");
      setCountries(null);
      return;
    }
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        const results = response.data
          .filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(country => {
            return {
              name: country.name.common,
              capital: country.capital,
              subregion: country.subregion,
              languages: country.languages,
              flag: country.flags.png
            }
          });

          if (results.length === 0) {
            setMessage("No results");
            setCountries(null);
            return;
          }

          else if (results.length > 10) {
            setMessage("Over 10 results");
            setCountries(null);
            return;
          }
          console.log(results);
          setCountries(results);
          return;
      })};

  const showCountry = countryName => {
    let countryData = [];
    axios
      .get(`https://restcountries.com/v3.1/name/${countryName.toLowerCase()}`)
      .then(response => {
        countryData = response.data.map(country => {
          return {
            name: country.name.common,
            capital: country.capital,
            subregion: country.subregion,
            languages: country.languages,
            flag: country.flags.png
          }
        });
      });

    setCountries(countryData);
  }

  return (
    <div>
      <Find onChange={handleSearch}/>
      {countries ? <Results data={countries} buttonHandler={(countryName) => showCountry(countryName)}/> : <Results message={message}/> }
    </div>
  );
}

export default App;
