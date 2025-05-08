import { overlayForm } from "./components/form";
import { loadMovies, dataBase } from "./components/db";
import { addMovieCard} from "./components/movieCard";

let body = document.querySelector(".app");

function main() {
  let app = document.createElement("div");
  app.classList.add("movie-app");

  app.innerHTML = `<header class="app-header">
        <h1 class="app-title">SceneIt</h1>
        <div class="header-btns">
          <button class="filter-button"><i class="bi bi-filter"></i></button>
          <button class="add-movie"><i class="bi bi-plus-circle"></i></button>
        </div>
    </header>
    <main class="app-main">
        <div class="filter-container">
          <div class="filter-option">
            <div class="filter-by-name">
              <span class="filter-text">Filter by name: </span>
              <input type="text"/>
            </div>
            <div class="filter-by-year">
              <span class="filter-text">Filter by year: </span>
              <input type="number"/>
            </div>
            </div>
          <div class="sort-option">
            <button class="sort-a-z">sort A-Z</button>
            <button class="sort-year">sort year</button>
          </div>
        </div>
        <ul class="movie-list"></ul>
    </main>
    <footer class="app-footer">
        <p>
        &copy; 2025
        <a href="https://github.com/MariusAndreiPasca">Marius-Andrei Pasca</a
        >. All rights reserved.
        </p>
    </footer>`;

  body.appendChild(app);

  let filterBtn = document.querySelector(".filter-button")
  let filterCont = document.querySelector(".filter-container")

  filterBtn.addEventListener("click", () => {
      console.log("button")
      filterCont.style.display = filterCont.style.display === "flex" ? "none" : "flex";
  });

  let movies = loadMovies();
  dataBase.length = 0;
  dataBase.push(...movies);

  addMovieCard();

  overlayForm();
}

main();
