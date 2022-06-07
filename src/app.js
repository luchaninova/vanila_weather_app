function formatedDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

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
  document.querySelector("#current-city-details-time").innerHTML = formatedDate(
    response.data.dt * 1000
  );
  console.log(response);
}

// function searchCity(cityValue) {  }

let apiKey = `bb88e93a86fed0c8e2a47a6a16388a81`;
let cityValue = `Sumy`;
let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;
axios.get(apiLink).then(getCurrentWeather);
