// defines one piece of weather information
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function WeatherTile({ post }) {
  return (
    <div>
      <h4>
        {" "}
        {post.name}: {post.temperature} F {post.detailedForecast}{" "}
      </h4>
      <img src={post.icon} alt="img" />
      <br />
    </div>
  );
}

export default WeatherTile;
