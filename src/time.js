// Zeit
export function clock() {
  const timeDiv = document.getElementById("time");
  const icon = document.getElementById("img");

  if (timeDiv && icon) {
    const timeNow = new Date();
    const hours = timeNow.getHours().toString().padStart(2, "0");
    const minutes = timeNow.getMinutes().toString().padStart(2, "0");

    timeDiv.innerHTML = `${hours}:${minutes}`;

    if (parseInt(hours) >= 19) {
      icon.style.backgroundPosition = "-140px -400px";
    } else {
      icon.style.backgroundPosition = "-130px -280px";
    }
  } else {
    console.error("Element mit der ID 'time' oder 'img' wurde nicht gefunden.");
  }
}

setInterval(clock, 1000);
clock();
