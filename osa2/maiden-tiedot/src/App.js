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

const Country = ({info, countryName}) => {
  if (info) {
    const languages = Object.values(info[0].languages).map(lang => <li key={lang}>{lang}</li>)
        
    return (
      <div>
        <h2>{info[0].name}</h2>
        <p>Capital: {info[0].capital}</p>
        <p>Region: {info[0].subregion}</p>

        <h3>Languages</h3>
      
        <ul>
          {languages}
        </ul>
        <div>
          <img src={info[0].flag} alt="" width="200px"></img>
        </div>
      </div>
    );
  }
  
  return <p style={{display: "inline"}}>{countryName}</p>
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
        <Country countryName={country.name} buttonHandler={props.buttonHandler}/> 
        <button onClick={() => props.buttonHandler(country.name)}>Show</button>
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
          
          setCountries(results);
          return;
      })};

  const showCountry = (countryName) => {
    
    axios
      .get(`https://restcountries.com/v3.1/name/${countryName.toLowerCase()}`)
      .then(response => {
        const countryData = response.data.map(country => {
          return {
            name: country.name.common,
            capital: country.capital,
            subregion: country.subregion,
            languages: country.languages,
            flag: country.flags.png
          }
        });
        setCountries(countryData);
    })}

  return (
    <div>
      <Find onChange={handleSearch}/>
      {countries ? <Results data={countries} buttonHandler={(countryName) => showCountry(countryName)}/> : <Results message={message}/> }
    </div>
  );
}

export default App;
