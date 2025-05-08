import { editBtn } from "./editBtn";
import { dataBase } from "./db";

export function addMovieCard() {
  let list = document.querySelector(".movie-list");
  list.innerHTML = "";

  dataBase.forEach((movie) => {
    let newCard = document.createElement("li");
    newCard.classList.add("movie");
    newCard.setAttribute("data-id", movie.id);
    newCard.innerHTML = `<img class="movie-cover" src="${movie.cover}" height="180" alt="${movie.title} cover" />
            <div class="movie-info">
            <h3 class="movie-info-title">${movie.title}</h3>
            <p class="movie-info-year"><b>Release date:</b> ${movie.date}</p>
            <p class="movie-info-director"><b>Director:</b> ${movie.director}</p>
            <p class="movie-info-duration"><b>Duration:</b> ${movie.duration} min</p>
            <div class="movie-card-buttons">
            <button class="movie-trailer">Trailer</button>
              <button class="movie-edit">Edit</button>
              <button class="movie-remove">Remove</button>
            </div>
            </div>`;

            let background = newCard.querySelector(".movie-info");
    background.style.backgroundImage = `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4)), url('${movie.cover}')`;
    background.style.backgroundSize = 'cover';
    background.style.backgroundPosition = 'center';
    background.style.borderTopRightRadius = '10px';
    background.style.borderBottomRightRadius = '10px';
    newCard.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
    newCard.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    newCard.style.borderRadius = "10px";


    list.appendChild(newCard);

    
    let editButton = newCard.querySelector(".movie-edit");
    let removeButton = newCard.querySelector(".movie-remove");
    let trailerButton = newCard.querySelector(".movie-trailer")

    trailerButton.addEventListener("click", () => {
      let appBody = document.querySelector(".app")
      let trailerFrame = document.createElement("div")
      let trailerContainer = document.createElement("div")

      trailerFrame.classList.add("trailer-frame")
      trailerFrame.style.display = "flex"

      trailerContainer.classList.add("trailer-container")

      trailerFrame.appendChild(trailerContainer)

      trailerContainer.innerHTML = 
      `<div class="close-trailer">
        <i class="bi bi-x-lg"></i>
        </div>
        <iframe class="trailer-frame-video" src="${movie.trailer}"></iframe>
      `

      appBody.appendChild(trailerFrame)

      let trailerClose = document.querySelector(".close-trailer");

      trailerClose.addEventListener("click", (e) => {
        e.preventDefault();
        trailerFrame.remove();
      });
      
      
    })

    removeButton.addEventListener("click", () => {
      let movieCard = removeButton.closest(".movie");
      let id = movieCard.getAttribute("data-id");

      let index = dataBase.findIndex((movie) => movie.id === id);

      if (index !== -1) {
        dataBase.splice(index, 1);
        localStorage.setItem("dataBase", JSON.stringify(dataBase));
        movieCard.remove();
        console.log(dataBase);
      }
    });

    editButton.addEventListener("click", (e) => {
      editBtn(e.currentTarget);
    });
  });
}

export function renderMovieCard(movie) {
  let container = document.getElementById("movie-list");
  let card = document.createElement("div");
  card.className = "movie";
  card.innerHTML = `<img class="movie-cover" src="${movie.cover}" height="180" alt="${movie.title} cover" />
            <div class="movie-info">
            <h3 class="movie-info-title">${movie.title}</h3>
            <p class="movie-info-year"><b>Release date:</b> ${movie.date}</p>
            <p class="movie-info-director"><b>Director:</b> ${movie.director}</p>
            <p class="movie-info-duration"><b>Duration:</b> ${movie.duration} min</p>
    
            <button class="movie-edit"><i class="bi bi-pencil-fill"></i></button>
            <button class="movie-remove"><i class="bi bi-trash3"></i></button>
            </div>`;

            let background = card.querySelector(".movie-info")
            background.style.backgroundImage = `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4)), url('${movie.cover}')`
            background.style.backgroundSize = 'cover';
            background.style.backgroundPosition = 'center';
            background.style.borderTopRightRadius = '10px';
            background.style.borderBottomRightRadius = '10px';
            card.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.4)";
            card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
            card.style.borderRadius = "10px";
        
            
  container.appendChild(card);

  
}

