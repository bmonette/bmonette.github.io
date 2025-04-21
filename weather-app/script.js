document.getElementById('weatherForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const city = document.getElementById('cityInput').value.trim();
    if (!city) return;
  
    getWeather(city);
});
  
  function getWeather(city) {
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`)
      .then(response => {
        if (!response.ok) throw new Error("City not found");
        return response.json();
      })
      .then(data => {
        if (!data.results || data.results.length === 0) {
          throw new Error("City not found");
        }
  
        const { latitude, longitude, name, country } = data.results[0];
  
        return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
          .then(response => response.json())
          .then(weatherData => {
            const { temperature, windspeed, weathercode } = weatherData.current_weather;
            const emoji = getWeatherEmoji(weathercode);
  
            document.getElementById('weatherResult').innerHTML = `
            <div class="weather-flex">
                <div class="weather-emoji">${emoji}</div>
                <div class="weather-text">
                    <p><strong>${name}, ${country}</strong></p>
                    <p>Temperature: ${temperature}°C</p>
                    <p>Wind Speed: ${windspeed} km/h</p>
                </div>
            </div>
            `;

          });
      })
      .catch(error => {
        document.getElementById('weatherResult').innerHTML = `<p style="color:red;">${error.message}</p>`;
      });
}


function getWeatherEmoji(code) {
    if ([0].includes(code)) return "☀️";            // Clear sky
    if ([1, 2].includes(code)) return "🌤️";         // Mostly sunny / partly cloudy
    if ([3].includes(code)) return "☁️";            // Overcast
    if ([45, 48].includes(code)) return "🌫️";       // Fog
    if ([51, 53, 55].includes(code)) return "🌦️";   // Drizzle
    if ([61, 63, 65].includes(code)) return "🌧️";   // Rain
    if ([66, 67].includes(code)) return "🌧️❄️";    // Freezing rain
    if ([71, 73, 75, 77].includes(code)) return "❄️"; // Snow
    if ([80, 81, 82].includes(code)) return "🌧️";   // Showers
    if ([85, 86].includes(code)) return "🌨️";       // Heavy snow
    if ([95].includes(code)) return "⛈️";           // Thunderstorm
    if ([96, 99].includes(code)) return "⛈️⚡";     // Thunderstorm with hail
    return "❓"; // Unknown
}
