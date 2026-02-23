const axios = require("axios");

exports.handler = async (event) => {
  const city = event.queryStringParameters.city;

  if (!city) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "City required" })
    };
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        city: response.data.name,
        temp: response.data.main.temp,
        description: response.data.weather[0].description
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "City not found" })
    };
  }
};