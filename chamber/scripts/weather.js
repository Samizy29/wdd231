// API Key - Replace with your actual OpenWeatherMap API key
const apiKey = 'your_api_key_here';
const city = 'Timbuktu';
const units = 'imperial'; // For Fahrenheit

// DOM Elements
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#weather-desc');
const forecastDiv = document.querySelector('#forecast');

// Fetch Weather Data
async function getWeather() {
    try {
        // Current Weather
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`
        );
        const currentData = await currentResponse.json();
        
        // 3-Day Forecast
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`
        );
        const forecastData = await forecastResponse.json();
        
        displayWeather(currentData, forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        displayError();
    }
}

// Display Weather Data
function displayWeather(currentData, forecastData) {
    // Current Weather
    currentTemp.textContent = Math.round(currentData.main.temp);
    weatherDesc.textContent = currentData.weather[0].description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${currentData.weather[0].icon}.png`;
    weatherIcon.alt = currentData.weather[0].description;
    
    // 3-Day Forecast
    forecastDiv.innerHTML = '';
    const dailyForecasts = getDailyForecasts(forecastData.list);
    
    dailyForecasts.slice(0, 3).forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'forecast-day';
        
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        dayDiv.innerHTML = `
            <p><strong>${dayName}</strong></p>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
            <p>${Math.round(day.main.temp)}°F</p>
        `;
        
        forecastDiv.appendChild(dayDiv);
    });
}

// Helper function to get one forecast per day
function getDailyForecasts(forecastList) {
    const forecastsByDay = {};
    
    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!forecastsByDay[date] || item.dt_txt.includes('12:00:00')) {
            forecastsByDay[date] = item;
        }
    });
    
    return Object.values(forecastsByDay);
}

// Error Handling
function displayError() {
    forecastDiv.innerHTML = '<p class="error">Unable to load weather data. Please try again later.</p>';
}

// Initialize
getWeather();