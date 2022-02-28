const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const weather = $('.weather');
const body = $('body');
const search = $('.search');
const city = $('.city');
const country = $('.country');
const temValue = $('.value');
const currTime = $('.time');
const shortDesc = $('.short-desc');
const visibility = $('.visibility span');
const wind = $('.wind span');
const sun = $('.sun span');
const currDate = new Date();


function changeWeather(inputValue = 'ha noi') {
    let apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=cb8d857e9528680474d1a7a90b239fba`

    fetch(apiWeather)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            handleApi(data)
        })

};
changeWeather();

function handleApi(data) {
    const tempC = (data.main.temp - 273.15).toFixed(1);

    city.innerText = data.name;
    country.innerText = data.sys.country;
    visibility.innerText = data.visibility;
    wind.innerText = data.wind.speed;
    sun.innerText = data.main.humidity;
    temValue.innerText = tempC;
    shortDesc.innerText = data.weather[0].description;

    currTime.innerText = `${currDate.getDate()}/${currDate.getMonth() + 1}/${currDate.getFullYear()}, ${currDate.getMinutes() >= 10 ? currDate.getMinutes() : '0' + currDate.getMinutes()}:${currDate.getMinutes() >= 10 ? currDate.getMinutes() : '0' + currDate.getMinutes()}:${currDate.getHours() <= 12 ? currDate.getHours() + ' AM' : currDate.getHours() + ' PM'}`;

    handleBackGround(tempC);
};
search.onblur = function (e) {
    if (e.target.value.trim()) {
        changeWeather(e.target.value.trim())
    }
};

search.onkeyup = function (e) {

    if (e.keyCode == 13) {
        if (e.target.value.trim()) {
            changeWeather(e.target.value.trim())
        }
    }
};

function handleBackGround(temp) {
    let tempC = Number.parseFloat(temp);
    console.log(tempC)

    if (tempC < 10) {
        weather.style.background = 'url(./assets/img/winter.jpg) center/cover no-repeat';
        body.style.background = 'url(./assets/img/winter.jpg) center/cover no-repeat';
    } else if (tempC >= 10 && tempC < 17) {
        weather.style.background = 'url(./assets/img/autumn.jpg) center/cover no-repeat';
        body.style.background = 'url(./assets/img/autumn.jpg) center/cover no-repeat';
    } else if (tempC >= 17 && tempC < 25) {
        weather.style.background = 'url(./assets/img/spring.jpg) center/cover no-repeat';
        body.style.background = 'url(./assets/img/spring.jpg) center/cover no-repeat';
    } else {
        weather.style.background = 'url(./assets/img/summer.jpg) center/cover no-repeat';
        body.style.background = 'url(./assets/img/summer.jpg) center/cover no-repeat';
    }
}