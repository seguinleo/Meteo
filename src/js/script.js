"serviceWorker" in navigator && navigator.serviceWorker.register("sw.js");
const key = "4f2aefee83b0c51e519d5251885f124f"
  , wrapper = document.querySelector(".wrapper")
  , inputPart = document.querySelector(".input-part")
  , infoTxt = document.querySelector(".info-txt")
  , inputField = document.querySelector("input")
  , locationBtn = document.querySelector("#geolocalisation")
  , weatherPart = document.querySelector(".weather-part")
  , metaTheme = document.getElementById("themecolor")
  , img = document.getElementById("img")
  , img2 = document.getElementById("img2")
  , img3 = document.getElementById("img3")
  , img4 = document.getElementById("img4")
  , img5 = document.getElementById("img5")
  , img6 = document.getElementById("img6")
  , back = document.getElementById("retour");
function requestApi(e) {
    apiCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${e}&units=metric&appid=${key}`,
    apiForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${e}&units=metric&appid=${key}`,
    fetchData()
}
function onSuccess(e) {
    let {latitude: t, longitude: s} = e.coords;
    apiCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${s}&units=metric&appid=${key}`,
    apiForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${t}&lon=${s}&units=metric&appid=${key}`,
    fetchData()
}
function onError() {
    infoTxt.style.display = "none";
    alert("La localisation de l'appareil n'est pas activée...")
}
function fetchData() {
    fetch(apiCurrent).then(e=>e.json()).then(e=>weatherDetailsCurrent(e)).catch(()=>{
        infoTxt.style.display = "none";
        alert("Ville non reconnue, vérifiez l'orthographe et écrivez le nom complet de la ville...")
    }
    )
}
function weatherDetailsCurrent(e) {
    let {name: t} = e
      , {country: s} = e.sys
      , {id: i} = e.weather[0]
      , {temp: n, feels_like: r, humidity: o, pressure: c} = e.main
      , {speed: a} = e.wind
      , l = new Date;
    offset = parseInt(e.timezone) / 60,
    heure = (heureDate = new Date(l.getTime() + (offset + l.getTimezoneOffset()) * 6e4)).toLocaleTimeString("fr-FR").slice(0, -3),
    800 == i ? (heure.startsWith("1") || heure.startsWith("06") || heure.startsWith("07") || heure.startsWith("08") || heure.startsWith("09") ? img.src = "icons/sun.svg" : img.src = "icons/sunnight.svg",
    document.body.style.background = "#1c95ec",
    metaTheme.content = "#1c95ec") : i >= 200 && i <= 232 ? (img.src = "icons/thunder.svg",
    document.body.style.background = "#2c3c47",
    metaTheme.content = "#2c3c47") : i >= 600 && i <= 622 ? (img.src = "icons/snow.svg",
    document.body.style.background = "#83939e",
    metaTheme.content = "#83939e") : i >= 701 && i <= 781 ? (heure.startsWith("1") || heure.startsWith("06") || heure.startsWith("07") || heure.startsWith("08") || heure.startsWith("09") ? img.src = "icons/haze.svg" : img.src = "icons/hazenight.svg",
    document.body.style.background = "#63baf7",
    metaTheme.content = "#63baf7") : 801 == i ? (heure.startsWith("1") || heure.startsWith("06") || heure.startsWith("07") || heure.startsWith("08") || heure.startsWith("09") ? img.src = "icons/fewclouds.svg" : img.src = "icons/fewcloudsnight.svg",
    document.body.style.background = "#41adfa",
    metaTheme.content = "#41adfa") : i >= 802 && i <= 804 ? (img.src = "icons/clouds.svg",
    document.body.style.background = "#3e85b8",
    metaTheme.content = "#3e85b8") : i >= 501 && i <= 531 ? (img.src = "icons/shower.svg",
    document.body.style.background = "#2f5069",
    metaTheme.content = "#2f5069") : (i >= 300 && i <= 321 || 500 == i) && (img.src = "icons/rain.svg",
    document.body.style.background = "#386e94",
    metaTheme.content = "#386e94"),
    infoTxt.style.display = "none";
    inputField.value = "",
    wrapper.classList.add("active"),
    back.style.display = "inline",
    document.querySelector(".temp span").innerText = `${n.toFixed(1)}\xb0C`,
    document.querySelector(".location span").innerText = `${t}, ${s}`,
    document.querySelector(".feels span").innerText = `${Math.floor(r)}\xb0C`,
    document.querySelector(".humidity span").innerText = `${o}%`,
    document.querySelector(".wind span").innerText = `${Math.round(3.6 * a)}km/h`,
    document.querySelector(".pressure span").innerText = `${c}hPa`,
    document.querySelector("#heure").innerText = heure,
    fetch(apiForecast).then(e=>e.json()).then(e=>weatherDetailsForecast(e))
}
function weatherDetailsForecast(e) {
    let t = []
      , s = [];
    for (let i = 0; i < e.list.length; i++) {
        let n = e.list[i].dt_txt.substring(11)
          , r = e.list[i].main.temp
          , o = e.list[i].weather[0].id;
        n.indexOf("12:00:00") || (t.push(o),
        s.push(r))
    }
    let c = e.list[7].dt_txt
      , a = e.list[15].dt_txt
      , l = e.list[23].dt_txt
      , g = e.list[31].dt_txt
      , m = e.list[39].dt_txt;
    800 == t[0] ? img2.src = "icons/sun.svg" : t[0] >= 200 && t[0] <= 232 ? img2.src = "icons/thunder.svg" : t[0] >= 600 && t[0] <= 622 ? img2.src = "icons/snow.svg" : t[0] >= 701 && t[0] <= 781 ? img2.src = "icons/haze.svg" : 801 == t[0] ? img2.src = "icons/fewclouds.svg" : t[0] >= 802 && t[0] <= 804 ? img2.src = "icons/clouds.svg" : t[0] >= 501 && t[0] <= 531 ? img2.src = "icons/shower.svg" : (t[0] >= 300 && t[0] <= 321 || 500 == t[0]) && (img2.src = "icons/rain.svg"),
    800 == t[1] ? img3.src = "icons/sun.svg" : t[1] >= 200 && t[1] <= 232 ? img3.src = "icons/thunder.svg" : t[1] >= 600 && t[1] <= 622 ? img3.src = "icons/snow.svg" : t[1] >= 701 && t[1] <= 781 ? img3.src = "icons/haze.svg" : 801 == t[1] ? img3.src = "icons/fewclouds.svg" : t[1] >= 802 && t[1] <= 804 ? img3.src = "icons/clouds.svg" : t[1] >= 501 && t[1] <= 531 ? img3.src = "icons/shower.svg" : (t[1] >= 300 && t[1] <= 321 || 500 == t[1]) && (img3.src = "icons/rain.svg"),
    800 == t[2] ? img4.src = "icons/sun.svg" : t[2] >= 200 && t[2] <= 232 ? img4.src = "icons/thunder.svg" : t[2] >= 600 && t[2] <= 622 ? img4.src = "icons/snow.svg" : t[2] >= 701 && t[2] <= 781 ? img4.src = "icons/haze.svg" : 801 == t[2] ? img4.src = "icons/fewclouds.svg" : t[2] >= 802 && t[2] <= 804 ? img4.src = "icons/clouds.svg" : t[2] >= 501 && t[2] <= 531 ? img4.src = "icons/shower.svg" : (t[2] >= 300 && t[2] <= 321 || 500 == t[2]) && (img4.src = "icons/rain.svg"),
    800 == t[3] ? img5.src = "icons/sun.svg" : t[3] >= 200 && t[3] <= 232 ? img5.src = "icons/thunder.svg" : t[3] >= 600 && t[3] <= 622 ? img5.src = "icons/snow.svg" : t[3] >= 701 && t[3] <= 781 ? img5.src = "icons/haze.svg" : 801 == t[3] ? img5.src = "icons/fewclouds.svg" : t[3] >= 802 && t[3] <= 804 ? img5.src = "icons/clouds.svg" : t[3] >= 501 && t[3] <= 531 ? img5.src = "icons/shower.svg" : (t[3] >= 300 && t[3] <= 321 || 500 == t[3]) && (img5.src = "icons/rain.svg"),
    800 == t[4] ? img6.src = "icons/sun.svg" : t[4] >= 200 && t[4] <= 232 ? img6.src = "icons/thunder.svg" : t[4] >= 600 && t[4] <= 622 ? img6.src = "icons/snow.svg" : t[4] >= 701 && t[4] <= 781 ? img6.src = "icons/haze.svg" : 801 == t[4] ? img6.src = "icons/fewclouds.svg" : t[4] >= 802 && t[4] <= 804 ? img6.src = "icons/clouds.svg" : t[4] >= 501 && t[4] <= 531 ? img6.src = "icons/shower.svg" : (t[4] >= 300 && t[4] <= 321 || 500 == t[4]) && (img6.src = "icons/rain.svg"),
    weatherPart.querySelector(".temp .numb2").innerText = Math.floor(s[0]),
    weatherPart.querySelector(".temp .numb3").innerText = Math.floor(s[1]),
    weatherPart.querySelector(".temp .numb4").innerText = Math.floor(s[2]),
    weatherPart.querySelector(".temp .numb5").innerText = Math.floor(s[3]),
    weatherPart.querySelector(".temp .numb6").innerText = Math.floor(s[4]);
    let E = ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"]
      , d = new Date(c.slice(0, -9))
      , u = new Date(a.slice(0, -9))
      , h = new Date(l.slice(0, -9))
      , _ = new Date(g.slice(0, -9))
      , p = new Date(m.slice(0, -9))
      , y = E[d.getDay()]
      , f = E[u.getDay()]
      , v = E[h.getDay()]
      , x = E[_.getDay()]
      , w = E[p.getDay()];
    document.getElementById("jour2").innerText = y,
    document.getElementById("jour3").innerText = f,
    document.getElementById("jour4").innerText = v,
    document.getElementById("jour5").innerText = x,
    document.getElementById("jour6").innerText = w;
    let T = [e.list[0].main.temp, e.list[1].main.temp, e.list[2].main.temp, e.list[3].main.temp, e.list[4].main.temp, e.list[5].main.temp, e.list[6].main.temp, e.list[7].main.temp]
      , k = document.getElementById("chart").getContext("2d");
    new Chart(k,{
        type: "line",
        data: {
            labels: [e.list[0].dt_txt.substring(11).slice(0, -3), e.list[1].dt_txt.substring(11).slice(0, -3), e.list[2].dt_txt.substring(11).slice(0, -3), e.list[3].dt_txt.substring(11).slice(0, -3), e.list[4].dt_txt.substring(11).slice(0, -3), e.list[5].dt_txt.substring(11).slice(0, -3), e.list[6].dt_txt.substring(11).slice(0, -3), e.list[7].dt_txt.substring(11).slice(0, -3)],
            datasets: [{
                yAxisID: "A",
                label: "Température",
                data: T,
                borderColor: "#7ac8ff",
                pointRadius: 6
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            responsive: !0,
            scales: {
                x: {
                    ticks: {
                        display: !1
                    },
                    grid: {
                        display: !1
                    },
                    border: {
                        display: !1
                    }
                },
                A: {
                    type: "linear",
                    position: "left",
                    ticks: {
                        display: !1
                    },
                    grid: {
                        display: !1
                    },
                    border: {
                        display: !1
                    }
                }
            }
        }
    }),
    Chart.defaults.color = "#dddddd"
}
back.style.display = "none",
inputField.addEventListener("keydown", e=>{
    if (e.key == "Enter") {
        if (inputField.value.trim()) {
            infoTxt.style.display = "block",
            requestApi(inputField.value.trim())
        } else {
            alert("Veuillez renseigner une ville...")
        }
    }
}
),
locationBtn.addEventListener("click", ()=>{
    navigator.geolocation && navigator.geolocation.getCurrentPosition(onSuccess, onError),
    infoTxt.style.display = "block"
});