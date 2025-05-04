import { addMovieCard } from "./movieCard"
import { saveMovie } from "./saveMovie"

export function overlayForm() {
    let app = document.querySelector(".movie-app")
    let newForm = document.createElement("div")
    newForm.classList.add("app-overlay")

    newForm.innerHTML =     
        `<form class="movie-form" action="submit">
        <div class="close-form">
        <i class="bi bi-x-lg"></i>
        </div>
        <div>
            <span class="movie-title">Movie title</span>
            <input
            type="text"
            class="title"
            placeholder="Enter movie title..."
            />
        </div>
        <div>
            <span class="movie-director">Director: </span>
            <input type="text" class="director" placeholder="Enter director name..." />
        </div>
        <div>
            <span class="movie-duration">Duration: </span>
            <input type="number" class="duration" placeholder="Enter minutes..." />
        </div>
        <div>
            <span class="movie-date">Release date: </span>
            <input type="number" class="date" placeholder="Enter movie release date..." />
        </div>
        <div>
            <span class="movie-cover">Cover URL: </span>
            <input type="text" class="cover" placeholder="Movie cover URL..." />
        </div>
        <p>or</p>
        <div>
            <span class="movie-cover-upload">Upload</span>
            <input type="file" class="cover-upload" accept="image/png, image/jpeg, image/jpg" />
        </div>
        <div>
            <button class="movie-submit">Add</button>
        </div>
        </form>`
    
        app.appendChild(newForm)

        let add = document.querySelector(".add-movie")
        let overlay = document.querySelector(".app-overlay")
        let windowClose = document.querySelector(".close-form")
        let addMovie = document.querySelector(".movie-submit")

        add.addEventListener("click", (e) => {
            e.preventDefault()
            overlay.style.display = "flex"
        })

        windowClose.addEventListener("click", (e) => {
            e.preventDefault()
            overlay.style.display = "none"
        })

        addMovie.addEventListener("click", (e) => {
            e.preventDefault()
            overlay.style.display = "none"
            let newMovie = saveMovie()
            addMovieCard(newMovie)
        })
}