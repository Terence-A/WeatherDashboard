// bring over elements
const searchFormContainer = document.querySelector("#search-form-container");
const rightContainer = document.querySelector("#right-container");
const searchBtn = document.querySelector("#search-btn");
const lgCardName = document.querySelector("#lg-card-name");
const cityName = document.querySelector("input");
const lgCardTemp = document.querySelector("#lg-card-temp");
const lgCardWind = document.querySelector("#lg-card-wind");
const lgCardHumidity = document.querySelector("#lg-card-humidity");

// rightContainer.classList = "hide";

// search button
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  lgCardName.textContent = `${cityName.value}`;
  lgCardTemp.textContent += " placeholder";
  lgCardWind.textContent += " placeholder";
  lgCardHumidity.textContent += " placeholder";
});
