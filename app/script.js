class WeatherService {
    constructor() {
        this.apiUrl = 'https://wttr.in';
    }

    async getWeatherData(city) {
        try {
            const response = await fetch(`${this.apiUrl}/${city}?format=j1`);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`City "${city}" not found. Please try another city.`);
                }
                throw new Error(`Sorry, we couldn't find the weather for "${city}". Please try another city.`);
            }
            return await response.json();
        } catch (error) {
            throw new Error(`Failed to fetch weather data: ${error.message}`);
        }
    }

    async getWeatherDataByCoords(latitude, longitude) {
        try {
            const response = await fetch(`${this.apiUrl}/${latitude},${longitude}?format=j1`);
            if (!response.ok) {
                throw new Error(`Sorry, we couldn't find the weather for your location. Please try again.`);
            }
            return await response.json();
        } catch (error) {
            throw new Error(`Failed to fetch weather data: ${error.message}`);
        }
    }
}

class UI {
    constructor() {
        this.loader = document.querySelector('.loader');
        this.errorMessage = document.querySelector('.error-message');
        this.weatherData = document.querySelector('.weather-data');
        this.cityNameEl = document.querySelector('.city-name');
        this.temperatureEl = document.querySelector('.temperature');
        this.humidityEl = document.querySelector('.humidity');
        this.windSpeedEl = document.querySelector('.wind-speed');
        this.weatherIconEl = document.querySelector('.weather-icon');
        this.datetimeEl = document.querySelector('.datetime');
        this.weatherDescriptionEl = document.querySelector('.weather-description');
        this.feelsLikeEl = document.querySelector('.feels-like');
        this.sunriseEl = document.querySelector('.sunrise');
        this.sunsetEl = document.querySelector('.sunset');
        this.lastUpdatedEl = document.querySelector('.last-updated');
    }

    showLoader() {
        this.loader.classList.remove('hidden');
        this.errorMessage.classList.add('hidden');
        this.weatherData.classList.remove('fade-in');
        this.weatherData.classList.add('hidden');
    }

    hideLoader() {
        this.loader.classList.add('hidden');
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.classList.remove('hidden');
    }

    updateWeatherData(data) {
        const now = new Date();
        this.datetimeEl.textContent = now.toLocaleString();

        const currentCondition = data.current_condition[0];
        const nearestArea = data.nearest_area[0];
        const todayWeather = data.weather[0];

        this.cityNameEl.textContent = `${nearestArea.areaName[0].value}, ${nearestArea.country[0].value}`;
        this.temperatureEl.textContent = `${currentCondition.temp_C}°C`;
        this.humidityEl.textContent = `Humidity: ${currentCondition.humidity}%`;
        
        const windSpeedKmph = parseFloat(currentCondition.windspeedKmph);
        const windSpeedMps = (windSpeedKmph * 1000 / 3600).toFixed(2);
        this.windSpeedEl.textContent = `Wind Speed: ${windSpeedMps} m/s`;

        this.weatherDescriptionEl.textContent = currentCondition.weatherDesc[0].value;
        this.feelsLikeEl.textContent = `Feels like: ${currentCondition.FeelsLikeC}°C`;

        this.sunriseEl.textContent = `Sunrise: ${todayWeather.astronomy[0].sunrise}`;
        this.sunsetEl.textContent = `Sunset: ${todayWeather.astronomy[0].sunset}`;

        this.lastUpdatedEl.textContent = `Last updated: ${currentCondition.observation_time}`;

        this.weatherIconEl.src = currentCondition.weatherIconUrl[0].value;
        this.weatherIconEl.alt = currentCondition.weatherDesc[0].value;

        this.weatherData.classList.remove('hidden');
        this.weatherData.classList.add('fade-in');
    }
}

class WeatherApp {
    constructor(weatherService, ui) {
        this.weatherService = weatherService;
        this.ui = ui;
        this.cityInput = document.querySelector('.city-input');
        this.searchBtn = document.querySelector('.search-btn');
        this.locationBtn = document.querySelector('.location-btn');

        this.addEventListeners();
        this.fetchWeather('London');
    }

    addEventListeners() {
        this.searchBtn.addEventListener('click', () => this.searchWeather());
        this.cityInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                this.searchWeather();
            }
        });
        this.locationBtn.addEventListener('click', () => this.getUserLocation());
    }

    async fetchWeather(city) {
        this.ui.showLoader();
        try {
            const weatherData = await this.weatherService.getWeatherData(city);
            this.ui.updateWeatherData(weatherData);
        } catch (error) {
            this.ui.showError(error.message);
        } finally {
            this.ui.hideLoader();
        }
    }

    async fetchWeatherByCoords(latitude, longitude) {
        this.ui.showLoader();
        try {
            const weatherData = await this.weatherService.getWeatherDataByCoords(latitude, longitude);
            this.ui.updateWeatherData(weatherData);
        } catch (error) {
            this.ui.showError(error.message);
        } finally {
            this.ui.hideLoader();
        }
    }

    searchWeather() {
        const city = this.cityInput.value.trim();
        if (city) {
            this.fetchWeather(city);
        }
    }

    getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    this.fetchWeatherByCoords(latitude, longitude);
                },
                (error) => {
                    this.ui.showError('Unable to retrieve your location. Please grant permission or try searching for a city.');
                }
            );
        } else {
            this.ui.showError('Geolocation is not supported by your browser.');
        }
    }
}

const weatherService = new WeatherService();
const ui = new UI();
const app = new WeatherApp(weatherService, ui);