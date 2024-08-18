export async function fetchWeatherData() {
  const apiKey = "e8f8e0a11f9443248c0210203241708";
  const city = "Wesendorf";
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&lang=de`;

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
}

fetchWeatherData();
