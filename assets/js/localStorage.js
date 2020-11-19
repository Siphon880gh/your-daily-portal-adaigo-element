let dbPrefix = "dailyDashboard_";

function saveHoroscope(birthdate) {
    const mm = moment(birthdate).format("MM");
    const dd = moment(birthdate).format("DD");
    localStorage.setItem(dbPrefix + "mm", mm);
    localStorage.setItem(dbPrefix + "dd", dd);
}


async function saveArtistPg1(p1) {
    if ($("#artist").val().length === 0)
        return;

    $(p1).addClass("hide");
    $(p1).next().removeClass("hide");
    var artistName = $("#artist").val();
    var { artistName, relatedArtists } = await spotifyClientCredentialsFlow({ artistName }); // Parameters: artist, callback 
    domRendersArtists(artistName, relatedArtists);
}