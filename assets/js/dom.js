function userInputsArtist() {
    if (window.location.hash.length > 1) {
        // Prepare artist name from the URL hash
        var artist = window.location.hash;
        artist = decodeURI(artist);
        artist = artist.substr(1); // drop the "#" beginning of string

        // Start auth flow
        spotifyClientCredentialsFlow(artist, function() {
            // Mock array
            artistsArray = [{
                    name: "Some artist 1",
                    external_urls: {
                        spotify: "https://www.google.com"
                    },
                    images: [{
                        url: "http://via.placeholder.com/500x500?text=Mock"
                    }]
                },
                {
                    name: "Some artist 2",
                    external_urls: {
                        spotify: "https://www.google.com"
                    },
                    images: [{
                        url: "http://via.placeholder.com/500x500?text=Mock"
                    }]
                }
            ];
            secondApiFlow(artistsArray, artist, domRendersArtists);
        }); // Parameters: artist, callback 
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

    // Map takes an array and changes its elements to a different arrayl
    // For example: [1,2,3] => [2,4,6] if the map function takes each element and return el*2
    // Guide: https://www.w3schools.com/jsref/jsref_map.asp
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

    // Spread syntax
    // Takes an array and spreads it out
    // var arr = [1,2,3 
    // doMath(...arr) => Becomes doMath(arr[0], arr[1], arr[2])
    artistsContainer.append(...artistEls); // TO REVIEW: Similar to .append(liEl0, liEl1, etc)

    // $(artistsContainer).sortable(); // making it drag and drop
}