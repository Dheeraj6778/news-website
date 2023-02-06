let genBTn = document.getElementById("general");
let busBTn = document.getElementById("business");
let techBTn = document.getElementById("tech");
let sportsBTn = document.getElementById("sports");
let entertainmentBtn = document.getElementById("entertainment");
let searchBtn = document.getElementById("search");
let query = document.getElementById("query");
let newstype = document.getElementById("type");
let newsdetails = document.getElementById("details");
newsData = [];
ads = [];
let api_key = "20c625223dd84b2189a3907e7406bd8d";
const HEADLINES_NEWS =
  "https://newsapi.org/v2/top-headlines?country=in&apiKey=";
const GENERAL_NEWS =
  "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=";
const BUSINESS_NEWS =
  "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=";
const SPORTS_NEWS =
  "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=";
const ENTERTAINMENT_NEWS =
  "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=";
const TECHNOLOGY_NEWS =
  "https://newsapi.org/v2/top-headlines?country=in&category=technology&pageSize=8&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

genBTn.addEventListener("click", () => {
  fetchGenNews();
});

techBTn.addEventListener("click", () => {
  fetchTechNews();
});

busBTn.addEventListener("click", () => {
  fetchBusinessNews();
});

sportsBTn.addEventListener("click", () => {
  fetchSportsNews();
});
entertainmentBtn.addEventListener("click", () => {
  fetchEntertainmentNews();
});

query.addEventListener("click", () => {
  fetchQuery();
});
function displayNews() {
  op = "";
  newsData.forEach((news) => {
    op += `
      <div class="card" style="width: 80rem;">
        <div class="card-body">
          <h5 class="card-title">${news.title}</h5>
          <p class="card-text">${news.description}</p>
          <a href="${news.url}" class="card-link">News Source</a>
          <br/>
          <img src="${news.urlToImage}"/ height="200px" width="250px">
        </div>
      </div>
    
    `;
  });
  document.getElementById("output").innerHTML = op;
}

async function fetchGenNews() {
  const resp = await fetch(GENERAL_NEWS + api_key);
  newsData = [];
  if (resp.status >= 200 && resp.status <= 299) {
    //successful
    let jsonResp = await resp.json();
    console.log(jsonResp);
    newsData = jsonResp.articles;
    console.log(newsData);
    //now display the news on the website
    displayNews();
  }
}

function fetchBusinessNews() {
  fetch(BUSINESS_NEWS + api_key)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      newsData = data.articles;
      displayNews();
    })
    .catch((err) => console.log(err));
}

function fetchTechNews() {
  fetch(TECHNOLOGY_NEWS + api_key)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      newsData = data.articles;
      displayNews();
    })
    .catch((err) => console.log(err));
}

function fetchSportsNews() {
  fetch(SPORTS_NEWS + api_key)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      newsData = data.articles;
      displayNews();
    })
    .catch((err) => console.log(err));
}

function fetchEntertainmentNews() {
  fetch(ENTERTAINMENT_NEWS + api_key)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      newsData = data.articles;
      displayNews();
    })
    .catch((err) => console.log(err));
}

function fetchQuery() {
  console.log(query.value);
  fetch(SEARCH_NEWS + encodeURIComponent(query.value) + "&apiKey=" + api_key)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      newsData = data.articles;
      displayNews();
    })
    .catch((err) => console.log(err));
}
function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}
let adIndex = 0;
function displayAd() {
  cntOfAds = ads.length;
  console.log(cntOfAds);
  let op = "";
  adIndex = adIndex % cntOfAds;
  let ad = ads[adIndex];
  op += ` 
      <div class="card align-items-center" style="width: 30rem;">
        <div class="card-body ">
          <h5 class="card-title text-dark">${ad.title}</h5>
          <p class="card-text">${ad.description}</p>
          <img src="${ad.url}"/ height="200px" width="200px">
        </div>
      </div>
    `;
  document.getElementById("ad").innerHTML = op;
  //document.getElementById("ad").innerHTML = `<h1>hello</h1> ${adIndex}`;
  adIndex++;
}

readTextFile("ads.json", function (text) {
  var data = JSON.parse(text);
  ads = data;
  //displayAd();
  setInterval(displayAd, 4000);
  console.log(data);
});
