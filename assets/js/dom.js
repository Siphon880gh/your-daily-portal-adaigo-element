function userInputsArtist() {
    if (window.location.hash.length) {
        var artist = window.location.hash;
        clientCredentialsFlow("Bebe Rexha", domRendersArtists); // Parameters: artist, callback 
    } else {
        throw ("Error: Your URL must end with #{artist-name}. Example is\nindex.html#Bebe Rexha");
    }
}

function domRendersArtists(artists) {
    const artistsContainer = document.querySelector(".results");
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
}