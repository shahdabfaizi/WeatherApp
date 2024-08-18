// Zeit
export function clock() {
  const timeDiv = document.getElementById("time");
  const icon = document.getElementById("img");

  if (timeDiv && icon) {
    const timeNow = new Date();
    const hours = timeNow.getHours().toString().padStart(2, "0");
    const minutes = timeNow.getMinutes().toString().padStart(2, "0");

    timeDiv.innerHTML = `${hours}:${minutes}`;

    //    if (parseInt(hours) >= 19) {
    //      icon.style.backgroundPosition = "-135px -290px";
    //    } else {
    //      icon.style.backgroundPosition = "-140px -400px";
    //    }
  }
}

setInterval(clock, 1000);
clock();
