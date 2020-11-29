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
};

function saveMode(modeForm) {
    console.log(modeForm);
    let modeSelected = modeForm.querySelector('input:checked').value;

    localStorage.setItem(dbPrefix + "modeSelected", modeSelected);
    render("mode");
    modals.modes.close();
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

    render("horoscope");
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
    let artistNameInput = $("#artist").val();
    let { artistName, relatedArtists } = await spotifyClientCredentialsFlow_relatedArtists({ artistNameInput }); // Parameters: artist, callback 
    domRendersArtists(artistName, relatedArtists);
}

async function saveArtistPg2(p2) {
    if ($(p2).find(".results-list li.active").length === 0) {
        message("Error", "red", "Please select related artists to curate your playlist.");
        return;
    }
    let relatedArtists = [];

    $(p2).find(".results-list li.active").map((i, relatedArtistEl) => {
        let id = relatedArtistEl.querySelector("[data-artist-id]").getAttribute("data-artist-id")
        let artist = relatedArtistEl.querySelector(".card-title").textContent;
        relatedArtists.push({ id, artist });
    });

    localStorage.setItem(dbPrefix + "relatedArtists", JSON.stringify(relatedArtists));
    render("playlist");
    modals.artist.close();
} // saveArtistPg2

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
                horoscopeEl.innerHTML = "";
                let imgEl = document.createElement("img");
                imgEl.src = getZodiacImagePath(zodiac);
                imgEl.alt = `Your zodiac sign ${zodiac}`;
                horoscopeEl.append(imgEl);

                let div = document.createElement("div");
                let astrologyResponse = await astrologyAPIFree(zodiac);
                div.innerHTML = `${astrologyResponse.current_date}<br/><br/>${astrologyResponse.description} You will be in this mood: ${astrologyResponse.mood}. Your lucky color, number, and time will be: ${astrologyResponse.color}, ${astrologyResponse.lucky_number}, ${astrologyResponse.lucky_time}`;
                horoscopeEl.append(div);
            }
            break;
        case "mode":
            let modeSelected = localStorage.getItem(dbPrefix + "modeSelected");
            if (modeSelected) {
                /**
                 * Different modes are:
                 *   mode-zen
                 *   mode-clean
                 *   mode-dark
                 */
                if (modeSelected === "mode-zen") {
                    $("#particles-js").css("background-color", 'rgb(83, 25, 218)');
                    app.activateParticleJs();
                } else if (modeSelected === "mode-clean") {
                    // Clean mode is gray background with lesser dots and lines in the background
                    $("#particles-js").css("background-color", "gray");
                    particlesJS("particles-js", { "particles": { "number": { "value": 40, "density": { "enable": true, "value_area": 900 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 2 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } }, "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } }, "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 4, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 600, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 30, "duration": 2, "opacity": 4, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 2 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true });
                    let update;
                    update = function() {
                        if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {}
                        requestAnimationFrame(update);
                    };
                } else if (modeSelected === "mode-dark") {
                    $("#particles-js").css("background-color", "black");
                    app.activateParticleJs();
                }
            } // if
            break;
        case "playlist":
            let relatedArtists = localStorage.getItem(dbPrefix + "relatedArtists");
            if (relatedArtists) {
                relatedArtists = JSON.parse(relatedArtists);
                let playlistEl = document.querySelector("#front-playlist");
                playlistEl.innerHTML = "";
                let div1 = document.createElement("div"); // div has text content from CSS
                playlistEl.appendChild(div1);

                // Create the two side by side list of songs
                let songs = await spotifyClientCredentialsFlow_playlist({ relatedArtists });
                songs = songs.map(iel => {
                    let div = document.createElement("div");
                    div.textContent = iel.songTitle;
                    div.classList = "clickable";
                    div.addEventListener("click", () => { window.open(iel.url); });
                    return div;
                });
                let songsLeft = songs.slice(0, 15);
                let songsRight = songs.slice(15);

                let splitPlaylistLeft = document.createElement("div");
                splitPlaylistLeft.className = "playlist-column";
                let splitPlaylistRight = document.createElement("div");
                splitPlaylistRight.className = "playlist-column";

                splitPlaylistLeft.append(...songsLeft);
                splitPlaylistRight.append(...songsRight);

                let div = document.createElement("div");
                div.append(splitPlaylistLeft, splitPlaylistRight);
                playlistEl.append(div);

                // Reset artist modal
                $("#modal-artist .p2").addClass("hide");
                $("#modal-artist .p1").removeClass("hide");
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