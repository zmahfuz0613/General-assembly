
const buttonElement = document.querySelector('#search')
const inputElement = document.querySelector('#inputValue')
const movieSearchable = document.querySelector('#movies-searchable')
const moviesContainer = document.querySelector('#movies-container')


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

function renderSearchMovies(data) {

  // data.results
  movieSearchable.innerHTML = ''
  const movies = data.results
  const movieBlock = createMovieContainer(movies)
  movieSearchable.appendChild(movieBlock)

}

function renderMovies(data) {
 // data.results
  const movies = data.results
  const movieBlock = createMovieContainer(movies)

  movieSearchable.appendChild(movieBlock)

}


// incase there is an error we creating the error function

function handleError(error) {
  console.log('Error: ', error)
}

buttonElement.onclick = function (e) {
  e.preventDefault()
  const value = inputElement.value
  
  searchMovie(value)

  // const path = '/search/movie'

  // const newUrl = generateUrl(path) + '&query=' + value

  // fetch(newUrl)
  // .then((resource) => resource.json())
  // .then(renderSearchMovies)
  // .catch((error) => {
  //   })
  
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
  iframe.setAttribute('SameSite', 'None' )

  return iframe

}


// Display movie Videos, Creating the content and pushed the movie data in this function.
// Over write everything with 'x' 
// No more than 4 videos will be displayed and created the Iframe and dump the iframe in the webpage.


function createVideoTemplate(data, content) {

  content.innerHTML = '<p id="content-close">X</p>'
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

getUpcomingMovies()

getTopRatedMovies()

getNowPlayingMovies()

getLatestMovies()

getPopularMovies()