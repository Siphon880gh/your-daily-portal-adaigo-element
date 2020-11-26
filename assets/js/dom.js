function domRendersArtists(artistName, relatedArtists) {
    // Let user know which artist we are querying related artists for
    const artistTitleContainer = document.querySelector('.results-container .results-title');
    const artistTitleTextEl = document.createElement('h2');
    artistTitleTextEl.id = 'results-title-text';
    artistTitleTextEl.textContent = artistName;
    artistTitleContainer.append(artistTitleTextEl);

    // Clear related artists section where 'Loading...' text was
    const artistsContainer = document.querySelector('.results-container .results-list');
    artistsContainer.textContent = '';

    // Map takes an array and changes its elements to a different arrayl
    // For example: [1,2,3] => [2,4,6] if the map function takes each element and return el*2
    // Guide: https://www.w3schools.com/jsref/jsref_map.asp
    let artistEls = relatedArtists.map((artist) => {
        let { name, id } = artist;
        let href = artist.external_urls.spotify;
        let imageUrl = artist.images[0].url;

        let template = document.querySelector('.template-artist-card').innerHTML;
        template = template
            .replace('_name_', name)
            .replace('_id_', id)
            .replace('_href_', href)
            .replace('_imageUrl_', imageUrl)
        let liEl = document.createElement('li');
        liEl.classList = 'collection-item';
        liEl.innerHTML = template;
        liEl.addEventListener('click', function(event) {
            $(this).toggleClass('active');
        });

        return liEl;
    });

    // Spread syntax
    // Takes an array and spreads it out
    // let arr = [1,2,3 
    // doMath(...arr) => Becomes doMath(arr[0], arr[1], arr[2])
    artistsContainer.append(...artistEls); // TO REVIEW: Similar to .append(liEl0, liEl1, etc)

    // $(artistsContainer).sortable(); // making it drag and drop
}

// Materialize modal instances
let modals = {
    'yourName': null,
    'artist': null,
    'horoscope': null,
    'message': null
}

function initModals() {
    // Save Materialize modal instances

    // - Your Name modal for setting your display name -

    //Weng, does it make sense to refractor your code like this?
    // let yourNameEl = $('.modal-your-name');
    let yourNameEl = document.querySelector('#modal-your-name');
    modals.yourName = M.Modal.init(yourNameEl);

    // - Artists Modal for setting favorite artist -
    let artistModalEl = document.querySelector('#modal-artist');
    modals.artist = M.Modal.init(artistModalEl);

    // - Horoscope Modal for setting birthday -
    let horoscopeModalEl = document.querySelector('#modal-horoscope');
    modals.horoscope = M.Modal.init(horoscopeModalEl);

    let minYear = 1940;
    let currentYear = parseInt(moment().format('YYYY'));
    let instances = M.Datepicker.init(document.querySelector('#datepicker'), {
        changeMonth: true,
        changeYear: true,
        yearRange: [minYear, currentYear]
    });


    // - Message Modal for errors etc -
    let messageModalEl = document.querySelector('#modal-message');
    modals.message = M.Modal.init(messageModalEl);
}

function message(title, titleColor, message) {
    const $messageModal = $('#modal-message');
    $messageModal.find('.title').text(title);
    $messageModal.find('.title').css('color', titleColor);
    $messageModal.find('.message').html(message);
    modals.message.open();
}

function newSection() {
    if ($('#front-username').html().length === 0) {
        modals.yourName.open();
    } else if ($('#front-horoscope').html().length === 0) {
        modals.horoscope.open();
    } else if ($('#front-playlist').html().length === 0) {
        modals.artist.open();
    } else {
        message('Coming soon', 'Black', `New elements coming to the Daily Dashboard: Weather, Stocks, News, Favorites, Todo List, Reading List. We may make this into a Chrome Extension or Firefox extension.<br/><br/>Business opportunity? Add ads on users' free version.<br/><br/>Contact us at <a href='
            mailto: weffung @ucdavis.edu '>weffung@ucdavis.edu</a> if you are interested.`)
    }

} // newSection