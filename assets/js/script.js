const searchFormEl= document.querySelector("#search-form");
const cityNameEl= document.querySelector("#city-name");
const currentWeather= document.querySelector("#current-weather")
const apiKey= '5d63efeaf14fbd7b0d0c47a5c4a2fb8f';

function searchCity(event){
        event.preventDefault();
        const cityName= cityNameEl.value;
        populateCurrentWeather(cityName);
        populate5Day(cityName);
};

function populateCurrentWeather(cityName){
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

        fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            currentWeather.innerHTML=`<h3>${data.name} (${dayjs.unix(data.dt).format("MM/DD/YYYY")}) <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt=""></h3>
                    <p>Temperature: ${data.main.temp} °F<span id="temperature"></span></p>
                    <p>Wind: ${data.wind.speed} MPH<span id="wind"></span></p>
                    <p>Humidity: ${data.main.humidity} %<span id="humidity"></span></p>`,
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

            for(let i=3; i< data.list.length; i=i+8){
                const forecast= data.list[i]
                console.log(forecast)
            }
        });
}

searchFormEl.addEventListener("submit", searchCity);

