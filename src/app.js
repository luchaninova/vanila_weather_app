function getCurrentWeather(response) {
  document.querySelector("#current-city-details-weather").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#current-city-details-temperature").innerHTML =
    Math.round(response.data.main.temp);
  document.querySelector("#current-city-details-humidity").innerHTML =
    Math.round(response.data.main.humidity);
  document.querySelector("#current-city-details-wind-speed").innerHTML =
    Math.round(response.data.wind.speed);
  document.querySelector("h1").innerHTML = `${response.data.name}`;
}

// function searchCity(cityValue) {  }

let apiKey = `bb88e93a86fed0c8e2a47a6a16388a81`;
let cityValue = `Sumy`;
let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;
axios.get(apiLink).then(getCurrentWeather);
