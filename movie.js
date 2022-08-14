import { addData, getDataById, deleteDataById, getData } from "./database";
export let movieDataList = new Map();
export class Movie {
    plotMovie = () => {
        if (movieDataList.size == 0) {
            document.getElementById("app").innerHTML = "";
        }

        const mainDiv = document.getElementById("app");
        // for (let i = 0; i < movieData.size; i++) {
        for (const [key, data] of movieDataList) {
            console.log(`${key} = ${data}`);

            // let data = movieData[i];
            let imdbID = data.imdbID.trim();
            const movieRow = document.createElement("div");
            const movieFavorite = document.createElement("div");
            const poster = document.createElement("img");
            const movieTitle = document.createElement("h2");
            const movieYear = document.createElement("h2");
            const movieActors = document.createElement("h2");
            const movieBox = document.createElement("h2");
            const movieRated = document.createElement("h2");
            const moviePlot = document.createElement("h2");
            movieFavorite.innerHTML = `<button type="button" class="toggleFavoriteClass" id="${imdbID}">Favorite</button>`;

            poster.src = `${data.Poster}`;
            movieTitle.textContent = `Title: ${data.Title}`;
            movieYear.textContent = `Year: ${data.Year}`;
            movieActors.textContent = `Actors: ${data.Actors}`;
            movieBox.textContent = `Box Office: ${data.BoxOffice}`;
            movieRated.textContent = `Rated: ${data.Rated}`;
            moviePlot.textContent = `Plot: ${data.Plot}`;
            movieRow.className = "movieRowClass";
            mainDiv.append(movieRow);
            mainDiv.append(movieFavorite);
            mainDiv.append(poster);
            mainDiv.append(movieTitle);
            mainDiv.append(movieYear);
            mainDiv.append(movieActors);
            mainDiv.append(movieBox);
            mainDiv.append(movieRated);
            mainDiv.append(moviePlot);

            const elementToggleFavoriteClass = document.getElementById(`${imdbID}`);
            elementToggleFavoriteClass.addEventListener("click", (e) => {
                let elementId = e.target.id;
                console.log("clicked element:" + elementId);
                makeFavorite(elementId);
            });
        }



    }
};

function showMyFavorite() {
    movieDataList.clear();
    getData();
}

async function makeFavorite(id) {
    let isFavData = await getDataById(id)
    if (isFavData === true) {
        await deleteDataById(id);
        showMyFavorite();

        console.log("delete Fav movieData: " + JSON.stringify(movieData));
    } else if (isFavData === false) {
        let movieData = movieDataList.get(id);
        addData(movieData);
        console.log("Add Fav movieData: " + JSON.stringify(movieData));
    }
}
export const movieObj = new Movie();