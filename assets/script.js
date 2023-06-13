// bring over elements
const searchFormContainer = document.querySelector("#search-form-container");
const rightContainer = document.querySelector("#right-container");
const searchBtn = document.querySelector("#search-btn");
const lgCardName = document.querySelector("#lg-card-name");
const cityName = document.querySelector("input");
const lgCardTemp = document.querySelector("#lg-card-temp");
const lgCardWind = document.querySelector("#lg-card-wind");
const lgCardHumidity = document.querySelector("#lg-card-humidity");
const card1date = document.querySelector("#card-1-date");
const card2date = document.querySelector("#card-2-date");
const card3date = document.querySelector("#card-3-date");
const card4date = document.querySelector("#card-4-date");
const card5date = document.querySelector("#card-5-date");
let currentDay = dayjs().format("M/D/YYYY");

// rightContainer.classList = "hide";

$("#card-5-temp").text(`Temp: Hot`);
// search button
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  lgCardName.textContent = `${cityName.value} ${currentDay}`;
  lgCardTemp.textContent += " placeholder";
  lgCardWind.textContent += " placeholder";
  lgCardHumidity.textContent += " placeholder";
  card1date.textContent = `${currentDay}`;
});

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
