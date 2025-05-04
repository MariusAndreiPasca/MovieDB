export let dataBase = [];

export function saveMovies(movies) {
  localStorage.setItem("dataBase", JSON.stringify(movies));
}

export function loadMovies() {
  const data = localStorage.getItem("dataBase");
  return data ? JSON.parse(data) : [];
}
