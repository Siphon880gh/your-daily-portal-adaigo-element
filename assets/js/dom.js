function userInputsArtist() {
    if (window.location.hash.length > 1) {
        // Prepare artist name from the URL hash
        var artist = window.location.hash;
        artist = decodeURI(artist);
        artist = artist.substr(1); // drop the "#" beginning of string

        // Start auth flow
        clientCredentialsFlow(artist, domRendersArtists); // Parameters: artist, callback 
    } else {
        throw ("Error: Your URL must end with #{artist-name}. Example is\nindex.html#Bebe Rexha");
    }
}

function domRendersArtists(artistName, artists) {
    // Let user know which artist we are querying related artists for
    const artistTitleContainer = document.querySelector(".results-container .results-title");
    const artistTitleTextEl = document.createElement("h2");
    artistTitleTextEl.textContent = artistName;
    artistTitleContainer.append(artistTitleTextEl);

    // Clear related artists section where "Loading..." text was
    const artistsContainer = document.querySelector(".results-container .results-list");
    artistsContainer.textContent = "";

    var artistEls = artists.map((artist) => {
        var { name, id } = artist;
        var href = artist.external_urls.spotify;
        var imageUrl = artist.images[0].url;

        var template = document.querySelector(".template-artist-card").innerHTML;
        template = template
            .replace("_name_", name)
            .replace("_id_", name)
            .replace("_href_", href)
            .replace("_imageUrl_", imageUrl)
        var liEl = document.createElement("li");
        liEl.classList = "list-group-item";
        liEl.innerHTML = template;

        return liEl;
    });
    artistsContainer.append(...artistEls); // TO REVIEW: Similar to .append(liEl0, liEl1, etc)

    $(artistsContainer).sortable();
}