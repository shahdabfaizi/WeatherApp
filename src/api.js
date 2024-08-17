export async function fetchWeatherData() {
  const apiKey = "e8f8e0a11f9443248c0210203241708";
  const city = "Wesendorf";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=de`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const temperature = data.current.temp_c;
    const condition = data.current.condition.text;

    document.getElementById("temperature").innerText = `${temperature}°C`;
    document.getElementById("infoNew").innerText = condition;
  } catch (error) {
    console.error("Fehler beim Abrufen der Wetterdaten:", error);
  }
}

fetchWeatherData();
