const app = {
    init: () => {

        try {
            initModals();
            (function detectIfFirstUse() {

            })
        } catch (error) {
            alert(error)
        }
    }
}

app.init();