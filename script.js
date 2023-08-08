const apikey = "da874f1ac43aaf6667ad6113762eb2d0";
let apiurl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=delhi&appid=${apikey}`;
let searchContent = null;
const searchbox = document.querySelector(".search-box input");
const getWeatherByCityName = (e) => {
    if(e.key == "Enter"){
        searchContent = e.target.value.trim();
        if(searchContent != "" && searchContent != null){
            apiurl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${searchContent}&appid=${apikey}`;
            checkWeather();
        }
    }
}

const searchCityWeather = () => {
    searchContent = searchbox.value.trim();
    if(searchContent != "" && searchContent != null){
        apiurl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${searchContent}&appid=${apikey}`;
        checkWeather();
    }
}
async function checkWeather(){
    let response = await fetch(apiurl);
    let data = await response.json();
    console.log(data);
    if(data.cod == 404){
        document.querySelector(".notfoundmsg").classList.add("show");
    }else{
        document.querySelector(".notfoundmsg").classList.remove("show");
        let temp = document.querySelector(".temp");
        let city = document.querySelector(".city");
        let weatherImg = document.querySelector(".weather img");
        let humidity = document.querySelector(".humidity");
        let wind = document.querySelector(".wind");
        let max = document.querySelector(".max");
        let min = document.querySelector(".min");
        max.innerHTML = Math.round(data.main.temp_max);
        min.innerHTML = Math.round(data.main.temp_min);
        wind.innerHTML = data.wind.speed + "<span> km/h</span>"
        humidity.innerHTML = data.main.humidity + "%";
        weatherImg.src = `./images/${data.weather[0].main}.png`
        temp.innerHTML = Math.round(data.main.temp) + "°c";
        city.innerHTML = data.name;
    }
}
checkWeather();

searchbox.addEventListener("keyup",getWeatherByCityName);