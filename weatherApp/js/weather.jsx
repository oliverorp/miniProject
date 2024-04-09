import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import WeatherTile from "./tile";

// Create a root
const root = createRoot(document.getElementById("reactEntry"));

function Weather() {
  const [latitude, setX] = useState(42.2808); //latitude
  const [longitude, setY] = useState(-83.743); //longitude
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [posts, setWeatherData] = useState([]); //holds each weather entry

  function handleSubmit() {
    var lat_input = document.getElementById("x").value;
    var long_input = document.getElementById("y").value;
    setX(lat_input);
    setY(long_input);
    console.log(latitude);
    console.log(longitude);
  }

  useEffect(() => {
    const apiUrl = `https://api.weather.gov/points/${latitude},${longitude}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const temp =
          data["properties"]["relativeLocation"]["properties"]["city"];
        console.log(temp);
        setCity(data["properties"]["relativeLocation"]["properties"]["city"]);

        console.log(city);

        const newUrl = data["properties"]["forecast"];
        return fetch(newUrl);
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        console.log("actual data");
        console.log(data);

        setWeatherData(data["properties"]["periods"]);
      })
      .catch((error) => {
        alert("Make sure coordinates are valid and 4 decimal places");
        console.log(error);
      });
  }, [latitude, longitude, city]);

  return (
    <div>
      <form id="myForm">
        <input type="text" id="x" placeholder="Latitude" />
        <input type="text" id="y" placeholder="Longitude" />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <h2>Showing results for {city}</h2>

      {posts.slice(0, 6).map((post, index) => (
        <div>
          <WeatherTile key={index} post={post}></WeatherTile>
        </div>
      ))}
    </div>
  );
}

root.render(<Weather />);
