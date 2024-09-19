const searchFormEl= document.querySelector("#search-form");
const cityNameEl= document.querySelector("#city-name");
const currentWeatherEl= document.querySelector("#current-weather")
const fiveDayEl=document.querySelector("#five-day")
const apiKey= '5d63efeaf14fbd7b0d0c47a5c4a2fb8f';
const searchList= document.querySelector("#search-history")
const searchHistory= [];

function searchCity(event){
        event.preventDefault();
        const cityName= cityNameEl.value;
        populateCurrentWeather(cityName);
        populate5Day(cityName);
        storeHistory(cityName);
        renderHistory();
};

function populateCurrentWeather(cityName){
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

        fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            currentWeatherEl.innerHTML=`<h3>${data.name} (${dayjs.unix(data.dt).format("MM/DD/YYYY")}) <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt=""></h3>
                    <p class="fs-5">Temperature: ${data.main.temp} °F<span id="temperature"></span></p>
                    <p class="fs-5">Wind: ${data.wind.speed} MPH<span id="wind"></span></p>
                    <p class="fs-5">Humidity: ${data.main.humidity}%<span id="humidity"></span></p>`,
            console.log(data)
        });
}

function populate5Day(cityName){
    const url=`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;

    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data)

            fiveDayEl.textContent=""

            for(let i=3; i< data.list.length; i=i+8){
                const forecast= data.list[i]
                console.log(forecast)
                fiveDayEl.innerHTML +=`<div class="col-2 my-3">
                  <div class="card border-black">
                    <div class="card-body">
                      <h5 class="card-title">${dayjs.unix(forecast.dt).format("MM/DD/YYYY")}</h5>
                      <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="">
                      <p>Temp: ${forecast.main.temp} °F<span id="temperature"></span></p>
                    <p>Wind: ${forecast.wind.speed} MPH<span id="wind"></span></p>
                    <p>Humidity: ${forecast.main.humidity}%<span id="humidity"></span></p>
                    </div>
                  </div>
                </div>`
            }
        });
}

function renderHistory() {
    searchList.innerHTML = "";
    searchHistory.forEach(history => {
        const button = document.createElement("button");
        button.textContent = history;
        button.classList.add("btn", "btn-secondary", "w-100", "my-2");
        button.addEventListener("click", () => {
            populateCurrentWeather(history);
            populate5Day(history);
        });
        searchList.appendChild(button);
    });
}

function loadCities() {
    const storedCities = JSON.parse(localStorage.getItem('searchHistory'));
    if (storedCities !== null) {
        searchHistory = storedCities;
    }
    renderHistory();
}

function storeHistory(cityName) {
    if (!searchHistory.includes(cityName)) {
        searchHistory.push(cityName);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
}

searchFormEl.addEventListener("submit", searchCity);
loadCities();
