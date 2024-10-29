document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll(".nav__link");

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
    nav.classList.toggle("open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("open");
      nav.classList.remove("open");

      const cityName = link.getAttribute("data-city");
      if (cityName) {
        showWeatherForCity(cityName);
      }
    });
  });

  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  showSlide(currentSlide);
  setInterval(nextSlide, 5000);
});

function showWeatherForCity(cityName) {
  document.getElementById("CityName").innerText = cityName;
  console.log(`Wetter für ${cityName} anzeigen`);
}

document.getElementById("saveCityBtn").addEventListener("click", function () {
  const cityName = document.getElementById("CityName").innerText;

  let savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];

  const cityExists = savedCities.some((city) => city === cityName);

  if (!cityExists) {
    savedCities.push(cityName);
    localStorage.setItem("savedCities", JSON.stringify(savedCities));
    updateCityList();
  } else {
    console.log(`Die Stadt "${cityName}" ist bereits gespeichert.`);
  }
});

function updateCityList() {
  const cityList = document.getElementById("cityList");
  let savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];

  cityList.innerHTML = "";

  savedCities.forEach((city) => {
    let listItem = document.createElement("li");
    listItem.classList.add("nav__item");
    listItem.innerHTML = `<a class="nav__link" data-city="${city}">${city}</a>`;
    cityList.appendChild(listItem);
  });

  addCityLinkEventListeners();
}

export function addCityLinkEventListeners() {
  const cityLinks = document.querySelectorAll(".nav__link[data-city]");
  cityLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const cityName = this.getAttribute("data-city");
      showWeatherForCity(cityName);
    });
  });
}

window.onload = function () {
  updateCityList();
};
