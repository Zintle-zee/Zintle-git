let now = new Date();

let h4 = document.querySelector("h4");
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let day = days[now.getDay()];
let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
let month = months[now.getMonth()];
h4.innerHTML = ` ${date} ${month} ${year}, ${day}, ${hour}:${minutes} `;

function showWeather(response) {
    let temperature = Math.round(response.data.main.temp);
    let city = response.data.name;
    let condition = response.data.weather[0].description;

    let message = `${temperature} °C`;
    let h3 = document.querySelector(".temperature");
    h3.innerHTML = message;

    let h2 = document.querySelector(".city");
    h2.innerHTML = city;

    let pCondition = document.querySelector(".condition");
    pCondition.innerHTML = condition;
}

function fetchWeather(city) {
    let apiKey = "677ee644224535c67ab6cf6f6f21626d";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showWeather);
}

function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            let apiKey = "677ee644224535c67ab6cf6f6f21626d";
            let units = "metric";
            let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

            axios.get(apiUrl).then(showWeather);
        });
    } else {
        alert("Geolocation is not available in this browser.");
    }
}

document.getElementById("search-btn").addEventListener("click", function () {
    let city = document.querySelector("input[type='text']").value.trim();
    if (city.length > 0) {
        fetchWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

document.getElementById("current-btn").addEventListener("click", function () {
    getCurrentLocationWeather();
});

// Initial weather data for default city (e.g., Paris)
fetchWeather("Paris");

