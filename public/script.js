async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const result = document.getElementById("result");

    if (!city) {
        result.innerHTML = "Enter a city name";
        return;
    }

    const API_KEY = "e8cdb88cb69c6f32cdcd2d5b3507241b";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        if (data.cod !== 200) {
            result.innerHTML = data.message;
            result.className = "";
            document.body.style.background = "linear-gradient(135deg, #6dd5ed, #2193b0)";
            return;
        }

        // Choose background & icon based on weather
        const weather = data.weather[0].main.toLowerCase();
        let bgGradient = "";
        let icon = "";

        if (weather.includes("cloud")) {
            bgGradient = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
            icon = "☁️";
        } else if (weather.includes("rain") || weather.includes("drizzle")) {
            bgGradient = "linear-gradient(135deg, #4e54c8, #8f94fb)";
            icon = "🌧️";
        } else if (weather.includes("sun") || weather.includes("clear")) {
            bgGradient = "linear-gradient(135deg, #f6d365, #fda085)";
            icon = "☀️";
        } else if (weather.includes("snow")) {
            bgGradient = "linear-gradient(135deg, #e0eafc, #cfdef3)";
            icon = "❄️";
        } else {
            bgGradient = "linear-gradient(135deg, #6dd5ed, #2193b0)";
            icon = "🌤️";
        }

        document.body.style.background = bgGradient;

        result.innerHTML = `
            <div class="weather-icon">${icon}</div>
            <h3>${data.name}</h3>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Description: ${data.weather[0].description}</p>
        `;
        result.className = "show-weather";
    } catch (err) {
        result.innerHTML = "Error fetching data";
        document.body.style.background = "linear-gradient(135deg, #6dd5ed, #2193b0)";
        result.className = "";
    }
}