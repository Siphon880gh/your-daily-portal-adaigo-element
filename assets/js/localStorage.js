let dbPrefix = "dailyDashboard_";

function saveDisplayName(yourName) {
    if (yourName.length === 0) {
        message("Error", "red", "Enter a display name you want to be greeted with.");
        return;
    }
    console.log(yourName);

    localStorage.setItem(dbPrefix + "displayName", yourName);
    render("displayName");
    modals.yourName.close();
}

function saveHoroscope(birthdate) {
    if (birthdate.length === 0) {
        message("Error", "red", "Select your birthday.");
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
        message("Error", "red", "Enter a musician name.");
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
        message("Error", "red", "Please select related artists to curate your playlist.");
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

function getZodiacImagePath(sign) {
    return `assets/img/zodiac-constellations/${sign}.png`;
}

(function detectIfFirstUse() {

})

function render(section) {
    switch (section) {
        case "displayName":
            let displayName = localStorage.getItem(dbPrefix + "displayName");
            if (displayName) {
                $("#front-username").text(`Greetings ${displayName},`);
            }
            break;
    }
}

setInterval(() => {
    if ($("#front-username").html().length === 0) {
        render("displayName");
    }
}, 20);