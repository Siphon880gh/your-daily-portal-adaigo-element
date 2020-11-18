async function astrologyAPI(context) {
    var { mm, dd } = context;

    var auth = {
        userId: "614814",
        apiKey: "aa34ac4d7779fe666903ba00ba342be7",
        getBase64: function() {
            var userId = auth.userId;
            var apiKey = auth.apiKey;
            return btoa(userId + ":" + apiKey);
        }
    }
    var urls = {

        base: "http://api.vedicrishiastro.com/v1/",
        daily: "sun_sign_prediction/daily/"
    }

    async function getResponse(resource, urlParams) {
        var gotBase64 = auth.getBase64();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic " + gotBase64);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            // body: urlParams,
            redirect: 'follow'
        };

        var url = urls.base + resource + urlParams;
        return fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => result)
            .catch(error => alert('Error: ', error));
    }
    async function testFromSign(sign) {
        console.group("Astrology API");
        try {
            var dailyUrlPart = urls.daily;
            const daily = await getResponse(dailyUrlPart, sign);
            console.log(daily);
            console.groupEnd();
        } catch (err) {
            console.log(err);
            console.groupEnd();
        }
    }

    function changeBirthdayToSign(mm, dd) {
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

    testFromSign("pisces");
}

astrologyAPI({ mm: "02", dd: "06" });

// window.astrologyReport()

// global.astrologyBaseUrl = "http://api.vedicrishiastro.com/v1/";
// var userID = "614814";
// var apiKey = "aa34ac4d7779fe666903ba00ba342be7";

// var getPrediction = (date)


// var getResponse = (resource, data, callback, userID, apiKey) => {
//     // var url = baseUrl + resource;
//     var url = "http://api.vedicrishiastro.com/v1/" + resource;
//     var auth = "Basic " + Buffer.from(userID + ":" + apiKey, 'binary').toString('base64');
//     request({
//             url: url,
//             headers: {
//                 Authorization: auth,
//             },
//             method: "POST",
//             form: data,
//         },
//         function(err, res, body) {
//             if (!err) {
//                 if (typeof callback === "function") {
//                     console.log(body);
//                     return callback(null, body);
//                 }
//             }
//             if (typeof callback === "function") {
//                 return callback(err);
//             }
//             console.log("callback not provided properly");
//         }
//     );
// };

// var packageHoroData = (
//     date,
//     month,
//     year,
//     hour,
//     minute,
//     latitude,
//     longitude,
//     timezone
// ) => {
//     return {
//         day: date,
//         month: month,
//         year: year,
//         hour: hour,
//         min: minute,
//         lat: latitude,
//         lon: longitude,
//         tzone: timezone,
//     };
// };

// var packageNumeroData = (date, month, year, name) => {
//     return {
//         day: date,
//         month: month,
//         year: year,
//         name: name,
//     };
// };

// var packageMatchMakingData = (maleBirthData, femaleBirthData) => {
//     mData = {
//         m_day: maleBirthData["date"],
//         m_month: maleBirthData["month"],
//         m_year: maleBirthData["year"],
//         m_hour: maleBirthData["hour"],
//         m_min: maleBirthData["minute"],
//         m_lat: maleBirthData["latitude"],
//         m_lon: maleBirthData["longitude"],
//         m_tzone: maleBirthData["timezone"],
//     };
//     fData = {
//         f_day: femaleBirthData["date"],
//         f_month: femaleBirthData["month"],
//         f_year: femaleBirthData["year"],
//         f_hour: femaleBirthData["hour"],
//         f_min: femaleBirthData["minute"],
//         f_lat: femaleBirthData["latitude"],
//         f_lon: femaleBirthData["longitude"],
//         f_tzone: femaleBirthData["timezone"],
//     };

//     return Object.assign(mData, fData);
// };

// var api = {
//     call: (
//         resource,
//         date,
//         month,
//         year,
//         hour,
//         minute,
//         latitude,
//         longitude,
//         timezone,
//         callback
//     ) => {
//         var data = packageHoroData(
//             date,
//             month,
//             year,
//             hour,
//             minute,
//             latitude,
//             longitude,
//             timezone
//         );
//         return getResponse(resource, data, callback);
//     },

//     numeroCall: (resource, date, month, year, name, callback) => {
//         var data = packageNumeroData(date, month, year, name);
//         return getResponse(resource, data, callback);
//     },

//     matchMakingCall: (resource, maleBirthData, femaleBirthData, callback) => {
//         var data = packageMatchMakingData(maleBirthData, femaleBirthData);
//         return getResponse(resource, data, callback);
//     },
// };
// // document.getElementById("formSubmit").addEventListener("click", function () {
// //   let dd = document.querySelector("#dd").value;
// //   let mm = document.querySelector("#mm").value;
// //   let yyyy = document.querySelector("#yyyy").value;



// // console.log(dd);
// // console.log(mm);
// // console.log(yyyy);
// // });

// // module.exports = api;

// // getResponse("sun_sign_prediction/daily/", {
// //     day: "02/02/1994",
// //     month: "02",
// //     year: "1994",
// //     name: 'IAmARobot'
// // }, () => {}, userID, apiKey);

// getResponse("sun_sign_prediction/daily/",
//     "pisces", () => {}, userID, apiKey);