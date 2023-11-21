const firebaseConfig = {
    apiKey: "AIzaSyAW9ZLQhBTjqRVtM-m-oyHLqBTTNqZAOMk",
    authDomain: "smart-apiary.firebaseapp.com",
    databaseURL: "https://smart-apiary-default-rtdb.firebaseio.com",
    projectId: "smart-apiary",
    storageBucket: "smart-apiary.appspot.com",
    messagingSenderId: "1041866925745",
    appId: "1:1041866925745:web:e19f5dd3c626bf6ce76490"
};

// Inicialização do Firebase:
firebase.initializeApp(firebaseConfig);

$(document).ready(function () {
    var database = firebase.database();

    database.ref().on("value", function (snap) {
        var temperature = snap.val().measured_variables.temperature;
        var humidity = snap.val().measured_variables.humidity;
        var heat_index = snap.val().measured_variables.heat_index;
        var luminosity = snap.val().measured_variables.luminosity;
        var sound_intensity = snap.val().measured_variables.sound_intensity;
        var load = snap.val().measured_variables.load;

        document.getElementById("temperatura-realtime").innerHTML = temperature;
        document.getElementById("umidade-do-ar-realtime").innerHTML = humidity;
        document.getElementById("sensacao-termica-realtime").innerHTML = heat_index;
        document.getElementById("luminosidade-realtime").innerHTML = luminosity;
        document.getElementById("som-realtime").innerHTML = sound_intensity;
        document.getElementById("peso-realtime").innerHTML = load;

        if (is_following_VPD === 1) {
            document.getElementById("vpd-realtime").innerHTML = "Sim";
        } else {
            document.getElementById("vpd-realtime").innerHTML = "Não";
        }

        if (is_reservoir_empty === 1) {
            document.getElementById("humidifier-realtime").innerHTML = "Sim";
        } else {
            document.getElementById("humidifier-realtime").innerHTML = "Não";
        }
    })
});
