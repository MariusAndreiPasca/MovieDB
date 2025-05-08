import { dataBase, saveMovies } from "./db";
import { showTrailer } from "./showTrailer";

export function editBtn(edit) {
  let movieCard = edit.closest(".movie");
  let movieId = movieCard.dataset.id;
  let movieToEdit = dataBase.find((movie) => movie.id === movieId);

  if (movieToEdit) {
    let currentPoster = "";
    let currentTitle = movieToEdit.title;
    let currentYear = movieToEdit.date;
    let currentDirector = movieToEdit.director;
    let currentDuration = movieToEdit.duration;
    let currentTrailer = movieToEdit.trailer;

    movieCard.innerHTML = `
      <div class="movie-info">
        <div class="movie-edit-container">
          <div class="movie-info-edit">
            <h3 class="movie-info-title"><b>Movie Title:</b> <input type="text" class="movie-title" value="${currentTitle}" /></h3>
            <p class="movie-info-year"><b>Release Date:</b> <input type="number" class="movie-year" value="${currentYear}" /></p>
            <p class="movie-info-director"><b>Director:</b> <input type="text" class="movie-director" value="${currentDirector}" /></p>
            <p class="movie-info-duration"><b>Duration:</b> <input type="number" class="movie-duration" value="${currentDuration}" /> min</p>
          </div>
          <div class="movie-image-uplaod">
            <div>
              <span class="movie-cover">Cover URL: </span>
              <input type="text" class="cover-url" value="${currentPoster}" placeholder="Enter movie cover URL..." />
            </div>
            <p>or</p>
            <div>
              <span class="movie-cover-upload">Upload</span>
              <input type="file" class="cover-upload" accept="image/png, image/jpeg, image/jpg" />
            </div>
            <div>
              <span class="movie-trailer-label">Trailer Link:</span>
              <input type="text" class="trailer-upload" value="${currentTrailer || ""}" placeholder="Enter YouTube link..." />
            </div>
          </div>
        </div>
        <button class="movie-save-info">Save</button>
      </div>
    `;

    let saveBtn = movieCard.querySelector(".movie-save-info");

    saveBtn.addEventListener("click", function (e) {
      e.preventDefault();

      let newPoster = movieCard.querySelector(".cover-url").value;
      let newTitle = movieCard.querySelector(".movie-title").value;
      let newYear = movieCard.querySelector(".movie-year").value;
      let newDirector = movieCard.querySelector(".movie-director").value;
      let newDuration = movieCard.querySelector(".movie-duration").value;
      let newTrailerLink = movieCard.querySelector(".trailer-upload").value;
      let coverUpload = movieCard.querySelector(".cover-upload");
      let file = coverUpload.files[0];

      let saveData = function (poster) {
        movieToEdit.cover = poster;
        movieToEdit.title = newTitle;
        movieToEdit.date = newYear;
        movieToEdit.director = newDirector;
        movieToEdit.duration = newDuration;
        movieToEdit.trailer = newTrailerLink;

        saveMovies(dataBase);

        updateMovieCard(
          movieCard,
          poster,
          newTitle,
          newYear,
          newDirector,
          newDuration,
          newTrailerLink
        );
      };

      if (file) {
        let reader = new FileReader();
        reader.onload = function () {
          saveData(reader.result);
        };
        reader.readAsDataURL(file);
        return;
      }

      if (newPoster) {
        saveData(newPoster);
        return;
      }

      alert("Please add a cover (file or link).");
    });
  }
}

function updateMovieCard(
  movieCard,
  newPoster,
  newTitle,
  newYear,
  newDirector,
  newDuration,
  newTrailer
) {
  movieCard.innerHTML = `
    <div class="movie-poste-container">
      <img class="movie-cover" src="${newPoster}" height="180" alt="${newTitle} cover" />
    </div>
    <div class="movie-info">
      <h3 class="movie-info-title">${newTitle}</h3>
      <p class="movie-info-year"><b>Release date:</b> ${newYear}</p>
      <p class="movie-info-director"><b>Director:</b> ${newDirector}</p>
      <p class="movie-info-duration"><b>Duration:</b> ${newDuration} min</p>
      <div class="movie-card-buttons">
        <button class="movie-trailer">Trailer</button>
        <button class="movie-edit">Edit</button>
        <button class="movie-remove">Remove</button>
      </div>
    </div>
  `;

  let trailerButton = movieCard.querySelector(".movie-trailer");
  trailerButton.addEventListener("click", () => {
    showTrailer(newTrailer);
  });

  let background = movieCard.querySelector(".movie-info");
  background.style.backgroundImage = `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)), url('${newPoster}')`;
  background.style.backgroundSize = "cover";
  background.style.backgroundPosition = "center";
  background.style.borderTopRightRadius = "10px";
  background.style.borderBottomRightRadius = "10px";
  movieCard.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
  movieCard.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
  movieCard.style.borderRadius = "10px";

  let newEditBtn = movieCard.querySelector(".movie-edit");
  let newRemoveBtn = movieCard.querySelector(".movie-remove");

  newEditBtn.addEventListener("click", function () {
    editBtn(newEditBtn);
  });

  newRemoveBtn.addEventListener("click", function () {
    let id = movieCard.getAttribute("data-id");
    let index = dataBase.findIndex((movie) => movie.id === id);

    if (index !== -1) {
      dataBase.splice(index, 1);
      localStorage.setItem("dataBase", JSON.stringify(dataBase));
      movieCard.remove();
    }
  });
}
