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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForcast(response) {
  let forcast = response.data.daily;
  let forcastElement = document.querySelector("#forcast");
  let forcastHtml = `<div class="row pt-3">`;

  forcast.forEach(function (forcastDay, index) {
    if (index < 5) {
      forcastHtml =
        forcastHtml +
        `
              <div class="col-2 m-2">
                <div class="weather-forcast-date">${formatDay(
                  forcastDay.dt
                )}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forcastDay.weather[0].icon
                  }@2x.png"
                  alt="weather-forcast"
                  class="weather-forcast-image"
                  width="50px"
                />
                <div class="weather-forcast-temp">
                  <span class="weather-forcast-temp-max">${Math.round(
                    forcastDay.temp.max
                  )}° </span>
                  <span class="weather-forcast-temp-min">${Math.round(
                    forcastDay.temp.min
                  )}° </span>
                </div>
              </div>
            
  `;
    }
  });

  forcastHtml = forcastHtml + `</div>`;
  forcastElement.innerHTML = forcastHtml;
}

function getForcast(coordinates) {
  let apiKey = `bb88e93a86fed0c8e2a47a6a16388a81`;
  let apiLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiLink).then(displayForcast);
}

function getCurrentWeather(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#current-city-details-weather").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#current-city-details-temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#current-city-details-humidity").innerHTML =
    Math.round(response.data.main.humidity);
  document.querySelector("#current-city-details-wind-speed").innerHTML =
    Math.round(response.data.wind.speed);
  document.querySelector("h1").innerHTML = `${response.data.name}`;
  document.querySelector("#current-city-details-time").innerHTML = formatedDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#current-city-details-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#current-city-details-icon")
    .setAttribute("alt", response.data.weather[0].description);
  getForcast(response.data.coord);
}

function searchCity(cityValue) {
  let apiKey = `bb88e93a86fed0c8e2a47a6a16388a81`;
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;
  axios.get(apiLink).then(getCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityValue = document.querySelector("#search-city-form-value").value;
  searchCity(cityValue);
}

/*function getFahrenheitTemp(event) {
  event.preventDefault();
  document.querySelector("#current-city-details-temperature").innerHTML =
    Math.round((celsiusTemperature * 9) / 5 + 32);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function getCelsiusTemp(event) {
  event.preventDefault();
  document.querySelector("#current-city-details-temperature").innerHTML =
    Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}*/

document
  .querySelector("#search-city-form")
  .addEventListener("submit", handleSubmit);

/*let fahrenheitLink = document.querySelector(
  "#current-city-details-fahrenheit-link"
);
fahrenheitLink.addEventListener("click", getFahrenheitTemp);

let celsiusLink = document.querySelector("#current-city-details-celsius-link");
celsiusLink.addEventListener("click", getCelsiusTemp);*/

let celsiusTemperature = null;

searchCity(`London`);
