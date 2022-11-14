import {useEffect, useState} from 'react';
import axios from 'axios';

const ShowCountry = ({country}) => {
  const [weather, setWeather] = useState({'main': {'temp': 0}, 'wind':{'speed':0}, 'weather':[{'id':800}]});
  useEffect(()=> {
    const lat = country.latlng[0];
    const lng = country.latlng[1];
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
    .then((res) => {
      setWeather(res.data);
    });
  }, [country]);

  const getWeatherIcon = () => {
    const icon = weather.weather[0].id
    if (icon < 300) {
      return 'http://openweathermap.org/img/wn/11d@2x.png';
    } else if (icon < 400) {
      return 'http://openweathermap.org/img/wn/09d@2x.png';
    } else if (icon < 600) {
      return 'http://openweathermap.org/img/wn/10d@2x.png';
    } else if (icon < 700) {
      return 'http://openweathermap.org/img/wn/13d@2x.png';
    } else if (icon < 800) {
      return 'http://openweathermap.org/img/wn/50d@2x.png';
    } else if (icon === 800) {
      return 'http://openweathermap.org/img/wn/01d@2x.png';
    } else if (icon < 900) {
      return 'http://openweathermap.org/img/wn/03d@2x.png';
    }
  };
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
        <h2>Weather in {country.capital[0]}</h2>
        <p>temperature {weather.main.temp} celcius</p>
        <img src={getWeatherIcon()} alt='weather icon'></img>
        <p>wind {weather.wind.speed}m/s</p>
    </div>
  );
}

const ShowCountries = ({countries}) => {
  const [show, setShow] = useState(<></>);

  const changeShow = (country) => {
    return (() => {
      console.log(country);
      setShow(<ShowCountry country={country} />)
      
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
        <ShowCountry country={country} />
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
