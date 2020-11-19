let dbPrefix = "dailyDashboard_";

function saveHoroscope(birthdate) {
    const mm = moment(birthdate).format("MM");
    const dd = moment(birthdate).format("DD");
    localStorage.setItem(dbPrefix + "mm", mm);
    localStorage.setItem(dbPrefix + "dd", dd);
}