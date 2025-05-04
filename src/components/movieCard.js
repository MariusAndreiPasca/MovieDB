import { editBtn } from "./editBtn"
import { dataBase } from "./db"

export function addMovieCard() {
    let list = document.querySelector(".movie-list")
    list.innerHTML = ""
    
    dataBase.forEach((movie) => {
        let newCard = document.createElement("li")
        newCard.classList.add("movie")
        newCard.setAttribute("data-id", movie.id)
        newCard.innerHTML =  `<img class="movie-cover" src="${movie.cover}" height="180" alt="${movie.title} cover" />
            <div class="movie-info">
            <h3 class="movie-info-title">${movie.title}</h3>
            <p class="movie-info-year"><b>Release date:</b> ${movie.date}</p>
            <p class="movie-info-director"><b>Director:</b> ${movie.director}</p>
            <p class="movie-info-duration"><b>Duration:</b> ${movie.duration} min</p>
    
            <button class="movie-edit"><i class="bi bi-pencil-fill"></i></button>
            <button class="movie-remove"><i class="bi bi-trash3"></i></button>
            </div>`

            list.appendChild(newCard)

            let editButton = newCard.querySelector(".movie-edit")
            let removeButton = newCard.querySelector(".movie-remove")

            removeButton.addEventListener("click", () => {
                let movieCard = removeButton.closest(".movie")
                let id = movieCard.getAttribute("data-id")

                let index = dataBase.findIndex(movie => movie.id === id)

                if(index !== -1) {
                    dataBase.splice(index, 1)
                    localStorage.setItem("dataBase", JSON.stringify(dataBase));
                    movieCard.remove();
                    console.log(dataBase)
                }
            });           
    
            editButton.addEventListener("click", () => {
                editBtn(movie.id)
            })
            
    })
}