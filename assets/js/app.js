const app = {
    init: () => {

        try {
            initModals();
            userInputsArtist();
        } catch (error) {
            alert(error)
        }
    }
}

app.init();