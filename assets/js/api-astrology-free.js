/**
 * @function astrologyAPIFree Calls free Astrology API. Gets daily horoscope based on your zodiac sign.  
 * How to call: let astrologyResponse = await astrologyAPIFree(sign);
 * API Guide: https://www.astrologyapi.com/docs/api-ref/75/sun_sign_prediction/daily/:zodiacName
 *
 */
async function astrologyAPIFree(sign) {

    let myHeaders = new Headers();

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch("https://aztro.sameerkumar.website/?day=today&sign=" + sign, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('error', error));
}