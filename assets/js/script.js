const searchFormEl= document.querySelector("#search-form");
const cityNameEl= document.querySelector("#city-name");
const apiKey= '5d63efeaf14fbd7b0d0c47a5c4a2fb8f';

function searchCity(event){
        event.preventDefault();
        const cityName= cityNameEl.value;
        populateCurrentWeather(cityName);
};

function populateCurrentWeather(cityName){
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

        fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
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

