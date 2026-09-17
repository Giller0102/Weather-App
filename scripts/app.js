'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const DEFAULT_CITY = 'Минск';

    const SEARCH_FORM = document.getElementById('search-form');
    const SEARCH_INPUT = document.getElementById('search-input');
    const WEATHER_RESULT = document.getElementById('weather-result');
    const LOADING_MESSAGE = document.getElementById('loading-message');
    const LOADING_ERROR = document.getElementById('error-message');
    const LOADING_SPINNER = document.getElementById('loading-spinner');

    function showLoading() {
        LOADING_SPINNER.classList.remove('hidden');
        LOADING_SPINNER.classList.add('active');
        LOADING_MESSAGE.classList.remove('hidden');
        WEATHER_RESULT.innerHTML = '';
    }

    function hideLoading() {
        LOADING_SPINNER.classList.add('hidden');
        LOADING_SPINNER.classList.remove('active');
        LOADING_MESSAGE.classList.add('hidden');
    }

    function showError(message = 'Ошибка загрузки') {
        hideLoading();
        LOADING_ERROR.textContent = message;
        LOADING_ERROR.classList.remove('hidden');
        LOADING_ERROR.classList.add('active');
    }

    function hideError() {
        LOADING_ERROR.classList.add('hidden');
        LOADING_ERROR.classList.remove('active');
        LOADING_ERROR.textContent = '';
    }

    function displayWeather(data) {
        const { name, main, weather, wind, sys } = data;
        const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

        WEATHER_RESULT.innerHTML = `
            <div class="weather-card">
                <div class="weather-card-header">
                    <div>
                        <div class="weather-card-city">${name}</div>
                        <div class="weather-card-country">${sys.country}</div>
                    </div>
                    <img src="${icon}" alt="${weather[0].description}" class="weather-icon">
                </div>
                <div class="weather-card-temp">${Math.round(main.temp)}<span>°C</span></div>
                <p style="text-transform: capitalize; color: var(--color-text-secondary);">${weather[0].description}</p>
                <div class="weather-card-details">
                    <div class="weather-detail-item"><span>Ощущается</span><strong>${Math.round(main.feels_like)}°C</strong></div>
                    <div class="weather-detail-item"><span>Влажность</span><strong>${main.humidity}%</strong></div>
                    <div class="weather-detail-item"><span>Ветер</span><strong>${wind.speed} м/с</strong></div>
                    <div class="weather-detail-item"><span>Давление</span><strong>${main.pressure} гПа</strong></div>
                </div>
            </div>
        `;
    }

    async function fetchWeather(city = DEFAULT_CITY) {
        try {
            showLoading();
            hideError();

            const url = `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=ru`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP-ошибка: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            hideLoading();
            displayWeather(data);
        } catch (error) {
            showError(`Не удалось получить данные о погоде: ${error.message}`);
            console.error(error);
        }
    }

    SEARCH_FORM.addEventListener('submit', (e) => {
        e.preventDefault();
        const city = SEARCH_INPUT.value.trim();
        if (!city) {
            showError('Введите название города');
            return;
        }
        fetchWeather(city);
        SEARCH_INPUT.value = '';
    });

    fetchWeather(DEFAULT_CITY);
});
