const Api_key = "api_key=a64504b7f5254f6cc7fb7309b825a25d";
const base_url = "https://api.themoviedb.org/3";
const apiUrl = base_url + "/discover/movie?sort_by=popularity.desc&" + Api_key;
const searchUrl = base_url + "/search/movie?" + Api_key;

const form = document.querySelector("#searchForm");
const main = document.getElementById("main");
const imgUrl = "https://image.tmdb.org/t/p/w500";

//Displaying popular movies initially
showMovies(apiUrl);
function showMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      getMovies(data);
    });
}

function getMovies(data) {
  //clears everything from main initally
  main.innerHTML = "";

  //creating a card for each movie
  data.results.forEach((element) => {
    //object destructuring
    const { poster_path, title } = element;
    //creating div for each card
    const el = document.createElement("div");
    el.classList.add("movies");
    el.innerHTML = `<img src="${imgUrl + poster_path}" alt="${title}">
            <h2>${title}</h2>`;

    //appends elements into the main tag
    main.appendChild(el);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm) {
    showMovies(searchUrl + "&query=" + searchTerm);
    search.value = "";
  }
  //Changes the heading to the value which user searchs for
  firstHeading.innerText = "Results for " + searchTerm.toUpperCase();
});

//selecting firstHeading element
const firstHeading = document.getElementById("firstHeading");
