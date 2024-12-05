const apikey = "b4d5deeffda6e45ebc03953e551a4429";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const weatherIcon = document.querySelector(".weather-icon");

// Event listener for search button
document.querySelector("button").addEventListener("click", () => {
    const city = document.querySelector("input").value;
    checkWeather(city);
});

document.querySelector("input").addEventListener("keypress", (e) => {
    if(e.key=="Enter"){
        const city=e.target.value;
        checkWeather(city);
    }
    checkWeather(city);
});


async function checkWeather(city = "VIZAG") {
    if (!city) {
        console.error("Please enter a city name");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apikey}`);
        
        // if (!response.ok) {
        //     throw new Error("City not found");
        // }
        
        const data = await response.json();

        if (data.name && data.main && data.main.temp && data.weather.length > 0) {
            document.querySelector("#city").textContent = data.name;
            document.querySelector("#temperature").textContent = `${Math.round(data.main.temp)}°Celsius`;

            
        } 
        // else {
        //     throw new Error("Incomplete weather data");
        // }
    } catch (error) {
        console.error("Error fetching weather:", error);
        alert(error.message);
    }
}
checkWeather();
