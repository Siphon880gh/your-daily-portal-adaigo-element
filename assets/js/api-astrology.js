/**
 * @function astrologyAPI Calls Astrology API. Then gets daily horoscope based on your birthday.  
 * How to call: let astrologyResponse = await astrologyAPI({ mm, dd });
 * API Guide: https://www.astrologyapi.com/docs/api-ref/75/sun_sign_prediction/daily/:zodiacName
 *
 */
async function astrologyAPI(context) {
    let { mm, dd } = context;

    let auth = {
        userId: "614814",
        apiKey: "aa34ac4d7779fe666903ba00ba342be7",
        getBase64: function() {
            let userId = auth.userId;
            let apiKey = auth.apiKey;
            return btoa(userId + ":" + apiKey);
        }
    }
    let urls = {

        base: "https://json.astrologyapi.com/v1/",
        daily: "sun_sign_prediction/daily/"
    }

    async function getResponse(method, resource, urlParams) {
        let gotBase64 = auth.getBase64();
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic " + gotBase64);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let requestOptions = {
            method,
            headers: myHeaders,
            // body: urlParams,
            redirect: 'follow'
        };

        let url = urls.base + resource + urlParams;
        return fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => result)
    }
    async function requestHoroscopePrediction(sign) {
        let dailyUrlPart = urls.daily;
        const daily = await getResponse("POST", dailyUrlPart, sign);
        console.group("Astrology API");
        console.log({ daily });
        console.groupEnd();
    }

    function changeBirthdayToSign(context) {
        let { mm, dd } = context;
        mm = parseInt(mm);
        dd = parseInt(dd);

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

    let sign = changeBirthdayToSign({ mm, dd })
    let prediction = await requestHoroscopePrediction(sign);
    return { sign, prediction };
}