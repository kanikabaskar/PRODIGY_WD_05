const apiKey = '6991c9f98ec55a60bdfbb05a29476406'; 

document.getElementById('fetch-weather-btn').addEventListener('click', () => {
    const location = document.getElementById('location-input').value.trim();
    if (location) {
        fetchWeather(location);
    } else {
        alert('Please enter a location!');
    }
});

function fetchWeather(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    console.error('Error response:', errorData);
                    throw new Error(`Error ${response.status}: ${errorData.message}`);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('API response:', data); 
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert(`Failed to fetch weather data. Please try again later.`);
        });
}

function displayWeather(data) {
    if (!data || data.cod !== 200) {
        alert('Location not found. Please try another location.');
        return;
    }

    const locationName = document.getElementById('location-name');
    const weatherDescription = document.getElementById('weather-description');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');

    locationName.textContent = `Location: ${data.name}, ${data.sys.country}`;
    weatherDescription.textContent = `Weather: ${data.weather[0].description}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}
