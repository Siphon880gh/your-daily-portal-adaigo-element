async function secondApiFlow(artistsArray, artistName, callback) {

    async function firstAPICall() {
        // return fetch...
    }

    async function secondAPICall() {
        // return fetch...
    }

    /**
     * @function main
     * Ties all the API steps together, then calls back (for example render function) 
     */
    async function main(artistsArray, artistName, callback) {

        // Call the API functions thare are defined at the same indentation level as main
        // var someObject = await fetchAPICall();

        callback(artistName, artistsArray);
    } // main

    main(artistsArray, artistName, callback);
}