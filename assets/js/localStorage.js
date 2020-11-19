let dbPrefix = "dailyDashboard_";

function saveYourName(yourName) {
    if (yourName.length === 0) {
        errorMessage("Enter a display name you want to be greeted with.");
        return;
    }
    console.log(yourName);

    localStorage.setItem(dbPrefix + "displayName", yourName);
    modals.yourName.close();
}

function saveHoroscope(birthdate) {
    if (birthdate.length === 0) {
        errorMessage("Select your birthday.");
        return;
    }
    const mm = moment(birthdate).format("MM");
    const dd = moment(birthdate).format("DD");
    localStorage.setItem(dbPrefix + "mm", mm);
    localStorage.setItem(dbPrefix + "dd", dd);

    modals.horoscope.close();
}

// TODO: Change jQuery to javascript?

async function saveArtistPg1(p1) {
    if ($("#artist").val().length === 0) {
        errorMessage("Enter a musician name.");
        return;
    }

    $(p1).addClass("hide");
    $(p1).next().removeClass("hide");
    var artistName = $("#artist").val();
    var { artistName, relatedArtists } = await spotifyClientCredentialsFlow({ artistName }); // Parameters: artist, callback 
    domRendersArtists(artistName, relatedArtists);
}

async function saveArtistPg2(p2) {
    if ($(p2).find(".results-list li.active").length === 0) {
        errorMessage("Please select related artists to curate your playlist.");
        return;
    }
    modals.artist.close();

    let relatedArtists = [];

    $(p2).find(".results-list li.active").map((i, relatedArtistEl) => {
        let id = relatedArtistEl.querySelector("[data-artist-id]").getAttribute("data-artist-id")
        let artist = relatedArtistEl.querySelector(".card-title").textContent;
        relatedArtists.push({ id, artist });
    });

    localStorage.setItem(dbPrefix + "relatedArtists", JSON.stringify(relatedArtists));
}

function errorMessage(message) {
    $("#modal-error").find(".error").text(message);
    modals.error.open();
}

function getZodiacImagePath(sign) {
    return `assets/img/zodiac-constellations/${sign}.png`;
}