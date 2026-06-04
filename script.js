const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error-message');
const weatherData = document.getElementById('weather-data');
const cityNameEl = document.getElementById('city-name');
const temperatureEl = document.getElementById('temperature');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('wind-speed');
const weatherIconEl = document.getElementById('weather-icon');
const datetimeEl = document.getElementById('datetime');
const weatherDescriptionEl = document.getElementById('weather-description');
const feelsLikeEl = document.getElementById('feels-like');
const sunriseEl = document.getElementById('sunrise');
const sunsetEl = document.getElementById('sunset');
const lastUpdatedEl = document.getElementById('last-updated');

async function getWeatherData(city) {
    loader.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    weatherData.classList.remove('fade-in');
    weatherData.classList.add('hidden');

    try {
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        if (!response.ok) {
            throw new Error(`Sorry, we couldn't find the weather for "${city}". Please try another city.`);
        }
        const data = await response.json();
        updateWeatherData(data);
    } catch (error) {
        showError(error.message);
    } finally {
        loader.classList.add('hidden');
    }
}

function updateWeatherData(data) {
    const now = new Date();
    datetimeEl.textContent = now.toLocaleString();

    const currentCondition = data.current_condition[0];
    const nearestArea = data.nearest_area[0];
    const todayWeather = data.weather[0];

    cityNameEl.textContent = `${nearestArea.areaName[0].value}, ${nearestArea.country[0].value}`;
    temperatureEl.textContent = `${currentCondition.temp_C}°C`;
    humidityEl.textContent = `Humidity: ${currentCondition.humidity}%`;
    
    // Convert wind speed from km/h to m/s
    const windSpeedKmph = parseFloat(currentCondition.windspeedKmph);
    const windSpeedMps = (windSpeedKmph * 1000 / 3600).toFixed(2);
    windSpeedEl.textContent = `Wind Speed: ${windSpeedMps} m/s`;

    weatherDescriptionEl.textContent = currentCondition.weatherDesc[0].value;
    feelsLikeEl.textContent = `Feels like: ${currentCondition.FeelsLikeC}°C`;

    sunriseEl.textContent = `Sunrise: ${todayWeather.astronomy[0].sunrise}`;
    sunsetEl.textContent = `Sunset: ${todayWeather.astronomy[0].sunset}`;

    lastUpdatedEl.textContent = `Last updated: ${currentCondition.observation_time}`;

    // wttr.in provides weather icon URLs, but they might not fit the design.
    // We can try to map their weather codes to a more standard set of icons if needed,
    // but for now, let's use what they provide.
    // A potential issue is that these are http, not https, which might cause mixed content warnings.
    weatherIconEl.src = currentCondition.weatherIconUrl[0].value;
    weatherIconEl.alt = currentCondition.weatherDesc[0].value;

    weatherData.classList.remove('hidden');
    weatherData.classList.add('fade-in');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function searchWeather() {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
}

searchBtn.addEventListener('click', searchWeather);

cityInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        searchWeather();
    }
});

// Initial weather for a default city
getWeatherData('London');