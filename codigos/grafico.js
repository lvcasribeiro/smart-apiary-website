import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getDatabase, ref, child, onValue, get, query, limitToFirst, limitToLast, orderByChild, startAt, startAfter, endAt, endBefore, equalTo } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js"

const app = initializeApp(firebaseConfig);
const db = getDatabase();

// Initialize Firebase
const analytics = getAnalytics(app);

// var tbody = document.getElementById('tbody1');
var id = 0;

// document.getElementById('delete').onclick = function () {
//     firebase.database().ref('json_storage').remove();
// }

// document.getElementById('pesquisar').onclick = function () {
//     SearchData();
// }

// document.getElementById('normal').onclick = function () {
//     GetAllData();
// }


// function AddItemToTable(date, time, temperature, humidity, heat_index, luminosity, sound, load) {
//     let trow = document.createElement('tr');
//     let td1 = document.createElement('td');
//     let td2 = document.createElement('td');
//     let td3 = document.createElement('td');
//     let td4 = document.createElement('td');
//     let td5 = document.createElement('td');
//     let td6 = document.createElement('td');
//     let td7 = document.createElement('td');
//     let td8 = document.createElement('td');
//     let td9 = document.createElement('td');

//     td1.innerHTML = ++id;
//     td2.innerHTML = date;
//     td3.innerHTML = time;
//     td4.innerHTML = temperature;
//     td5.innerHTML = humidity;
//     td6.innerHTML = heat_index;
//     td7.innerHTML = luminosity;
//     td8.innerHTML = sound;
//     td9.innerHTML = load;

//     trow.appendChild(td1);
//     trow.appendChild(td2);
//     trow.appendChild(td3);
//     trow.appendChild(td4);
//     trow.appendChild(td5);
//     trow.appendChild(td6);
//     trow.appendChild(td7);
//     trow.appendChild(td8);
//     trow.appendChild(td9);

//     tbody.appendChild(trow);
// }

// function AddAllItems(json_storage) {
//     id = 0;
//     tbody.innerHTML = '';
//     json_storage.forEach(element => {
//         AddItemToTable(element.date, element.timestamp, element.temperature, element.humidity, element.heat_index, element.luminosity, element.sound_intensity, element.load)
//     });
// }

// function GetAllData() {
//     const dbRef = ref(db, "json_storage");

//     onValue(dbRef, (snapshot) => {
//         var dados = [];

//         snapshot.forEach(childSnapshot => {
//             dados.push(childSnapshot.val());
//         });

//         AddAllItems(dados);
//     })
// }

// function SearchData() {
//     var pesquisas = document.getElementById("pesquisar_in").value;
//     var selecionado = document.getElementById("select").value;

//     if (selecionado === "temperature" || selecionado === "humidity" || selecionado === "heat_index" || selecionado === "luminosity" || selecionado === "sound" || selecionado === "load") {
//         pesquisas = parseFloat(pesquisas);
//     }

//     const que = query(ref(db, "json_storage"), orderByChild(selecionado), equalTo(pesquisas));

//     get(que)
//         .then((snapshot) => {
//             var dados = [];

//             snapshot.forEach(childSnapshot => {
//                 dados.push(childSnapshot.val());
//             });

//             AddAllItems(dados);
//         })

//     document.getElementById("pesquisar_in").value = '';
// }

// Initialize Firebase
function PrintData() {
    const dbRef = ref(db, "json_storage");

    onValue(dbRef, (snapshot) => {
        var dados = [];
        var time = [];
        var temperatures = [];
        var humidity = [];
        var heat_index = [];
        var luminosity = [];
        var sound_intensity = [];
        var load = [];

        snapshot.forEach(childSnapshot => {
            dados.push(childSnapshot.val());
        });

        for (let aux = 0; aux < dados.length; aux++) {
            time.push(dados[aux].timestamp);
            temperatures.push(dados[aux].temperature);
            humidity.push(dados[aux].humidity);
            heat_index.push(dados[aux].heat_index);
            luminosity.push(dados[aux].luminosity);
            sound_intensity.push(dados[aux].sound_intensity);
            load.push(dados[aux].load);
        }

        console.log(dados);

        var time = time.slice(-250);
        var temperatures = temperatures.slice(-250);
        var humidity = humidity.slice(-250);
        var heat_index = heat_index.slice(-250);
        var luminosity = luminosity.slice(-250);
        var sound_intensity = sound_intensity.slice(-250);
        var load = load.slice(-250);

        Highcharts.getJSON(
            'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json',
            function (data) {

                Highcharts.setOptions({
                    lang: {
                        resetZoom: 'Remover Zoom'
                    }
                });

                // Humidity:
                Highcharts.chart('container_humidity', {
                    navigation: {
                        buttonOptions: {
                            enabled: false
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    chart: {
                        zoomType: 'x',
                        backgroundColor: null
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        gridLineWidth: 1,
                        tickInterval: 50,
                        title: {
                            text: ''
                        },
                        categories: time
                    },
                    yAxis: {
                        gridLineWidth: 1,
                        title: {
                            text: ''
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        area: {
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, Highcharts.color(Highcharts.getOptions().colors[1]).setOpacity(0.050).get('rgba')],
                                    [1, Highcharts.color(Highcharts.getOptions().colors[1]).setOpacity(0.001).get('rgba')]
                                ]
                            },
                            marker: {
                                radius: 2
                            },
                            lineWidth: 1,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        }
                    },

                    series: [{
                        type: 'area',
                        color: '#4d65a4',
                        name: 'Umidade do ar',
                        data: humidity
                    }]
                });

                // Temperature:
                Highcharts.chart('container_temperature', {
                    navigation: {
                        buttonOptions: {
                            enabled: false
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    chart: {
                        zoomType: 'x',
                        backgroundColor: null
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        gridLineWidth: 1,
                        tickInterval: 50,
                        title: {
                            text: ''
                        },
                        categories: time
                    },
                    yAxis: {
                        gridLineWidth: 1,
                        title: {
                            text: ''
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        area: {
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, Highcharts.color(Highcharts.getOptions().colors[4]).setOpacity(0.050).get('rgba')],
                                    [1, Highcharts.color(Highcharts.getOptions().colors[4]).setOpacity(0.001).get('rgba')]
                                ]
                            },
                            marker: {
                                radius: 2
                            },
                            lineWidth: 1,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        }
                    },

                    series: [{
                        type: 'area',
                        color: '#50af33',
                        name: 'Temperatura ambiente',
                        data: temperatures
                    }]
                });

                // container_heat_index
                Highcharts.chart('container_heat_index', {
                    navigation: {
                        buttonOptions: {
                            enabled: false
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    chart: {
                        zoomType: 'x',
                        backgroundColor: null
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        gridLineWidth: 1,
                        tickInterval: 50,
                        title: {
                            text: ''
                        },
                        categories: time
                    },
                    yAxis: {
                        gridLineWidth: 1,
                        title: {
                            text: ''
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        area: {
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, Highcharts.color(Highcharts.getOptions().colors[3]).setOpacity(0.050).get('rgba')],
                                    [1, Highcharts.color(Highcharts.getOptions().colors[3]).setOpacity(0.001).get('rgba')]
                                ]
                            },
                            marker: {
                                radius: 2
                            },
                            lineWidth: 1,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        }
                    },

                    series: [{
                        type: 'area',
                        color: '#fb5607',
                        name: 'Sensação térmica',
                        data: heat_index
                    }]
                });

                // container_luminosity
                Highcharts.chart('container_luminosity', {
                    navigation: {
                        buttonOptions: {
                            enabled: false
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    chart: {
                        zoomType: 'x',
                        backgroundColor: null
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        gridLineWidth: 1,
                        tickInterval: 50,
                        title: {
                            text: ''
                        },
                        categories: time
                    },
                    yAxis: {
                        gridLineWidth: 1,
                        title: {
                            text: ''
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        area: {
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, Highcharts.color(Highcharts.getOptions().colors[5]).setOpacity(0.050).get('rgba')],
                                    [1, Highcharts.color(Highcharts.getOptions().colors[5]).setOpacity(0.001).get('rgba')]
                                ]
                            },
                            marker: {
                                radius: 2
                            },
                            lineWidth: 1,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        }
                    },

                    series: [{
                        type: 'area',
                        color: '#ff006e',
                        name: 'Luminosidade',
                        data: luminosity
                    }]
                });

                // container_sound
                Highcharts.chart('container_sound', {
                    navigation: {
                        buttonOptions: {
                            enabled: false
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    chart: {
                        zoomType: 'x',
                        backgroundColor: null
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        gridLineWidth: 1,
                        tickInterval: 50,
                        title: {
                            text: ''
                        },
                        categories: time
                    },
                    yAxis: {
                        gridLineWidth: 1,
                        title: {
                            text: ''
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        area: {
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, Highcharts.color(Highcharts.getOptions().colors[1]).setOpacity(0.050).get('rgba')],
                                    [1, Highcharts.color(Highcharts.getOptions().colors[1]).setOpacity(0.001).get('rgba')]
                                ]
                            },
                            marker: {
                                radius: 2
                            },
                            lineWidth: 1,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        }
                    },

                    series: [{
                        type: 'area',
                        color: '#8338ec',
                        name: 'Intensidade do som',
                        data: sound_intensity
                    }]
                });

                // container_load
                Highcharts.chart('container_load', {
                    navigation: {
                        buttonOptions: {
                            enabled: false
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    chart: {
                        zoomType: 'x',
                        backgroundColor: null
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        gridLineWidth: 1,
                        tickInterval: 50,
                        title: {
                            text: ''
                        },
                        categories: time
                    },
                    yAxis: {
                        gridLineWidth: 1,
                        title: {
                            text: ''
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        area: {
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, Highcharts.color(Highcharts.getOptions().colors[1]).setOpacity(0.050).get('rgba')],
                                    [1, Highcharts.color(Highcharts.getOptions().colors[1]).setOpacity(0.001).get('rgba')]
                                ]
                            },
                            marker: {
                                radius: 2
                            },
                            lineWidth: 1,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        }
                    },

                    series: [{
                        type: 'area',
                        color: '#3a86ff',
                        name: 'Carga',
                        data: load
                    }]
                });
            }
        );
    })
}

// window.onload = GetAllData();
window.onload = PrintData();
