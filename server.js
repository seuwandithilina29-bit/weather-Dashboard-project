require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/weather", async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.json({ error: "City required" });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`
        );

        res.json({
            city: response.data.name,
            temp: response.data.main.temp,
            description: response.data.weather[0].description
        });

    } catch (error) {
        res.json({ error: "City not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});