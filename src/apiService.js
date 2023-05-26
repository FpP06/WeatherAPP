export const getWeatherByCity = (city) => {
    return fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=3KLXS6DR2VLL876HR25LHWGDY&contentType=json`, {
        "method": "GET",
        "headers": {
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log("OK")
        console.log(data.resolvedAddress);
        console.log(data.currentConditions.temp);
    })
    .catch(err => {
        console.error(err);
    });
}