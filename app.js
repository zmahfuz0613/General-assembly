const API_KEY = '52db4bf55d0c3e274cddec874e8cce74'

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

const url = 'https://api.themoviedb.org/3/search/movie?api_key=52db4bf55d0c3e274cddec874e8cce74'


const buttonElement = document.querySelector('#search')
const inputElement = document.querySelector('#inputValue')
const movieSearchable = document.querySelector('#movies-searchable')


function generateUrl(path) {
  const url = `https://api.themoviedb.org/3${path}?api_key=52db4bf55d0c3e274cddec874e8cce74`
  return url



}



function movieSection(movies) {
  return movies.map((movie) => {
    if (movie.poster_path) {
      return `<img 
      src=${IMAGE_URL + movie.poster_path} 
      data-movie-id=${movie.id}
      />`
   }
  
  })
  
}