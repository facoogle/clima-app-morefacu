import React from "react";
//creo el componente funcional City que mostrará los detalles de una ciudad
//recibida por props en la ruta /ciudad/{ciudadId}
export default function City({ city }){
    return(
        <div className="HomeCard">
            <div className="tittle"><h1>Tiempo en {city.name}</h1></div>
            <div className="temp">
            <p>Temp {city.temp}°C</p><hr />
            <p>Minima {city.min}°C </p><hr />
            <p>Máxima {city.max}°C </p><hr />
            <p>ST {city.feels}</p><hr />
            <p>Humedad {city.humidity}% </p><hr />
            </div>
            <h3>El dia se presenta con {city.weather}.</h3>
            <img width="220px" src={"/icons/"+city.img+".svg"} alt="" />
            <div><h3>Gracias por elegirnos</h3></div>
            
        </div>
    )
}