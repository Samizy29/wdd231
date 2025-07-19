// scripts/weather.js
const apiKey = '4226f696ce953a56f708e147d19f7104'; // Get from OpenWeatherMap
const city = 'Nigeria'; // Or specific city in Nigeria
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

// DOM Elements
const currentTemp = document.getElementById('current-temp');
const weatherDesc = document.getElementById('weather-desc');
const weatherIcon = document.getElementById('weather-icon');
const forecastDiv = document.getElementById('forecast');

async function fetchWeather() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('Weather fetch error:', error);
        displayError();
    }
}

function displayWeather(data) {
    // Current weather
    const current = data.list[0];
    currentTemp.textContent = Math.round(current.main.temp);
    weatherDesc.textContent = current.weather[0].description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${current.weather[0].icon}.png`;
    weatherIcon.alt = current.weather[0].description;

    // 3-day forecast
    forecastDiv.innerHTML = '<h3>3-Day Forecast</h3>';
    const forecastContainer = document.createElement('div');
    forecastContainer.className = 'forecast-days';
    
    // Get forecasts for noon each day (every 8th item in the array)
    for (let i = 1; i <= 3; i++) {
        const forecast = data.list[i * 8];
        const dayDiv = document.createElement('div');
        dayDiv.className = 'forecast-day';
        dayDiv.innerHTML = `
            <p>Day ${i}</p>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" 
                 alt="${forecast.weather[0].description}">
            <p>${Math.round(forecast.main.temp)}°F</p>
        `;
        forecastContainer.appendChild(dayDiv);
    }
    forecastDiv.appendChild(forecastContainer);
}

function displayError() {
    currentTemp.textContent = '--';
    weatherDesc.textContent = 'Weather data unavailable';
    forecastDiv.innerHTML = '<p>Forecast not available</p>';
}

// Initialize weather on page load
document.addEventListener('DOMContentLoaded', fetchWeather);