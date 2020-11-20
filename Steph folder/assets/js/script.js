var api = "planets";
var userId = "614814";
var apiKey = "90bbaa33a74a06735ef3546a68c265ad";
var day = document.getElementById("dd")
var month = document.getElementById("mm")
var year = document.getElementById("yyyy")
var hour = document.getElementById("h")
var min = document.getElementById("minute")
var lat = document.getElementById("latitude")
var lon = document.getElementById("longitude")
var tzone = document.getElementById("timezone")


function submitHoroscope(event) {
  event.preventDefault()
  console.log("day", day.value)

  var data = {
    day: day.value,
    month: month.value,
    year: year.value,
    hour: hour.value,
    min: min.value,
    lat: lat.value,
    lon: lon.value,
    tzone: tzone.value,
    
  };


$.ajax({
  url: "https://json.astrologyapi.com/v1/" + api,
  method: "POST",
  dataType: "json",
  headers: {
    authorization: "Professional " + btoa(userId + ":" + apiKey),
    "Content-Type": "application/json",
  },
  data: JSON.stringify(data),
}).then(function (resp) {


  console.log(resp);
});

}




/**
 * @function astrologyAPIFree Calls free Astrology API. Gets daily horoscope based on your zodiac sign.  
 * How to call: var astrologyResponse = await astrologyAPIFree(sign);
 * API Guide: https://www.astrologyapi.com/docs/api-ref/75/sun_sign_prediction/daily/:zodiacName
 *
 */
async function astrologyAPIFree(sign) {

  var myHeaders = new Headers();

  var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
  };

  return fetch("https://aztro.sameerkumar.website/?day=today&sign=" + sign, requestOptions)
      .then(response => response.json())
      .then(result => result)
      .catch(error => console.log('error', error));
}


// /**
//  * @function astrologyAPI Calls Astrology API. Then gets daily horoscope based on your birthday.  
//  * How to call: var astrologyResponse = await astrologyAPI({ mm, dd });
//  * API Guide: https://www.astrologyapi.com/docs/api-ref/75/sun_sign_prediction/daily/:zodiacName
//  *
//  */
// async function astrologyAPI(context) {
//   var { mm, dd } = context;

//   var auth = {
//       userId: "614814",
//       apiKey: "aa34ac4d7779fe666903ba00ba342be7",
//       getBase64: function() {
//           var userId = auth.userId;
//           var apiKey = auth.apiKey;
//           return btoa(userId + ":" + apiKey);
//       }
//   }
//   var urls = {

//       base: "https://json.astrologyapi.com/v1/",
//       daily: "sun_sign_prediction/daily/"
//   }

//   async function getResponse(method, resource, urlParams) {
//       var gotBase64 = auth.getBase64();
//       var myHeaders = new Headers();
//       myHeaders.append("Authorization", "Basic " + gotBase64);
//       myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//       var requestOptions = {
//           method,
//           headers: myHeaders,
//           // body: urlParams,
//           redirect: 'follow'
//       };

//       var url = urls.base + resource + urlParams;
//       return fetch(url, requestOptions)
//           .then(response => response.json())
//           .then(result => result)
//   }
//   async function requestHoroscopePrediction(sign) {
//       var dailyUrlPart = urls.daily;
//       const daily = await getResponse("POST", dailyUrlPart, sign);
//       console.group("Astrology API");
//       console.log({ daily });
//       console.groupEnd();
//   }

//   function changeBirthdayToSign(context) {
//       let { mm, dd } = context;
//       mm = parseInt(mm);
//       dd = parseInt(dd);

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
//       if ((mm == 1 && dd <= 20) || (mm == 12 && dd >= 22)) {
//           return "capricorn";
//       } else if ((mm == 1 && dd >= 21) || (mm == 2 && dd <= 18)) {
//           return "aquarius";
//       } else if ((mm == 2 && dd >= 19) || (mm == 3 && dd <= 20)) {
//           return "pisces";
//       } else if ((mm == 3 && dd >= 21) || (mm == 4 && dd <= 20)) {
//           return "aries";
//       } else if ((mm == 4 && dd >= 21) || (mm == 5 && dd <= 20)) {
//           return "taurus";
//       } else if ((mm == 5 && dd >= 21) || (mm == 6 && dd <= 20)) {
//           return "gemini";
//       } else if ((mm == 6 && dd >= 22) || (mm == 7 && dd <= 22)) {
//           return "cancer";
//       } else if ((mm == 7 && dd >= 23) || (mm == 8 && dd <= 23)) {
//           return "leo";
//       } else if ((mm == 8 && dd >= 24) || (mm == 9 && dd <= 23)) {
//           return "virgo";
//       } else if ((mm == 9 && dd >= 24) || (mm == 10 && dd <= 23)) {
//           return "libra";
//       } else if ((mm == 10 && dd >= 24) || (mm == 11 && dd <= 22)) {
//           return "scorpio";
//       } else if ((mm == 11 && dd >= 23) || (mm == 12 && dd <= 21)) {
//           return "sagittarius";
//       }
//   } // changeBirthdayToSign

//   let sign = changeBirthdayToSign({ mm, dd })
//   let prediction = await requestHoroscopePrediction(sign);
//   return { sign, prediction };
// }


























//${formSubmit}  google api inside .then set the values (lat.long) in the data object then do the call to astorology api
// the loop from the astro api array 

// input.addEventListener("click", function () {
  
//   event.preventDefault()
  
  
// })



// var request = require("request");
// var http = require("http");

// var baseUrl = "http://api.vedicrishiastro.com/v1/";
// var userID = "614814";
// var apiKey = "aa34ac4d7779fe666903ba00ba342be7";

// var getResponse = (resource, data, callback) => {
//   var url = baseUrl + resource;
//   var auth = "Basic " + new Buffer(userID + ":" + apiKey).toString("base64");
//   request(
//     {
//       url: url,
//       headers: {
//         Authorization: auth,
//       },
//       method: "POST",
//       form: data,
//     },
//     function (err, res, body) {
//       if (!err) {
//         if (typeof callback === "function") {
//           return callback(null, body);
//         }
//       }
//       if (typeof callback === "function") {
//         return callback(err);
//       }
//       console.log("callback not provided properly");
//     }
//   );
// };

// var packageHoroData = (
//   date,
//   month,
//   year,
//   hour,
//   minute,
//   latitude,
//   longitude,
//   timezone
// ) => {
//   return {
//     day: date,
//     month: month,
//     year: year,
//     hour: hour,
//     min: minute,
//     lat: latitude,
//     lon: longitude,
//     tzone: timezone,
//   };
// };

// var packageNumeroData = (date, month, year, name) => {
//   return {
//     day: date,
//     month: month,
//     year: year,
//     name: name,
//   };
// };

// var packageMatchMakingData = (maleBirthData, femaleBirthData) => {
//   mData = {
//     m_day: maleBirthData["date"],
//     m_month: maleBirthData["month"],
//     m_year: maleBirthData["year"],
//     m_hour: maleBirthData["hour"],
//     m_min: maleBirthData["minute"],
//     m_lat: maleBirthData["latitude"],
//     m_lon: maleBirthData["longitude"],
//     m_tzone: maleBirthData["timezone"],
//   };
//   fData = {
//     f_day: femaleBirthData["date"],
//     f_month: femaleBirthData["month"],
//     f_year: femaleBirthData["year"],
//     f_hour: femaleBirthData["hour"],
//     f_min: femaleBirthData["minute"],
//     f_lat: femaleBirthData["latitude"],
//     f_lon: femaleBirthData["longitude"],
//     f_tzone: femaleBirthData["timezone"],
//   };

//   return Object.assign(mData, fData);
// };

// var api = {
//   call: (
//     resource,
//     date,
//     month,
//     year,
//     hour,
//     minute,
//     latitude,
//     longitude,
//     timezone,
//     callback
//   ) => {
//     var data = packageHoroData(
//       date,
//       month,
//       year,
//       hour,
//       minute,
//       latitude,
//       longitude,
//       timezone
//     );
//     return getResponse(resource, data, callback);
//   },

//   numeroCall: (resource, date, month, year, name, callback) => {
//     var data = packageNumeroData(date, month, year, name);
//     return getResponse(resource, data, callback);
//   },

//   matchMakingCall: (resource, maleBirthData, femaleBirthData, callback) => {
//     var data = packageMatchMakingData(maleBirthData, femaleBirthData);
//     return getResponse(resource, data, callback);
//   },
// };
// document.getElementById("formSubmit").addEventListener("click", function () {
//   let dd = document.querySelector("#dd").value;
//   let mm = document.querySelector("#mm").value;
//   let yyyy = document.querySelector("#yyyy").value;

//   console.log(dd);
//   console.log(mm);
//   console.log(yyyy);
// });

// module.exports = api;
