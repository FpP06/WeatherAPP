import {getWeatherByCity} from "./apiService.js";
const viewElements = {};

const getDOMElem = (id) => {
    return document.getElementById(id);
}

const connectHTMLElements = () => {
    viewElements.mainContainer = getDOMElem('mainContainer');
    viewElements.weatherSearchView = getDOMElem('weatherSearchView');
    viewElements.weatherForecastView = getDOMElem('weatherForecastView');

    viewElements.searchInput = getDOMElem('searchInput');
    viewElements.searchButton = getDOMElem('searchButton');

    viewElements.weatherCity = getDOMElem('weatherCity');
    viewElements.weatherIcon = getDOMElem('weatherIcon');

    viewElements.weatherCurrentTemp = getDOMElem('weatherCurrentTemp');
    viewElements.weatherMaxTemp = getDOMElem('weatherMaxTemp');
    viewElements.weatherMinTemp = getDOMElem('weatherMinTemp');

    viewElements.returnToSearchBtn = getDOMElem('returnToSearchBtn');
}

const setupListeners = () => {
    viewElements.searchInput.addEventListener('keydown', onEnterSubmit);
    viewElements.searchButton.addEventListener('click', onClickSubmit);
    
    viewElements.returnToSearchBtn.addEventListener('click', function() {
        document.querySelector(".weather-info").classList.remove("weather-danger");
        viewElements.weatherSearchView.style.display = 'flex';
        viewElements.weatherForecastView.style.display = 'none';
    });
}

const onClickSubmit = (event) => {
    getWeatherByCity(viewElements.searchInput.value).then(data => {
        displayWeatherData(data);
    });
}

const onEnterSubmit = (event) => {
    if(event.key === 'Enter') {
        getWeatherByCity(viewElements.searchInput.value).then(data => {
            displayWeatherData(data);
        });
    }
}

const displayWeatherData = (data) => {
    switchView();
    // fadeInOut();
    console.log("OK")
    if(data !== undefined) {
        viewElements.weatherCity.textContent = data.resolvedAddress;
        viewElements.weatherCurrentTemp.innerHTML = `Temperatura: ${data.currentConditions.temp}&degC`;
        viewElements.weatherIcon.setAttribute('src', `img/${data.currentConditions.icon}.svg`)
        viewElements.weatherMaxTemp.innerHTML = `Max. temperatura: ${data.days[0].tempmax}&degC`;
        viewElements.weatherMinTemp.innerHTML = `Min. temperatura: ${data.days[0].tempmin}&degC`;
    }
    else {
        document.querySelector(".weather-info").classList.add("weather-danger");
        viewElements.weatherCity.textContent = "Nie znaleziono!";
        viewElements.weatherCurrentTemp.innerHTML = "";
        viewElements.weatherIcon.setAttribute('src', ``)
        viewElements.weatherMaxTemp.innerHTML = ``;
        viewElements.weatherMinTemp.innerHTML = ``;
    }
}

const switchView = () => {
    if(viewElements.weatherSearchView.style.display !== 'none') {
        viewElements.weatherSearchView.style.display = 'none';
        viewElements.weatherForecastView.style.display = 'block';
    }
    else {
        viewElements.weatherSearchView.style.display = 'block';
        viewElements.weatherForecastView.style.display = 'none';
    }
}

const fadeInOut = () => {
    if (viewElements.mainContainer.style.opacity === '1' || viewElements.mainContainer.style.opacity === '') {
        viewElements.mainContainer.style.opacity = '0';
    } 
    else {
        viewElements.mainContainer.style.opacity = '1';
    }
}

const init = () => {
    connectHTMLElements();
    setupListeners();
}

document.addEventListener('DOMContentLoaded', init);