let dbPrefix = "dailyDashboard_";

function saveHoroscope(birthdate) {
    const mm = moment(birthdate).format("MM");
    const dd = moment(birthdate).format("DD");
    localStorage.setItem(dbPrefix + "mm", mm);
    localStorage.setItem(dbPrefix + "dd", dd);
}

// TODO: Change jQuery to javascript?

async function saveArtistPg1(p1) {
    if ($("#artist").val().length === 0)
        return;

    $(p1).addClass("hide");
    $(p1).next().removeClass("hide");
    var artistName = $("#artist").val();
    var { artistName, relatedArtists } = await spotifyClientCredentialsFlow({ artistName }); // Parameters: artist, callback 
    domRendersArtists(artistName, relatedArtists);
}

async function saveArtistPg2(p2) {
    if ($(p2).find(".results-list li.active").length === 0)
        return;

    let relatedArtists = [];

    $(p2).find(".results-list li.active").map((i, relatedArtistEl) => {
        let id = relatedArtistEl.querySelector("[data-artist-id]").getAttribute("data-artist-id")
        let artist = relatedArtistEl.querySelector(".card-title").textContent;
        relatedArtists.push({ id, artist });
    });

    localStorage.setItem(dbPrefix + "relatedArtists", JSON.stringify(relatedArtists));
}