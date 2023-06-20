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
// let city = "";
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=";
const APIKey = "6044189ddce27455149e9c7b8ffa95a3";

// queryURL = `${queryURL}${city}&appid=${APIKey}`;

// console.log(queryURL);
// console.log(city);

rightContainer.classList.add("hide");

// $("#card-5-temp").text(`Temp: Hot`);

// search button
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let city = cityName.value;
  queryURL = `${queryURL}${city}&units=metric&appid=${APIKey}`;
  rightContainer.classList.remove("hide");
  console.log(city);

  fetch(queryURL)
    .then((resolve) => {
      return resolve.json();
    })
    .then((data) => {
      console.log(data.coord);
      console.log(data);
      lgCardName.textContent = `${cityName.value} ${currentDay} ${data.weather[0].icon}`;
      lgCardTemp.textContent += ` ${data.main.temp} °C`;
      lgCardWind.textContent += ` ${data.wind.speed} KPH`;
      lgCardHumidity.textContent += ` ${data.main.humidity} %`;
      // card1date.textContent = `${currentDay}`;

      let lat = data.coord.lat;
      let lon = data.coord.lon;

      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${APIKey}`
      )
        .then((resolve) => {
          return resolve.json();
        })
        .then((fivedaydata) => {
          console.log(fivedaydata);
          for (let i = 7; i < fivedaydata.list.length; i += 7) {
            let divEl = document.createElement("div");
            divEl.classList.add("sm-card");
            divEl.innerHTML = `
            <p class="h4" id="card-7-date">${fivedaydata.list[i].dt_txt.slice(
              0,
              10
            )}</p>
            <p class="h4 card-icon" id="card-1-icon">
              <span class="material-symbols-outlined"> ${
                fivedaydata.list[i].weather[0].icon
              } </span>
            </p>
            <p class="h6" id="card-1-temp">Temp: ${
              fivedaydata.list[i].main.temp
            } °C</p>
            <p class="h6" id="card-1-wind">Wind: ${
              fivedaydata.list[i].wind.speed
            } KPH</p>
            <p class="h6" id="card-1-humidity">Humidity: ${
              fivedaydata.list[i].main.humidity
            } %</p>`;
            smCardContainer.appendChild(divEl);
          }
        });
    });

  // console.log(fivedaydata, "5 day data"));

  // 5 day forecaset
  // for (let i = 0; i < smCardDates.length; i++)
  //   smCardDates.textContent[i] = fivedaydata.list[i].dt_txt;
  // card1date.textContent = fivedaydata.list;
});
