document
  .querySelector(".search-bar")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const city = document.querySelector('input[name="search"]').value;

    if (city) {
      fetchWeatherData(city);
    } else {
      alert("Bitte geben Sie einen gültigen Stadtnamen ein.");
    }
  });

export async function fetchWeatherData(lat, lon) {
  const apiKey = "d6beb454ce5c492bb1a200532240509";
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=2&lang=de`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("Wetterdaten:", data);

    if (!data || !data.current || !data.location) {
      throw new Error("Ungültige Wetterdaten");
    }

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

    // Anzeige der täglichen Vorhersage
    const forecastDays = data.forecast.forecastday;
    forecastDays.forEach((day, index) => {
      const date = day.date;
      const maxTemp = day.day.maxtemp_c;
      const minTemp = day.day.mintemp_c;
      const conditionText = day.day.condition.text;
      const conditionIcon = day.day.condition.icon;

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

    // Weitere Wetterinfos
    const feelsLike = data.current.feelslike_c;
    const wind = `${data.current.wind_kph} km/h ${data.current.wind_dir}`;
    const humidity = `${data.current.humidity}%`;
    const airQuality = data.current.air_quality?.pm2_5 || "Keine Daten";

    const moreInfo = `
      <p>Gefühlte Temperatur: ${feelsLike}°C</p>
      <p>Wind: ${wind}</p>
      <p>Luftfeuchtigkeit: ${humidity}</p>
      <p>Luftqualität (PM2.5): ${airQuality}</p>
    `;
    document.getElementById("moreInfo").innerHTML = moreInfo;

    // Anzeige der stündlichen Vorhersage für die nächsten 24 Stunden
    const currentHour = new Date().getHours(); // Aktuelle Stunde
    const hourlyData = [...forecastDays[0].hour, ...forecastDays[1].hour]; // Kombiniere die Stunden von heute und morgen
    const next24Hours = hourlyData.filter((hourData) => {
      const hour = new Date(hourData.time).getHours();
      const day = new Date(hourData.time).getDate();
      return (
        (hour >= currentHour && day === new Date().getDate()) ||
        (day === new Date().getDate() + 1 && hour < currentHour)
      );
    });

    const forecastContainer = document.getElementById("forecast");

    // Leere das Container-Element
    forecastContainer.innerHTML = "";

    next24Hours.forEach((hourData) => {
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
    alert("Fehler beim Abrufen der Wetterdaten.");
  }
}

export async function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherData(lat, lon);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          alert(
            "Du hast den Standortzugriff blockiert. Bitte erlaube den Zugriff in deinen Browsereinstellungen."
          );
        } else {
          alert("Fehler beim Abrufen des Standorts: " + error.message);
        }
      }
    );
  } else {
    alert("Geolocation wird von diesem Browser nicht unterstützt.");
  }
}

getLocation();
