/**
 * Authorize Spotify with client credentials flow
 * Guide on this authorization flow: https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow
 * Create Spotify app at https://developer.spotify.com/dashboard/applications
 * @function clientCredentialsFlow
 * 
 */
async function spotifyClientCredentialsFlow(context, callback) {
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
    const accessTokenObject = await getAccessToken();
    const bearerAccessToken = accessTokenObject.access_token;

    const artistObject = await getArtistId(bearerAccessToken, artistName);
    const artistId = artistObject.artists.items[0].id;

    const relatedArtistsObject = await getRelatedArtists(bearerAccessToken, artistId);
    const relatedArtists = relatedArtistsObject.artists;

    // Debugging
    console.group("Spotify API")
    console.table({
        accessTokenObject,
        artistObject,
        relatedArtistsObject
    });
    console.groupEnd();

    return { artistName, relatedArtists };
}