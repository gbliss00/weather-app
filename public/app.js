// Personal API Key for OpenWeatherMap API
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&units=metric&APPID=908b86645af82e72d94182a09ec5bc7b";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();


//Get data from external resource
const getData = async url => {
  const result = await fetch(url);
  const data = await result.json();
  return data;
};

//Post data server
const postData = async (url, mydata) => {
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(mydata)
  });
  const data = await result.json();
  return data;
};

// Get object back from server

//Update UI

const seeResponseInUI = resultData => {
  console.log(resultData);
  document.getElementById("date").textContent =
    "Date: " + resultData.date;
  document.getElementById(
    "temp"
  ).textContent = `Temp: ${resultData.temperature}℃`;
  document.getElementById("content").textContent = `You're feeling: ${resultData.feelings}!`;
  document.getElementById(
    "city"
  ).innerHTML = `<p style="text-decoration: underline;">City: ${resultData.cityName}</p>`;
};


const allMyFunction = async () => {
  let zipValue = document.getElementById("zip").value || 33101;

  let feeling = document.getElementById("feelings").value || "Good";

  //Get data from external resource Openweather.

  const getResultFromApi = await getData(baseURL + zipValue + apiKey);

  let anObj = {
    date: newDate,
    feel: feeling,
    temp: getResultFromApi.main.temp,
    city: getResultFromApi.name
  };

  let postResultFromServer = await postData("/sendData", anObj);
  console.log(postResultFromServer);

  let getResultFromServer = await getData("/getData");
  console.log(getResultFromServer);

  seeResponseInUI(getResultFromServer);
};

document.getElementById("generate").addEventListener("click", allMyFunction);
