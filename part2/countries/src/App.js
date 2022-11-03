import {useEffect, useState} from 'react';
import axios from 'axios';

const ShowCountry = ({country}) => {
  return(
    <div>
        <h2>{country.name.official}</h2>
        <div>
          <p>capital: {country.capital[0]}</p>
          <p>area: {country.area}</p>
        </div>
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map((language) => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.svg} alt={`flag of ${country.name.official}`} width="100" height="70"></img>
    </div>
  );
}

const ShowCountries = ({countries}) => {
  const [show, setShow] = useState(<>what the fuck</>);

  const changeShow = (country) => {
    return (() => {
      console.log(country);
      setShow(<ShowCountry country={country}/>)
    });
  }
  if (countries.length > 10) {
    return (
      <div>Too many countries, specify filter</div>
    );
  } else if (countries.length === 1) {
    const country = countries[0];
    return (
      <div>
        <ShowCountry country={country}/>
      </div>
    );
  } else {
    return (
      <div>
        <ul>
          {countries.map((country) => {
            return(
              
              <li key={country.cca2}>{country.name.official} <button onClick={changeShow(country)}>show</button></li>
            );
          })}
        </ul>
        {show}
      </div>

    );
  }

};


function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all').then((res)=>{
      setCountries(res.data);
    })
  }, [])

  const changeFilter = (event) => {
    setFilter(event.target.value)
  };

  const countriesFilter = () => {
    if (filter.trim() === '') {
      return countries;

    } else {
      const filtered = countries.filter((country) => country.name.official.toLowerCase().match(filter));
      const exactMatch = filtered.filter(country => country.name.official.toLowerCase() === filter);
      return exactMatch.length > 0 ? exactMatch : filtered;
    }
  }

  return (
    <div>
      <p>find countries <input value={filter} onChange={changeFilter}/></p>
        <ShowCountries countries={countriesFilter()}/>
    </div>
  );
}

export default App;
