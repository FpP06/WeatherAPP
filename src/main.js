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

}

const onClickSubmit = (event) => {
}

const onEnterSubmit = (event) => {
    if(event.key === 'Enter') {
        getWeatherByCity(viewElements.searchInput.value);
    }
}

const init = () => {
    connectHTMLElements();
    setupListeners();
}

document.addEventListener('DOMContentLoaded', init);