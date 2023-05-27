export const getWeatherByCity = (city) => {
    return fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=3KLXS6DR2VLL876HR25LHWGDY&contentType=json`
    )
    .then(response => response.json())
    .then(data => data)
    .catch(err => {
        console.error(err);
    });
}