// bring over elements
const rightContainer = document.querySelector("#right-container");
const searchBtn = document.querySelector("#search-btn");
const lgCardName = document.querySelector("#lg-card-name");
const cityName = document.querySelector("input");
const lgCardTemp = document.querySelector("#lg-card-temp");
const lgCardWind = document.querySelector("#lg-card-wind");
const lgCardHumidity = document.querySelector("#lg-card-humidity");
const smCardContainer = document.querySelector(".sm-card-container");
const savedCityBtn = document.querySelector(".saved-city-btn");
let currentDay = dayjs().format("YYYY/M/D/");
let cityArr = [];
let divEl = "";

// endpoint
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=";

// hide cards
rightContainer.classList.add("hide");

// search button
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let city = cityName.value;
  if (!city) {
    return;
  }

  // append new search city
  if (cityArr.lenth === 0 || cityArr.includes(city)) {
    return;
  } else {
    cityArr.push(city);
    localStorage.setItem("savedCities", JSON.stringify(cityArr));
    let newLi = document.createElement("li");
    newLi.classList.add("saved-city-btn");
    let btn = document.createElement("button");
    btn.classList.add("saved-city-btn");
    btn.innerText = city;
    newLi.append(btn);
    savedCityBtn.appendChild(newLi);
  }

  //declair endpoint
  let queryURL1 = `${queryURL}${city}&units=metric&appid=${APIKey}`;
  rightContainer.classList.remove("hide");

  fetch(queryURL1)
    .then((resolve) => {
      return resolve.json();
    })
    .then((data) => {
      let currentDayWeather = JSON.stringify(data);
      localStorage.setItem("currentStats", currentDayWeather);
      let currentStats = JSON.parse(localStorage.getItem("currentStats"));
      let iconImg = document.createElement("img");
      iconImg.src = `https://openweathermap.org/img/wn/${currentStats.weather[0].icon}@2x.png`;
      lgCardName.textContent = `${cityName.value} ${currentDay}`;
      lgCardName.append(iconImg);
      lgCardTemp.textContent = `Temp: ${currentStats.main.temp} °C`;
      lgCardWind.textContent = `Speed: ${currentStats.wind.speed} KPH`;
      lgCardHumidity.textContent = `Humidity: ${currentStats.main.humidity} %`;

      let lat = data.coord.lat;
      let lon = data.coord.lon;

      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${APIKey}`
      )
        .then((resolve) => {
          return resolve.json();
        })

        .then((fivedaydata) => {
          let weatherData = JSON.stringify(fivedaydata);
          localStorage.setItem("weatherStats", weatherData);
          let weatherStats = JSON.parse(localStorage.getItem("weatherStats"));

          while (smCardContainer.firstChild) {
            smCardContainer.removeChild(smCardContainer.lastChild);
          }
          for (let i = 7; i < weatherStats.list.length; i += 8) {
            divEl = document.createElement("div");
            divEl.classList.add("sm-card");

            divEl.innerHTML = `
            <p class="h5" id="card-7-date">${weatherStats.list[i].dt_txt.slice(
              0,
              10
            )}</p>
            <p class="h5 card-icon" id="card-1-icon">
              <span class="material-symbols-outlined"> 
               <img src = "https://openweathermap.org/img/wn/${
                 weatherStats.list[i].weather[0].icon
               }@2x.png" >
               </span>
            </p>
            <p class="h6" id="card-1-temp">Temp: ${
              weatherStats.list[i].main.temp
            } °C</p>
            <p class="h6" id="card-1-wind">Wind: ${
              weatherStats.list[i].wind.speed
            } KPH</p>
            <p class="h6" id="card-1-humidity">Humidity: ${
              weatherStats.list[i].main.humidity
            } %</p>`;
            smCardContainer.appendChild(divEl);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    });
});

savedCityBtn.addEventListener("click", function (e) {
  city = e.target.textContent;

  let queryURL1 = `${queryURL}${city}&units=metric&appid=${APIKey}`;
  rightContainer.classList.remove("hide");

  fetch(queryURL1)
    .then((resolve) => {
      return resolve.json();
    })
    .then((data) => {
      let currentDayWeather = JSON.stringify(data);
      localStorage.setItem("currentStats", currentDayWeather);
      let currentStats = JSON.parse(localStorage.getItem("currentStats"));
      let iconImg = document.createElement("img");
      iconImg.src = `https://openweathermap.org/img/wn/${currentStats.weather[0].icon}@2x.png`;
      lgCardName.textContent = `${city} ${currentDay}`;
      lgCardName.append(iconImg);
      lgCardTemp.textContent = `Temp: ${currentStats.main.temp} °C`;
      lgCardWind.textContent = `Speed: ${currentStats.wind.speed} KPH`;
      lgCardHumidity.textContent = `Humidity: ${currentStats.main.humidity} %`;

      let lat = data.coord.lat;
      let lon = data.coord.lon;

      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${APIKey}`
      )
        .then((resolve) => {
          return resolve.json();
        })

        .then((fivedaydata) => {
          let weatherData = JSON.stringify(fivedaydata);
          localStorage.setItem("weatherStats", weatherData);
          let weatherStats = JSON.parse(localStorage.getItem("weatherStats"));

          while (smCardContainer.firstChild) {
            smCardContainer.removeChild(smCardContainer.lastChild);
          }
          for (let i = 7; i < weatherStats.list.length; i += 8) {
            divEl = document.createElement("div");
            divEl.classList.add("sm-card");

            divEl.innerHTML = `
            <p class="h5" id="card-7-date">${weatherStats.list[i].dt_txt.slice(
              0,
              10
            )}</p>
            <p class="h5 card-icon" id="card-1-icon">
              <span class="material-symbols-outlined"> 
               <img src = "https://openweathermap.org/img/wn/${
                 weatherStats.list[i].weather[0].icon
               }@2x.png" >
               </span>
            </p>
            <p class="h6" id="card-1-temp">Temp: ${
              weatherStats.list[i].main.temp
            } °C</p>
            <p class="h6" id="card-1-wind">Wind: ${
              weatherStats.list[i].wind.speed
            } KPH</p>
            <p class="h6" id="card-1-humidity">Humidity: ${
              weatherStats.list[i].main.humidity
            } %</p>`;
            smCardContainer.appendChild(divEl);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    });
});
