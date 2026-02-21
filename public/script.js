async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const result = document.getElementById("result");

    if (!city) {
        result.innerHTML = "Enter a city name";
        return;
    }

    try {
        const response = await fetch(`/api/weather?city=${city}`);
        const data = await response.json();

        if (data.error) {
            result.innerHTML = data.error;
            return;
        }

        result.innerHTML = `
            <h3>${data.city}</h3>
            <p>Temperature: ${data.temp} °C</p>
            <p>Description: ${data.description}</p>
        `;
    } catch (err) {
        result.innerHTML = "Error fetching data";
    }
}