import React from "react";
import "./HomeCard.css"

export default function HomeCard({temperature}){
    return(
        <div className="HomeCard">
            <div className="tittle"><h1>Tiempo en e {temperature.name}</h1></div>
            <div className="temp">
            <p>Temp {temperature.temp}°C</p><hr />
            <p>Minima {temperature.temp_min}°C </p><hr />
            <p>Máxima {temperature.temp_max}°C </p><hr />
            <p>ST {temperature.feels}</p><hr />
            <p>Humedad {temperature.humidity}% </p><hr />
            </div>
            <h3>El dia se presenta con {temperature.description}.</h3>
            <img width="220px" src={"/icons/"+temperature.icon+".svg"} alt="" />
            <div><h2>Tiempo en principales ciudades de Argentina</h2></div>
        </div>
    )
}