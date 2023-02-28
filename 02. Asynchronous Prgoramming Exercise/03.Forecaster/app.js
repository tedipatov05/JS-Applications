function attachEvents() {
  let location  = document.getElementById('location');
  let submitBtn = document.getElementById('submit');
  let currentForecastDiv = document.getElementById('current');
  let mainDiv = document.getElementById('forecast');
  let upcoming = document.getElementById('upcoming');

  const weatherSymbols = {
    Sunny: "&#x2600;",
    "Partly sunny": "&#x26C5;",
    Overcast: "&#x2601;",
    Rain: "&#x2614;",
    Degrees: "&#176;",
  };

  submitBtn.addEventListener('click', getForecast);

  async function getForecast(ev){
    ev.preventDefault();

    try { 
      let url = 'http://localhost:3030/jsonstore/forecaster/locations';

      let response = await fetch(url);
      let data = await response.json();
      let city = Array.from(data).filter(a => a.name == location.value)[0];

      if(!city){
        
        throw new Error();
      }
  
      getTodayForecast(city);
  
      getTreeDayForecast(city);
      
    } catch (error) {
      mainDiv.style.display = 'block';
      mainDiv.textContent = "Error";
    }
  }

  async function getTodayForecast(city){

    let url = `http://localhost:3030/jsonstore/forecaster/today/${city.code}`;

    let response = await fetch(url);

    let data = await response.json();
   


    let div = document.createElement('div');
    div.setAttribute('class', 'forecasts');

    div.innerHTML = `
    <span class = "condition symbol"> ${weatherSymbols[data.forecast.condition]} </span>
    <span class= "condition">
      <span class= "forecast-data"> ${data.name} </span>
      <span class= "forecast-data"> ${data.forecast.low + weatherSymbols.Degrees + "/" + data.forecast.high + weatherSymbols.Degrees} </span>
      <span class= "forecast-data"> ${data.forecast.condition} </span>
    </span>`

    currentForecastDiv.appendChild(div);

    mainDiv.style.display = 'block';
    

  }

  async function getTreeDayForecast(city){

    let url = `http://localhost:3030/jsonstore/forecaster/upcoming/${city.code}`

    let response = await fetch(url);
    let data = await response.json();

    let div = document.createElement('div');
    div.setAttribute('class', 'forecast-info');


    for (const info of data.forecast) {
      div.innerHTML += `
    <span class= "upcoming">
      <span class = "symbol"> ${weatherSymbols[info.condition]} </span>
      <span class= "forecast-data"> ${info.low + weatherSymbols.Degrees + "/" + info.high + weatherSymbols.Degrees} </span>
      <span class= "forecast-data"> ${info.condition} </span>
    </span>`
      
    }

    upcoming.appendChild(div);

  }

    
}
  
  attachEvents();