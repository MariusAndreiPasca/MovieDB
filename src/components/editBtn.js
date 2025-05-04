export function editBtn(edit) {
    
    const movieCard = edit.closest(".movie")

    
    movieCard.innerHTML = 
        `<div class="movie-info">
            <div>
                <span class="movie-cover">Cover URL: </span>
                <input type="text" class="cover-url" placeholder="URL copertă film..." />
            </div>
            <p>ori</p>
            <div>
                <span class="movie-cover-upload">Încarcă</span>
                <input type="file" class="cover-upload" accept="image/png, image/jpeg, image/jpg" />
            </div>
            <h3 class="movie-info-title"><b>Titlu film:</b> <input type="text" class="movie-title"/></h3>
            <p class="movie-info-year"><b>Data lansării:</b> <input type="number" class="movie-year"/></p>
            <p class="movie-info-director"><b>Regizor:</b> <input type="text" class="movie-director"/></p>
            <p class="movie-info-duration"><b>Durată:</b> <input type="number" class="movie-duration"/> min</p>
            <button class="movie-save-info"><i class="bi bi-floppy-fill"></i></button>
        </div>`

    const saveBtn = movieCard.querySelector(".movie-save-info");
    saveBtn.addEventListener("click", (e) => {
        e.preventDefault()

        
        const newPoster = movieCard.querySelector(".cover-url").value || "default-cover.jpg"
        const newTitle = movieCard.querySelector(".movie-title").value || "Fără titlu"
        const newYear = movieCard.querySelector(".movie-year").value || "Necunoscut"
        const newDirector = movieCard.querySelector(".movie-director").value || "Necunoscut"
        const newDuration = movieCard.querySelector(".movie-duration").value || "0"

        
        movieCard.innerHTML = 
        `<img class="movie-cover" src="${newPoster}" height="180" alt="${newTitle} copertă" />
            <div class="movie-info">
                <h3 class="movie-info-title">${newTitle}</h3>
                <p class="movie-info-year"><b>Data lansării:</b> ${newYear}</p>
                <p class="movie-info-director"><b>Regizor:</b> ${newDirector}</p>
                <p class="movie-info-duration"><b>Durată:</b> ${newDuration} min</p>
                <button class="movie-edit"><i class="bi bi-pencil-fill"></i></button>
                <button class="movie-remove"><i class="bi bi-trash3"></i></button>
            </div>
        `

        
        const newEditBtn = movieCard.querySelector(".movie-edit")
        const newRemoveBtn = movieCard.querySelector(".movie-remove")

        newEditBtn.addEventListener("click", () => {
            editBtn(newEditBtn);
        });

        newRemoveBtn.addEventListener("click", () => {
            movieCard.remove()
        });
    });
}
