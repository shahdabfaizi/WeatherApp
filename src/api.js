export async function fetchWeatherData() {
  const apiKey = "d6beb454ce5c492bb1a200532240509";
  const city = "Wolfsburg";
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&lang=de`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const temperature = data.current.temp_c;
    const condition = data.current.condition.text;
    const cityName = data.location.name;
    const iconUrl = data.current.condition.icon;

    document.getElementById("temperature").innerText = `${temperature}°C`;
    document.getElementById("infoNew").innerText = condition;
    document.getElementById("CityName").innerText = cityName;
    document.getElementById(
      "img"
    ).innerHTML = `<img src="https:${iconUrl}" alt="${condition}" />`;

    const forecastDays = data.forecast.forecastday;

    forecastDays.forEach((day, index) => {
      const date = day.date;
      const maxTemp = day.day.maxtemp_c;
      const minTemp = day.day.mintemp_c;
      const conditionText = day.day.condition.text;
      const conditionIcon = day.day.condition.icon;
      const days = document.createElement("div");
      days.classList.add("dayBox");

      document.getElementById(`day${index + 1}-date`).innerText = date;
      document.getElementById(
        `day${index + 1}-temp`
      ).innerText = `${maxTemp}°C / ${minTemp}°C`;
      document.getElementById(`day${index + 1}-condition`).innerText =
        conditionText;
      document.getElementById(
        `day${index + 1}-icon`
      ).innerHTML = `<img src="https:${conditionIcon}" alt="${conditionText}" />`;
    });

    const hourlyData = forecastDays[0].hour;
    const forecastContainer = document.getElementById("forecast");

    hourlyData.forEach((hourData) => {
      const hourBlock = document.createElement("div");
      hourBlock.classList.add("timeBox");

      const hourTime =
        new Date(hourData.time).getHours().toString().padStart(2, "0") + ":00";
      const hourTemp = `${hourData.temp_c}°C`;
      const hourCondition = hourData.condition.text;
      const hourIconUrl = hourData.condition.icon;

      hourBlock.innerHTML = `
      <div>
        <h3 class="hour-time">${hourTime}</h3>
        <div class="hour-icon">
          <img src="https:${hourIconUrl}" alt="${hourCondition}" />
        </div>
        <p class="hour-temp">${hourTemp}</p>
        <p class="hour-condition">${hourCondition}</p>
      </div>`;
      forecastContainer.appendChild(hourBlock);
    });
  } catch (error) {
    console.error("Fehler beim Abrufen der Wetterdaten:", error);
  }
}

fetchWeatherData();
