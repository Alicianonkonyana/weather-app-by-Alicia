function displayTemperature(response) {
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  temperature = Math.round(response.data.temperature.current);

  currentTemperatureElement.innerHTML = temperature;
}
function formattedDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  return days[date.getDay()];
}
function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#city-input");
  let city = searchInputElement.value;
  let apiKey = "803fb1e4t6f6d9bf33a5f49fo2ada403";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
  cityElement.innerHTML = city;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
function getForecast(city) {
  let apiKey = "803fb1e4t6f6d9bf33a5f49fo2ada403";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-date">${formattedDays(day.time)}</div>
             <img src="${day.condition.icon_url}"
                
              />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"
                  ><strong>${Math.round(day.temperature.maximum)}</strong></span
                >
                <span class="weather-forecast-temperature-min">${Math.round(
                  day.temperature.minimum
                )}</span>
              </div>`;
      getForecast(response.data.city);
    }
  });
  forecastElement.innerHTML = forecastHtml;
}

getForecast("Paris");
