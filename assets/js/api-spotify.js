/**
 * Authorize Spotify with client credentials flow
 * Guide on this authorization flow: https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow
 * Create Spotify app at https://developer.spotify.com/dashboard/applications
 * @function clientCredentialsFlow
 * 
 */
async function spotifyClientCredentialsFlow_relatedArtists(context) {
    var { artistName } = context;

    /**
     * Get the access token for your Spotify App
     * Authorization type: Basic
     * Input: client_id, client_secret, grant_type
     * Output: access token
     * @function getAccessToken
     * 
     */
    async function getAccessToken() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic NDg3MmM3MDU1NzVhNDU5M2EyMjRkZjhlY2RlOGNmZjY6MzM1MjA1ZmJkNzU0NDlmMTg1MTQxZGI4NDU2OGM4MGQ=");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Cookie", "__Host-device_id=AQCRGraHLh7exU3bLCTNZeXoxf5C5tdKL4vFbN4MYhpGZTwnMUisw35CBX0b6zvzrNzPHdFA25GqXO3NdX12SFcuCocGxmtGPA0");

        var urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "client_credentials");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch("https://accounts.spotify.com/api/token", requestOptions)
            .then(response => response.json())
            .then(result => result)
            .catch(error => console.log('error', error));
    }; // getAccessToken

    /**
     * Get the Spotify ID for the artist. That's needed to search related artists later on
     * API Guide on general searches: https://developer.spotify.com/console/search/
     * Authorization type: Bearer access token
     * Input: bearer access token, artist name
     * Output: object including artist id
     * @function getArtistId
     * 
     */
    async function getArtistId(bearerAccessToken, artistName) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + bearerAccessToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        return fetch("https://api.spotify.com/v1/search?q=artist:" + artistName + "&type=artist", requestOptions)
            .then(response => response.json())
            .then(result => result)
            .catch(error => console.log('error', error));
    } // getArtistId

    /**
     * Get related artists.
     * API Guide on related artists search: https://developer.spotify.com/console/get-artist-related-artists/
     * Authorization type: Bearer access token
     * Input: bearer access token, artist id
     * Output: object including related artists and their id's 
     * @function getArtistId
     * 
     */
    async function getRelatedArtists(bearerAccessToken, artistId) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + bearerAccessToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        return fetch("https://api.spotify.com/v1/artists/" + artistId + "/related-artists", requestOptions)
            .then(response => response.json())
            .then(result => result)
            .catch(error => console.log('error', error));
    } // getRelatedArtists


    /** 
     * @expect {"access_token":"<Temporary Bearer Access Token>","token_type":"Bearer","expires_in":3600,"scope":""}
     */
    let accessTokenObject = await getAccessToken();
    let bearerAccessToken = accessTokenObject.access_token;
    console.group("Spotify API");
    console.dir({ accessTokenObject })
    console.groupEnd();

    let artistObject = await getArtistId(bearerAccessToken, artistName);
    let artistId = artistObject.artists.items[0].id;
    console.group("Spotify API");
    console.dir({ artistObject })
    console.groupEnd();

    let relatedArtistsObject = await getRelatedArtists(bearerAccessToken, artistId);
    let relatedArtists = relatedArtistsObject.artists;
    console.group("Spotify API");
    console.dir({ relatedArtistsObject })
    console.groupEnd();

    return { artistName, relatedArtists };
} // spotifyClientCredentialsFlow_relatedArtists

/**
 * Authorize Spotify with client credentials flow
 * Guide on this authorization flow: https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow
 * Create Spotify app at https://developer.spotify.com/dashboard/applications
 * @function clientCredentialsFlow
 * 
 */
async function spotifyClientCredentialsFlow_playlist(context) {
    var { relatedArtists } = context;

    /**
     * Get the access token for your Spotify App
     * Authorization type: Basic
     * Input: client_id, client_secret, grant_type
     * Output: access token
     * @function getAccessToken
     * 
     */
    async function getAccessToken() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic NDg3MmM3MDU1NzVhNDU5M2EyMjRkZjhlY2RlOGNmZjY6MzM1MjA1ZmJkNzU0NDlmMTg1MTQxZGI4NDU2OGM4MGQ=");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Cookie", "__Host-device_id=AQCRGraHLh7exU3bLCTNZeXoxf5C5tdKL4vFbN4MYhpGZTwnMUisw35CBX0b6zvzrNzPHdFA25GqXO3NdX12SFcuCocGxmtGPA0");

        var urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "client_credentials");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        return fetch("https://accounts.spotify.com/api/token", requestOptions)
            .then(response => response.json())
            .then(result => result)
            .catch(error => console.log('error', error));
    }; // getAccessToken

    /**
     * Get the Spotify ID for the artist. That's needed to search related artists later on
     * API Guide on general searches: https://developer.spotify.com/console/search/
     * Authorization type: Bearer access token
     * Input: bearer access token, artist name
     * Output: object including artist id
     * @function getArtistId
     * 
     */
    async function getSongs(bearerAccessToken, relatedArtists) {

        let relatedArtistIds = relatedArtists.map(relatedArtist => relatedArtist.id);
        let theirTopTracks = await relatedArtistIds.map(artistId => {

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + bearerAccessToken);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            return fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, requestOptions)
                .then(response => response.json())
                .then(result => result)
                .catch(error => console.log('error', error));
        });

        // If we are limited to a number of songs in the playlist, then if an user picks X number of artists
        // then have each artist contribute similar amount of songs
        let limitSongs = 30; // combine all songs from selected artists up to 15 songs total
        let limitArtists = relatedArtists.length;
        let limitSongsPerArtist = limitSongs / limitArtists;
        let tracks = [];

        /**
         * @array artists
         * All their artists with their top tracks
         * 
         * 
         */
        return Promise.all(theirTopTracks).then(artists => {
            /**
             * 
             * @object topTracks
             * An artist's top tracks
             * where topTracks.track[i] includes name and external_urls.spotify
             * 
             */
            console.group("Distributing artists among the playlist");
            console.info("Should count up to some number, then restart counting to the same number or less (if artist has less songs listed in their top tracks). It will cycle the number of times there are artists.");
            artists.forEach(topTracks => {
                var topTracks = topTracks.tracks;
                topTracks.forEach((track, i) => {

                    if (i < limitSongsPerArtist) {
                        console.log(i);
                        tracks.push({
                            songTitle: track.name,
                            url: track.external_urls.spotify
                        });
                    } else {
                        return false;
                    }
                })
            });

            tracks = tracks.slice(0, limitSongs);
            console.groupEnd();
            return tracks;
        });

    } // getSongs

    /** 
     * @expect {"access_token":"<Temporary Bearer Access Token>","token_type":"Bearer","expires_in":3600,"scope":""}
     */
    let accessTokenObject = await getAccessToken();
    let bearerAccessToken = accessTokenObject.access_token;
    console.group("Spotify API");
    console.dir({ accessTokenObject })
    console.groupEnd();

    var songs = await getSongs(bearerAccessToken, relatedArtists);
    // debugger;
    // var songs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 20]; // Mock data
    songs = songs.sort(function(a, b) { return 0.5 - Math.random() });
    console.group("Spotify API");
    console.dir({ songs })
    console.groupEnd();

    return songs;
} // spotifyClientCredentialsFlow_playlist