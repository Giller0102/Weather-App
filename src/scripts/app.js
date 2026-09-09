'use strict';

document.addEventListener('load', (e) => {
    // reset stantart behavior of brawser
    e.preventDefault();

    // API
    const API_KEY = '9c585f20127a8de415836513d46b2dd3';
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
    const DEFAULT_CITY = 'Minsk';

    // DOM-elements
    const SEARCH_FORM = document.getElementById('search-form');
    const SEARCH_INPUT = document.getElementById('search-input');
    const SEARCH_BUTTON = document.getElementById('search-btn');
    const WEATHER_RESULT = document.getElementById('weather-result');
    const LOADING_MESSAGE = document.getElementById('loading-message');
    const LOADING_ERROR = document.getElementById('error-message');

    // API request
    async function fetchWeather() {
        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`HTTP-error: ${error.status} ${error.statusMessage}`);
            }

            const data = await response.json();
            console.log(data);
        } catch(error) {
            console.error('Error: ', error.message);
        }
    }

    // 
})