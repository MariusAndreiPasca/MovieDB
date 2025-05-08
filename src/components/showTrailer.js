export function showTrailer(trailerUrl) {

    let embedUrl = convertToEmbedUrl(trailerUrl);

    let appBody = document.querySelector(".app");
    let trailerFrame = document.createElement("div");
    let trailerContainer = document.createElement("div");

    trailerFrame.classList.add("trailer-frame");
    trailerFrame.style.display = "flex";

    trailerContainer.classList.add("trailer-container");

    trailerFrame.appendChild(trailerContainer);

    trailerContainer.innerHTML = `
    <div class="close-trailer">
        <i class="bi bi-x-lg"></i>
    </div>
    <iframe class="trailer-frame-video" src="${embedUrl}" allowfullscreen></iframe>
    `;

    appBody.appendChild(trailerFrame);

    let trailerClose = trailerContainer.querySelector(".close-trailer");
    trailerClose.addEventListener("click", (e) => {
    e.preventDefault();
    trailerFrame.remove();
    });

    trailerFrame.addEventListener("click", function (e) {
        
        if (e.target === trailerFrame) {
        trailerFrame.remove(); 
        }
    });
}

function convertToEmbedUrl(url) {
    let match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url; 
}
