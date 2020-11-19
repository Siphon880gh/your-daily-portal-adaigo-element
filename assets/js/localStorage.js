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

async function saveHoroscope(birthdate) {
    if (birthdate.length === 0) {
        message("Error", "red", "Select your birthday.");
        return;
    }

    // Convert datepicker -> moment js -> string
    let mm = moment(birthdate).format("MM");
    let dd = moment(birthdate).format("DD");

    // Convert string to int
    mm = parseInt(mm);
    dd = parseInt(dd);

    function changeBirthdayToSign(mm, dd) {

        /**
         * 
         * @schema date to sign
         *  capricorn: dec22-jan19
         *  aquarius jan20-feb18
         *  pisces feb19-mar20
         *  aries mar21-apr19
         *  taurus apr20-may20
         *  gemini may21-jun20
         *  cancer jun21-jul22
         *  leo jul23-aug22
         *  virgo aug23-sep22
         *  libra sep23-oct22
         *  scorpio oct23-nov21
         *  sagittarius nov22-21
         * 
         */

        if ((mm == 1 && dd <= 20) || (mm == 12 && dd >= 22)) {
            return "capricorn";
        } else if ((mm == 1 && dd >= 21) || (mm == 2 && dd <= 18)) {
            return "aquarius";
        } else if ((mm == 2 && dd >= 19) || (mm == 3 && dd <= 20)) {
            return "pisces";
        } else if ((mm == 3 && dd >= 21) || (mm == 4 && dd <= 20)) {
            return "aries";
        } else if ((mm == 4 && dd >= 21) || (mm == 5 && dd <= 20)) {
            return "taurus";
        } else if ((mm == 5 && dd >= 21) || (mm == 6 && dd <= 20)) {
            return "gemini";
        } else if ((mm == 6 && dd >= 22) || (mm == 7 && dd <= 22)) {
            return "cancer";
        } else if ((mm == 7 && dd >= 23) || (mm == 8 && dd <= 23)) {
            return "leo";
        } else if ((mm == 8 && dd >= 24) || (mm == 9 && dd <= 23)) {
            return "virgo";
        } else if ((mm == 9 && dd >= 24) || (mm == 10 && dd <= 23)) {
            return "libra";
        } else if ((mm == 10 && dd >= 24) || (mm == 11 && dd <= 22)) {
            return "scorpio";
        } else if ((mm == 11 && dd >= 23) || (mm == 12 && dd <= 21)) {
            return "sagittarius";
        }
    } // changeBirthdayToSign

    let zodiac = changeBirthdayToSign(mm, dd);
    localStorage.setItem(dbPrefix + "zodiac", zodiac)

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
    var { artistName, relatedArtists } = await spotifyClientCredentialsFlow_relatedArtists({ artistName }); // Parameters: artist, callback 
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


(function detectIfFirstUse() {

})

async function render(section) {
    function getZodiacImagePath(zodiac) {
        return `assets/img/zodiac-constellations/${zodiac}.png`;
    }

    switch (section) {
        case "displayName":
            let displayName = localStorage.getItem(dbPrefix + "displayName");
            if (displayName) {
                $("#front-username").text(`Greetings ${displayName},`);
            }
            break;
        case "horoscope":
            let zodiac = localStorage.getItem(dbPrefix + "zodiac");
            if (zodiac) {
                let horoscopeEl = document.querySelector("#front-horoscope");
                let imgEl = document.createElement("img");
                imgEl.src = getZodiacImagePath(zodiac);
                imgEl.alt = `Your zodiac sign ${zodiac}`;
                horoscopeEl.append(imgEl);

                let div = document.createElement("div");
                var astrologyResponse = await astrologyAPIFree(zodiac);
                div.innerHTML = `${astrologyResponse.current_date}<br/><br/>${astrologyResponse.description} You will be in this mood: ${astrologyResponse.mood}. Your lucky color, number, and time will be: ${astrologyResponse.color}, ${astrologyResponse.lucky_number}, ${astrologyResponse.lucky_time}`;
                horoscopeEl.append(div);
            }
            break;
        case "playlist":
            let relatedArtists = localStorage.getItem(dbPrefix + "relatedArtists");
            if (relatedArtists) {
                relatedArtists = JSON.parse(relatedArtists);
                // let songs = await spotifyClientCredentialsFlow_playlist({relatedArtists});
                let playlistEl = document.querySelector("#front-playlist");
                let div1 = document.createElement("div"); // div has text content from CSS
                playlistEl.appendChild(div1);

                // Create the two side by side list of songs
                let songs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]; // Mock data
                songs = songs.map(iel => {
                    let div = document.createElement("div");
                    div.textContent = iel;
                    return div;
                });
                var songsLeft = songs.slice(0, 15);
                var songsRight = songs.slice(15);

                let splitPlaylistLeft = document.createElement("div");
                splitPlaylistLeft.className = "playlist-column";
                let splitPlaylistRight = document.createElement("div");
                splitPlaylistRight.className = "playlist-column";

                splitPlaylistLeft.append(...songsLeft);
                splitPlaylistRight.append(...songsRight);

                let div = document.createElement("div");
                div.append(splitPlaylistLeft, splitPlaylistRight);
                playlistEl.append(div);
            }
            break;
    } // switch

    $(".collection").sortable();
}

setInterval(() => {
    if ($("#front-username").html().length === 0) {
        render("displayName");
    }
    if ($("#front-horoscope").html().length === 0) {
        render("horoscope");
    }
    if ($("#front-playlist").html().length === 0) {
        render("playlist");
    }
}, 20);