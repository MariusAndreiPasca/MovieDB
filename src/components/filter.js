import { dataBase } from "./db";
import { addMovieCard } from "./movieCard";


    let filterBtn = document.querySelector(".filter-button")
    let filterCont = document.querySelector(".filter-container")
    let sortYear = document.querySelector(".sort-year")


    filterBtn.addEventListener("click", () => {
        filterCont.style.display = filterCont.style.display === "flex" ? "none" : "flex";
    });

    let ascending = true;

    sortYear.addEventListener("click", () => {
        console.log("butoo");
    dataBase.sort((a, b) =>
        ascending ? a.date - b.date : b.date - a.date
        
    );
    ascending = !ascending;
    addMovieCard(dataBase);
    });

