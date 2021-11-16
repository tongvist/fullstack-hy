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
    const languages = Object.values(info[0].languages).map(lang => <li>{lang}</li>)
        
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
  return <p>{countryName}</p>
}

const Results = (props) => {
  if (props.message) {
    return <p>{props.message}</p>
  }
  const countries = props.data.map(country => <Country key={country.name} countryName={country.name}/>);
 
  if (props.data.length === 1) {
    return <Country info={props.data}/>;
  }
  
  return <div>{countries}</div>
    
}

const App = () => {
  const [countries, setCountries] = useState(null);
  const [search, setSearch] = useState(null);
  const [message, setMessage] = useState("Enter a search term.");

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    if(searchTerm === "") {
      setMessage("Enter a search term.");
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
            setSearch(null);
            setMessage("No results");
            setCountries(null);
            return;
          }

          else if (results.length === 1) {
            setCountries(results);
            return;
          }
          else if (results.length > 10) {
            setMessage("Over 10 results");
            // setSearch(null)
            setCountries(null);
            return;
          }
          setCountries(results);
          // setMessage("Enter a search term.");
      });

    // setSearch(searchTerm);
  }

  return (
    <div>
      <Find onChange={handleSearch}/>
      {countries ? <Results data={countries}/> : <Results message={message}/> }
    </div>
  );
}

export default App;