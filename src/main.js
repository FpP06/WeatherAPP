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
    viewElements.pressure = getDOMElem('pressure');
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
    if(data !== undefined) {
        viewElements.weatherCity.textContent = `${data.resolvedAddress}`;
        viewElements.weatherCurrentTemp.innerHTML = `<b>Temperatura:</b> ${data.currentConditions.temp}&degC`;
        viewElements.weatherIcon.setAttribute('src', `img/${data.currentConditions.icon}.svg`);
        viewElements.weatherIcon.setAttribute('alt', `${data.currentConditions.conditions}`);
        viewElements.weatherIcon.style.width = "50px";
        viewElements.pressure.innerHTML = `<b>Ciśnienie:</b> ${data.currentConditions.pressure} hPa`;
        viewElements.weatherMaxTemp.innerHTML = `<b>Max. temperatura:</b> ${data.days[0].tempmax} &degC`;
        viewElements.weatherMinTemp.innerHTML = `<b>Min. temperatura:</b> ${data.days[0].tempmin} &degC`;
    }
    else {
        document.querySelector(".weather-info").classList.add("weather-danger");
        viewElements.weatherCity.textContent = "Nie znaleziono!";
        document.querySelector('.weather-info__city').style.justifyContent = "center";
        viewElements.weatherCurrentTemp.innerHTML = "";
        viewElements.weatherIcon.setAttribute('src', "")
        viewElements.weatherIcon.style.width = "0";
        viewElements.pressure.innerHTML = "";
        viewElements.weatherMaxTemp.innerHTML = "";
        viewElements.weatherMinTemp.innerHTML = "";
    }
}

const switchView = () => {
    if(viewElements.weatherSearchView.style.display !== 'none') {
        viewElements.weatherSearchView.style.display = 'none';
        viewElements.weatherForecastView.style.display = 'flex';
    }
    else {
        viewElements.weatherSearchView.style.display = 'flex';
        viewElements.weatherForecastView.style.display = 'none';
    }
}

// const fadeInOut = () => {
//     if (viewElements.mainContainer.style.opacity === '1' || viewElements.mainContainer.style.opacity === '') {
//         viewElements.mainContainer.style.opacity = '0';
//     } 
//     else {
//         viewElements.mainContainer.style.opacity = '1';
//     }
// }

const init = () => {
    connectHTMLElements();
    setupListeners();
}

document.addEventListener('DOMContentLoaded', init);