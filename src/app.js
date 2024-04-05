function displayTemperature(response) {
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  temperature = Math.round(response.data.temperature.current);

  currentTemperatureElement.innerHTML = temperature;
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
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Fri", "Sat", "Sun", "Mon"];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-forecast-date">${day}</div>
             <img
                src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/121/676/original/clear-sky-day.png?1712214600"
                alt="sunny day"
                width="50px"
              />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"
                  ><strong>13&deg</strong></span
                >
                <span class="weather-forecast-temperature-min">12&deg</span>
              </div>`;
  });
  forecastElement.innerHTML = forecastHtml;
}

displayForecast();
