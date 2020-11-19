Developer ReadMe
===

Settings
---

UI
this web app is for people who want to have their daily horoscopes, discover songs they might like, weather, news, stocks, etc all on one page when they open their web browser everyday. for this version, we will be adding only daily horoscopes and songs.

for the web app to generate the songs the user may be interested in, it'll ask user their favorite artist, searches up related artists, then have the user click out of those related artists which ones they may prefer. the user can preview their music.

all user questions are in bottom panels called modals. there are modals that lets you add your name, birthday, and favorite artist and then select related artists.

UX
---
The different sections of information are rearrangeable to the user's content. the zodiac sign is a constellation pattern, much like the constellation patterns floating around in the background. adding a purple background gives a Zen-like vibe. this example user likes to discover music and read horoscopes when they get on the computer. they just want to relax and vibe.

Architecture files
1. app.js: Activates the particle JS backround, and initializes the Materialize CSS modals
2. dom.js: Initializing modal, adding new sections, showing a message such as an error message, holding onto the modal instances, and rendering the related artists
3. localStorage.js: has a poller (setInterval) that checks if there are blank sections and localStorage info that were not rendered. has all functions related to saving the inputs from the user modals. has render functions because much of the sections that get rendered requires API calls for up to date information (such as daily horoscope and the top tracks among the related artists selected)

API files:
---
1. api-astrology-free.js replaces api-astrology.js because it's free
2. api-spotify.js has two groups of nested API calls for a.) getting related artists from an artist name, b.) getting 30 or less top tracks from the selected related artists and shuffling them
3. api-wiki.js experimental and may not be used. originally was going to look up biography of the related artists, but it didn't make sense from a MVP perspective. user can just preview the related artist's music to see if they're interested.

Architecture flow
---
index.html has modals that you can open at the top right setting buttons. all those modal instances are saved in modals object at dom.js so they can be referred to and triggered to open like this:
	modals.yourName.open()
	modals.artist.open()
	modals.horoscope.open()

The next available modal that has no input saved can also open when you click the + icon on the page for adding more sections.

These modals are from Materialize CSS framework. The modals were initialized along with activating the particle JS background responsible for the floating constellation patterns in the background at the beginning of the app at app.js. initModals initialize those modals and was called at app.js, but defined at dom.js

Most modals have only one page, but the artist search modal has two pages (first page to search your artist, and the second page to select out of the related artists to generate the playlist). The multiple pages are implemented by hiding or showing page 1 or page 2 inside the artist modal.

At the end of a modal, the user clicks Save, then the inputs gets saved to localStorage so that it renders immediately and when the web browser loads the page.

When rendering the zodiac sign and the playlist, they can change day to day. Daily horoscope depends on the day. The playlist is based on the top tracks of the related artists, and those tracks change through the year. So when it's rendering, it's making API calls to get this information. So some API calls are in localStorage.js as it relates to saving information to localStorage and also immediately rendering latest API information to the webpage. The definitions for the API calls are in the api files.