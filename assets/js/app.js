const app = {
    init: () => {

        try {
            userInputsArtist();
        } catch (error) {
            alert(error)
        }
    }
}

app.init();