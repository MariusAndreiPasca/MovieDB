import { overlayForm } from "./components/form";
import { loadMovies, dataBase } from "./components/db";
import { addMovieCard, renderMovieCard } from "./components/movieCard";

let body = document.querySelector(".app");

function main() {
  let app = document.createElement("div");
  app.classList.add("movie-app");

  app.innerHTML = `<header class="app-header">
        <h1 class="app-title">Movie List</h1>
        <button class="add-movie"><i class="bi bi-plus-circle"></i></button>
    </header>
    <main class="app-main">
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

  let movies = loadMovies();
  dataBase.length = 0;
  dataBase.push(...movies);

  addMovieCard();

  overlayForm();
}

main();
