// bring over elements
const searchFormContainer = document.querySelector("#search-form-container");
const rightContainer = document.querySelector("#right-container");
const searchBtn = document.querySelector("#search-btn");
const lgCardName = document.querySelector("#lg-card-name");
const cityName = document.querySelector("input");
const lgCardTemp = document.querySelector("#lg-card-temp");
const lgCardWind = document.querySelector("#lg-card-wind");
const lgCardHumidity = document.querySelector("#lg-card-humidity");
const card1date = document.querySelector("#card-7-date");
const card2date = document.querySelector("#card-14-date");
const card3date = document.querySelector("#card-21-date");
const card4date = document.querySelector("#card-28-date");
const card5date = document.querySelector("#card-35-date");
let smCardDates = [card1date, card2date, card3date, card4date, card5date];
const smCardContainer = document.querySelector(".sm-card-container");
let currentDay = dayjs().format("M/D/YYYY");
let divEl = "";
// let city = "";
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=";

rightContainer.classList.add("hide");

// $("#card-5-temp").text(`Temp: Hot`);

// search button
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let city = cityName.value;
  let queryURL1 = `${queryURL}${city}&units=metric&appid=${APIKey}`;
  rightContainer.classList.remove("hide");
  console.log(city);

  fetch(queryURL1)
    .then((resolve) => {
      return resolve.json();
    })
    .then((data) => {
      console.log(data.coord);
      console.log(data);

      let currentDayWeather = JSON.stringify(data);
      localStorage.setItem("currentStats", currentDayWeather);
      let currentStats = JSON.parse(localStorage.getItem("currentStats"));
      console.log(currentStats);
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
          console.log(weatherStats);

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
