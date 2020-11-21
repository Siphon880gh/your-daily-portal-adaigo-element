// Global variables
var starSign = "";
var results = document.getElementById("results")
var birthdayForm = document.getElementById("birthday-form");
var birthdayInput = document.getElementById("birthday");
var inputValue;

// helper functions
function saveUserInput() {
  let month = Number(birthdayInput.value.slice(5, 7));
  let day = Number(birthdayInput.value.slice(8, 10));
  inputValue = { mm: month, dd: day };
  
}

function addContentDom(signData, signName) {
    results.innerHTML = `
    <h2>${signName}</h2>
    <p>Daily Horoscope: ${signData.description}<p>
    `

}
// based on the date determine what sign
function userDeterminedSign(date) {
  
  const {mm} = date
  const {dd} = date

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

}

birthdayForm.addEventListener("click", function () {
  saveUserInput();
  starSign = userDeterminedSign(inputValue)

  astrologyAPIFree(starSign)
  
});

async function astrologyAPIFree(sign) {
  var myHeaders = new Headers();

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    "https://aztro.sameerkumar.website/?day=today&sign=" + sign,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
        console.log(result)
        addContentDom(result, starSign)
    })

    .catch((error) => console.log("error", error));
}

