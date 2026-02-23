async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const result = document.getElementById("result");

    if (!city) {
        result.innerHTML = "Enter a city name";
        return;
    }

    const API_KEY = "YOUR_OPENWEATHER_API_KEY"; // 🔥 Put your key here

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        if (data.cod !== 200) {
            result.innerHTML = data.message;
            return;
        }

        result.innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Description: ${data.weather[0].description}</p>
        `;
    } catch (err) {
        result.innerHTML = "Error fetching data";
    }
}