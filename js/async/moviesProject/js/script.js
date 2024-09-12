const global={
    currentPage: window.location.pathname,
}
//highlight active link
function highlightActiveLink(){
    const link=document.querySelectorAll('.nav-link');
    link.forEach(link=>{
        if(link.getAttribute('href')===global.currentPage){
            link.classList.add('active');
        }

    })
}
async function displayPopularMovies(){
    const {results}=await fetchAPIData('movie/popular');
    results.forEach(movie=> {
        const div = document.createElement('div');

        div.classList.add('card');
        div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
            ${
                movie.poster_path
                ? `<img
                    src="https://image.tmbd.org/t/p/w500${movie.poster_path}"
                    class="card-img-top"
                    alt="${movie.title}"
                /> `
                    : `<img src="../images/no-image.jpg" alt="${movie.title}" class="card-img-top" alt="${movie.title}" />`
                    
            }
            </a>
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                    <small class="text-muted">${movie.release_date}</small>
                </p>
            </div>
        `;
        document.querySelector('#popular-movies').appendChild(div);
    })

}
// Display 20 most popular tv shows
async function displayPopularShows() {
    const { results } = await fetchAPIData('tv/popular');

    results.forEach((show) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
            ${
            show.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${show.name}"
          />`
        }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
          </div>
        `;

        document.querySelector('#popular-shows').appendChild(div);
    });
}

// displayMovie Detail
async function displayMovieDetails(id){
    const movieId= window.localStorage.search.split('=')[1];
    const movie = await fetchAPIData(`movie/${movieId}`);
    const div = document.createElement('div');
    div.innerHTML = `
  <div class="details-top">
  <div>
  ${
        movie.poster_path
            ? `<img
    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
    class="card-img-top"
    alt="${movie.title}"
  />`
            : `<img
  src="../images/no-image.jpg"
  class="card-img-top"
  alt="${movie.title}"
/>`
    }
  </div>
  <div>
    <h2>${movie.title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${movie.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Release Date: ${movie.release_date}</p>
    <p>
      ${movie.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
    </ul>
    <a href="${
        movie.homepage
    }" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
        movie.budget
    )}</li>
    <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
        movie.revenue
    )}</li>
    <li><span class="text-secondary">Runtime:</span> ${
        movie.runtime
    } minutes</li>
    <li><span class="text-secondary">Status:</span> ${movie.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">
    ${movie.production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(', ')}
  </div>
</div>
  `;
    document.querySelector('#movie-details').appendChild(div);
}
//fetch data from TMDB API
async function fetchAPIData(endpoint) {
    let API_K = null;

    await fetch('keys.json')
        .then((response) => response.json())
        .then(data => API_K = data.api);
    const API_URL = 'https://api.themoviedb.org/3/';
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_K}&language=en-US`);
    return await response.json();
}
function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}
function addCommasToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function init(){
    switch (global.currentPage) {
        case '/js/async/moviesProject/':
        case '/js/async/moviesProject/index.html':
            displayPopularMovies();
            break;
        case '/js/async/moviesProject/shows.html':
            displayPopularShows();
            break;
        case '/js/async/moviesProject/movie-details.html':
            console.log('Movie Details');
            break;
        case '/js/async/moviesProject/tv-details.html':
            console.log('TV Details');
            break;
        case '/js/async/moviesProject/search.html':
            console.log('Search');
            break;
    }

    highlightActiveLink();
}
document.addEventListener('DOMContentLoaded', init)

