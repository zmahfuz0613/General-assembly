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



function createMovieContainer(movies) {

  const movieElement = document.createElement('div')
  movieElement.setAttribute('class', 'movie')

const movieTemplate = `
<section class="section">
${movieSection(movies)}
</section>
<div class="content">
<p id="content-close">X</p>
</div> `


movieElement.innerHTML = movieTemplate
return movieElement

}

// Search movies

buttonElement.onclick = function (e) {
  e.preventDefault()
  const value = inputElement.value

  const path = '/search/movie'

  const newUrl = generateUrl(path) + '&query=' + value



  fetch(newUrl)
    .then((res) => res.json())
    .then(renderSearchMovies)
    .catch((error) => {
      console.log('Error: ', error)
    })
      
  
  inputElement.value = ''
  console.log('Value: ', value)

}


// New Function to embed the video trailer 

function createIframe(video) {
  const iframe = document.createElement('iframe')
  iframe.src = `https://www.youtube.com/embed/JwMKRevYa_M/${video.key}`
  iframe.width = 360
  iframe.height = 315
  iframe.allowFullscreen = true;

  return iframe

}


function createVideoTemplate(data, content) {
  console.log('Videos: ', data)
  const videos = data.results
  const length = videos.length > 4 ? 4 : videos.length
  const iframeContainer = document.createElement('div')

  for (let i = 0; i < length; i++) {
    const video = videos[i]  
    const iframe = createIframe(video)
    iframeContainer.appendChild(iframe)
    content.appendChild(iframeContainer)
  }
}




function renderSearchMovies(data) {

      // data.results
  
  movieSearchable.innerHTML = ''

  const movies = data.results
      const movieBlock = createMovieContainer(movies)
      movieSearchable.appendChild(movieBlock)
      console.log('Data: ', data)


}





  
// Event Delegation



document.onclick = function (e) {
    
  const target = e.target

  if (target.tagName.toLowerCase() === 'img') {
    
    const movieId = target.dataset.movieId
    console.log('Movie ID:', movieId)

    const section = event.target.parentElement
    const content = section.nextElementSibling
    content.classList.add('content-display')



    // fetch movie videos here


    const path = `/movie/${movieId}/videos`
    const url = generateUrl(path)

    fetch(url)
      .then((resource) => resource.json())
      .then((data) => createVideoTemplate(data, content))

        .catch((error) => {
          console.log('Error: ', error)
        })
      

    

    if (target.id === 'content-close') {
      const content = target.parentElement
      content.classList.remove('content-display')

    }

  }

}