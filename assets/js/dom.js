async function userInputsArtist() {
    return;
    if (window.location.hash.length > 1) {
        // Prepare artist name from the URL hash
        var artistName = window.location.hash;
        artistName = decodeURI(artistName);
        artistName = artistName.substr(1); // drop the "#" beginning of string

        // Start auth flow
        var { artistName, relatedArtists } = await spotifyClientCredentialsFlow({ artistName }); // Parameters: artist, callback 
        var someValue = await secondAPI({ searchTerm: artistName });
        var someOtherValue = await astrologyAPI({ mm: "02", dd: "06" });

        // console.log("artist" + artistName);
        // console.log("artists" + relatedArtists);
        domRendersArtists(artistName, relatedArtists);
    } else {
        throw ("Error: Your URL must end with #{artist-name}. Example is\nindex.html#Bebe Rexha");
    }
}

function domRendersArtists(artistName, relatedArtists) {
    // Let user know which artist we are querying related artists for
    const artistTitleContainer = document.querySelector(".results-container .results-title");
    const artistTitleTextEl = document.createElement("h2");
    artistTitleTextEl.id = "results-title-text";
    artistTitleTextEl.textContent = artistName;
    artistTitleContainer.append(artistTitleTextEl);

    // Clear related artists section where "Loading..." text was
    const artistsContainer = document.querySelector(".results-container .results-list");
    artistsContainer.textContent = "";

    // Map takes an array and changes its elements to a different arrayl
    // For example: [1,2,3] => [2,4,6] if the map function takes each element and return el*2
    // Guide: https://www.w3schools.com/jsref/jsref_map.asp
    var artistEls = relatedArtists.map((artist) => {
        var { name, id } = artist;
        var href = artist.external_urls.spotify;
        var imageUrl = artist.images[0].url;

        var template = document.querySelector(".template-artist-card").innerHTML;
        template = template
            .replace("_name_", name)
            .replace("_id_", id)
            .replace("_href_", href)
            .replace("_imageUrl_", imageUrl)
        var liEl = document.createElement("li");
        liEl.classList = "collection-item";
        liEl.innerHTML = template;
        liEl.addEventListener("click", function(event) {
            $(this).toggleClass("active");
        });

        return liEl;
    });

    // Spread syntax
    // Takes an array and spreads it out
    // var arr = [1,2,3 
    // doMath(...arr) => Becomes doMath(arr[0], arr[1], arr[2])
    artistsContainer.append(...artistEls); // TO REVIEW: Similar to .append(liEl0, liEl1, etc)

    // $(artistsContainer).sortable(); // making it drag and drop
}

// Materialize modal instances
let modals = {
    "artist": null,
    "horoscope": null
}

function initModals() {
    // Save Materialize modal instances

    // - Artists Modal for setting favorite artist -
    let artistModalEl = document.querySelector("#modal-artist");
    modals.artist = M.Modal.init(artistModalEl);

    // - Horoscope Modal for setting birthday -
    let horoscopeModalEl = document.querySelector("#modal-horoscope");
    modals.horoscope = M.Modal.init(horoscopeModalEl);
    // Init datepicker ui
    $("#datepicker").datepicker({
        autoSize: true
    });

    // (function testHoroscope() {
    //     modals.horoscope.open();
    // })();

    (function testMusic() {
        modals.artist.open();
    })();
}