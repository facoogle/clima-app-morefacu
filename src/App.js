import './App.css';
import React, { useState, useEffect } from 'react';
import Nav from './components/Nav.jsx';
import Cards from './components/Cards.jsx';
// importo los componentes About y City
import About from './components/About';
import City from './components/City';
import HomeCard from './components/HomeCard.jsx';
import axios from 'axios'
import { Route } from 'react-router-dom';

const apiKey = '6a9b9651318ede2644e620f696ebfaf1';

function App() {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [temperature, setTemperature] = useState(0);

  const savePositionState = (position)=>{
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }


//console.log(temperature)
useEffect(() => {
  const fetchCity = async () => {
    try {
       window.navigator.geolocation.getCurrentPosition(savePositionState);
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=60d505bb48f9c02e8d1f29a621cd125f&units=metric&lang=es`)
      setTemperature(
        {name: res.data.name,
         temp: res.data.main.temp,
         temp_min: res.data.main.temp_min,
         temp_max: res.data.main.temp_max,
         pressure: res.data.main.pressure,
         humidity: res.data.main.humidity,
         description: res.data.weather[0].description,
         icon: res.data.weather[0].icon,
         feels: res.data.main.feels_like
        }
         
         
        )
      
    } catch (error) {
      console.log(error)
    }
  }
  fetchCity();
}, [latitude,longitude]);


  




  const [cities, setCities] = useState([]);
  function onClose(id) {
    setCities(oldCities => oldCities.filter(c => c.id !== id));
  }

  



  const onSearch = async (ciudad) => {
    try {
      const recurso = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`)
     console.log(recurso)
      if(recurso.data.main !== undefined){
        const ciudad = {
          min: Math.round(recurso.data.main.temp_min),
          max: Math.round(recurso.data.main.temp_max),
          img: recurso.data.weather[0].icon,
          id: recurso.data.id,
          wind: recurso.data.wind.speed,
          temp: recurso.data.main.temp,
          feels:recurso.data.main.feels_like,
          humidity:recurso.data.main.humidity,
          name: recurso.data.name,
          weather: recurso.data.weather[0].description,
          clouds: recurso.data.clouds.all,
          latitud: recurso.data.coord.lat,
          longitud: recurso.data.coord.lon
        };
        setCities(oldCities => [...oldCities, ciudad]);
      } else {
        alert("Ciudad no encontrada");
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  






  //function onSearch(ciudad) {
    //fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`)
     // .then(r => r.json())
     // .then((recurso) => {
       // if(recurso.main !== undefined){
         // const ciudad = {
           // min: Math.round(recurso.main.temp_min),
           // max: Math.round(recurso.main.temp_max),
           // img: recurso.weather[0].icon,
           // id: recurso.id,
          //  wind: recurso.wind.speed,
           // temp: recurso.main.temp,
           // feels:recurso.main.feels_like,
            //humidity:recurso.main.humidity,
            //name: recurso.name,
           // weather: recurso.weather[0].description,
          //  clouds: recurso.clouds.all,
          //  latitud: recurso.coord.lat,
        //    longitud: recurso.coord.lon
      //    };
    //      setCities(oldCities => [...oldCities, ciudad]);
  //      } else {
  //        alert("Ciudad no encontrada");
  //      }
  //    });
  //}
  
  function onFilter(ciudadId) {
    let ciudad = cities.filter(c => c.id === parseInt(ciudadId));
    if(ciudad.length > 0) {
        return ciudad[0];
    } else {
        return null;
    }
  }
  
   // //
  
  
  



  useEffect(() => {
    onSearch("rosario");
    onSearch("buenos aires");
    onSearch("cordoba");
  }, []); 

  return (
    
    <div className="App">
      <Route path='/' render={() => <Nav onSearch={onSearch}/>} />
      <Route path='/about' component={About}/>
      <Route exact path='/' render={() =>  <HomeCard temperature= {temperature}/> }/>
      <Route exact path='/' render={() =>  <Cards cities={cities} onClose={onClose} /> }/>
      <Route exact path='/ciudad/:ciudadId'
             render={({match}) => (<City city={onFilter(match.params.ciudadId)}/>)}/>
      <hr />
    </div>
  );
}

export default App;
