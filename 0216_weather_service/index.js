const imageURL = "https://picsum.photos/1280/720";
const key = "8f08799fdbd6561a7f0e1d6eea034df4";
// API 호출 방법
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// 도시명으로 찾는 방법
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

async function setRenderBackground() {
  const response = await axios.get(imageURL, { responseType: "blob" });
  const body = document.querySelector("body");
  body.style.backgroundImage = `url(${URL.createObjectURL(response.data)})`;
}

function setTime() {
  const timer = document.querySelector(".timer");
  setInterval(() => {
    const date = new Date();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    let h, m, s;

    if (hours < 10) h = "0" + hours;
    else h = hours;

    if (minutes < 10) m = "0" + minutes;
    else m = minutes;

    if (seconds < 10) s = "0" + seconds;
    else s = seconds;

    timer.textContent = `${h}:${m}:${s}`;
    setGreeting(hours);

    // timer.textContent = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  });
}

function setGreeting(hour) {
  const timerContent = document.querySelector(".timer-content");

  let greeting;

  if (hour >= 5 && hour < 12) greeting = "morning";
  else if (hour >= 12 && hour < 18) greeting = "afternoon";
  else if (hour >= 18 && hour < 22) greeting = "evening";
  else if (hour >= 22 || hour < 5) greeting = "night";

  timerContent.textContent = `Good ${greeting}, ssafy`;
}

function getMemo() {
  const memo = document.querySelector(".memo");
  const memoValue = localStorage.getItem("todo");
  memo.textContent = memoValue;
}

function setMemo() {
  const memoInput = document.querySelector(".memo-input");
  memoInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter" && e.currentTarget.value) {
      localStorage.setItem("todo", e.currentTarget.value);
      getMemo();

      memoInput.value = "";
    }
  });
}

function deleteMemo() {
  const memo = document.querySelector(".memo");
  memo.addEventListener("click", (e) => {
    localStorage.removeItem("todo");
    e.target.textContent = "";
  });
}

function getPosition(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

async function renderWeather() {
  try {
    const position = await getPosition();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let response;
    if (latitude && longitude) {
      response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}`
      );
    } else {
      response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=${key}`
      );
    }

    const weatherData = response.data;

    const weatherList = weatherData.list.filter(
      (cur) => cur.dt_txt.indexOf("18:00:00") > 0
    );

    modalIcon(matchIcon(weatherList[0].weather[0].main));

    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = weatherList
      .map((e) => weatherWrapperComponent(e))
      .join("");
  } catch (error) {
    alert(error);
  }
}

function matchIcon(weatherData) {
  if (weatherData === "Clear") return "./images/039-sun.png";
  if (weatherData === "Clouds") return "./images/001-cloud.png";
  if (weatherData === "Rain") return "./images/003-rainy.png";
  if (weatherData === "Snow") return "./images/006-snowy.png";
  if (weatherData === "Thunderstorm") return "./images/008-storm.png";
  if (weatherData === "Drizzle") return "./images/031-snowflake.png";
  if (weatherData === "Atmosphere") return "./images/033-hurricane.png";
}

function modalIcon(todayWeather) {
  const modalBtn = document.querySelector(".modal-button");

  modalBtn.style.backgroundImage = `url(${todayWeather})`;
}

function changeToCelsius(temp) {
  return (temp - 273.15).toFixed(1);
}

function weatherWrapperComponent(e) {
  console.log(e);
  return `
        <div class="card bg-transparent flex-grow-1 m-2">
            <div class="card-header text-white">
                ${e.dt_txt.split(" ")[0]}
            </div>
            <div class="card-body d-flex">
                <div class="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
                    <h5 class="card-title text-white">${e.weather[0].main}</h5>
                    <img class="weather-img" src="${matchIcon(
                      e.weather[0].main
                    )}">
                    <p class="card-text text-white">${changeToCelsius(
                      e.main.temp
                    )}℃</p>
                </div>
            </div>
        </div>
    `;
}

setRenderBackground();
setTime();
getMemo();
setMemo();
deleteMemo();

renderWeather();

setInterval(() => {
  setRenderBackground();
}, 5000);
