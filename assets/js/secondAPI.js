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

// Parameters for client side MediaWiki. Wikipedia does not have an official API s
// lgname
// User name.

// lgpassword
// Password.

// lgdomain
// Domain (optional).

// lgtoken
// A "login" token retrieved from action=query&meta=tokens

// Example:
// Log in.
// api.php?action=login&lgname=user&lgpassword=password&lgtoken=123ABC [open in sandbox]
//This is the wiki way to do parameter search with out API key 
//Create a new object to interact with the server
var xhr = new XMLHttpRequest();

var url = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch='New_England_Patriots'";

// Provide 3 arguments (GET/POST, The URL, Async True/False)
xhr.open('GET', url, true);

// Once request has loaded...
xhr.onload = function() {
    // Parse the request into JSON
    var data = JSON.parse(this.response);

    // Log the data object
    console.log(data);

    // Log the page objects
    console.log(data.query.pages)

    // Loop through the data object
    // Pulling out the titles of each page
    for (var i in data.query.pages) {
        console.log(data.query.pages[i].title);
    }
}
// Send request to the server asynchronously
xhr.send();


