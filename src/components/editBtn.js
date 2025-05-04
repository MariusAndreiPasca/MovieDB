import { dataBase, saveMovies } from "./db";

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

    movieCard.innerHTML = `
      <div class="movie-info">
        <div>
          <span class="movie-cover">Cover URL: </span>
          <input type="text" class="cover-url" value="${currentPoster}" placeholder="Enter movie cover URL..." />
        </div>
        <p>or</p>
        <div>
          <span class="movie-cover-upload">Upload</span>
          <input type="file" class="cover-upload" accept="image/png, image/jpeg, image/jpg" />
        </div>
        <h3 class="movie-info-title"><b>Movie Title:</b> <input type="text" class="movie-title" value="${currentTitle}" /></h3>
        <p class="movie-info-year"><b>Release Date:</b> <input type="number" class="movie-year" value="${currentYear}" /></p>
        <p class="movie-info-director"><b>Director:</b> <input type="text" class="movie-director" value="${currentDirector}" /></p>
        <p class="movie-info-duration"><b>Duration:</b> <input type="number" class="movie-duration" value="${currentDuration}" /> min</p>
        <button class="movie-save-info"><i class="bi bi-floppy-fill"></i></button>
      </div>
    `;

    let saveBtn = movieCard.querySelector(".movie-save-info");

    saveBtn.addEventListener("click", function (e) {
      e.preventDefault();

      let newPoster = movieCard.querySelector(".cover-url").value.trim();
      let newTitle = movieCard.querySelector(".movie-title").value;
      let newYear = movieCard.querySelector(".movie-year").value;
      let newDirector = movieCard.querySelector(".movie-director").value;
      let newDuration = movieCard.querySelector(".movie-duration").value;
      let coverUpload = movieCard.querySelector(".cover-upload");
      let file = coverUpload.files[0];

      if (file) {
        let reader = new FileReader();
        reader.onload = function () {
          newPoster = reader.result;

          movieToEdit.cover = newPoster;
          movieToEdit.title = newTitle;
          movieToEdit.date = newYear;
          movieToEdit.director = newDirector;
          movieToEdit.duration = newDuration;

          saveMovies(dataBase);

          updateMovieCard(
            movieCard,
            newPoster,
            newTitle,
            newYear,
            newDirector,
            newDuration
          );
        };
        reader.readAsDataURL(file);
        return;
      }

      if (newPoster) {
        movieToEdit.cover = newPoster;
        movieToEdit.title = newTitle;
        movieToEdit.date = newYear;
        movieToEdit.director = newDirector;
        movieToEdit.duration = newDuration;

        saveMovies(dataBase);

        updateMovieCard(
          movieCard,
          newPoster,
          newTitle,
          newYear,
          newDirector,
          newDuration
        );
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
  newDuration
) {
  movieCard.innerHTML = `
    <img class="movie-cover" src="${newPoster}" height="180" alt="${newTitle} cover" />
    <div class="movie-info">
      <h3 class="movie-info-title">${newTitle}</h3>
      <p class="movie-info-year"><b>Release Date:</b> ${newYear}</p>
      <p class="movie-info-director"><b>Director:</b> ${newDirector}</p>
      <p class="movie-info-duration"><b>Duration:</b> ${newDuration} min</p>
      <button class="movie-edit"><i class="bi bi-pencil-fill"></i></button>
      <button class="movie-remove"><i class="bi bi-trash3"></i></button>
    </div>
  `;

  let newEditBtn = movieCard.querySelector(".movie-edit");
  let newRemoveBtn = movieCard.querySelector(".movie-remove");

  newEditBtn.addEventListener("click", function () {
    editBtn(newEditBtn);
  });

  newRemoveBtn.addEventListener("click", function () {
    movieCard.remove();
  });
}
