import { dataBase } from "./db.js";

function convertToEmbedUrl(youtubeUrl) {
  const match = youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export async function saveMovie() {
  let movieForm = document.querySelector(".movie-form");

  let id = crypto.randomUUID();
  let title = movieForm.querySelector(".title").value;
  let director = movieForm.querySelector(".director").value;
  let duration = movieForm.querySelector(".duration").value;
  let date = movieForm.querySelector(".date").value;
  let coverUrl = movieForm.querySelector(".cover").value;
  let coverUpload = movieForm.querySelector(".cover-upload");
  let trailerLink = movieForm.querySelector(".trailer-upload").value;

  let file = coverUpload.files[0];

  let trailer = convertToEmbedUrl(trailerLink); 
  if (!trailer && trailerLink !== "") {
    alert("Trailer URL invalid.");
    return null;
  }


  let newMovie = {
    id,
    title,
    director,
    duration,
    date,
    trailer,
    cover: "",
  };

  let readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  try {
    if (file) {
      newMovie.cover = await readFileAsync(file);
    } else if (coverUrl !== "") {
      newMovie.cover = coverUrl;
    } else {
      alert("Please add a cover(file or link).");
      return null;
    }

    dataBase.push(newMovie);
    localStorage.setItem("dataBase", JSON.stringify(dataBase));

    return newMovie;
  } catch (error) {
    alert("An error occurred while reading the cover file.");
    return null;
  }
}