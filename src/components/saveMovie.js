import { dataBase } from "./db.js";

export function saveMovie() {
    let movieForm = document.querySelector(".movie-form");

    function genUniqueID() {
        return Math.random().toString(36).substr(2, 9);
    }

    let id = genUniqueID();
    let title = movieForm.querySelector(".title").value;
    let director = movieForm.querySelector(".director").value;
    let duration = movieForm.querySelector(".duration").value;
    let date = movieForm.querySelector(".date").value;
    let coverUrl = movieForm.querySelector(".cover").value;
    let coverUpload = movieForm.querySelector(".cover-upload");

    const file = coverUpload.files[0];

    const newMovie = {
        id,
        title,
        director,
        duration,
        date,
        cover: ""  
    };

  
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            newMovie.cover = reader.result;
            dataBase.push(newMovie);
            localStorage.setItem("dataBase", JSON.stringify(dataBase));
            console.log("Salvat cu imagine din fișier:", newMovie);
        };
        reader.readAsDataURL(file); // citește imaginea
    } else if (coverUrl.trim() !== "") {
        newMovie.cover = coverUrl;
        dataBase.push(newMovie);
        localStorage.setItem("dataBase", JSON.stringify(dataBase));
        console.log("Salvat cu link imagine:", newMovie);
    } else {
        alert("Te rog să adaugi un cover (link sau fișier).");
    }

    return newMovie;
}
