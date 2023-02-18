import React, { useState } from "react";
import { LineChart, Line, XAxis, Tooltip } from "recharts";
import { RxMagnifyingGlass } from 'react-icons/rx';
import "./assets/css/style.css";

function App() {
  const [showComponents, setShowComponents] = useState(false);
  const [mainImg, setMainImg] = useState();
  const [ville, setVille] = useState('');
  const [nomVille, setNomVille] = useState();
  const [pays, setPays] = useState();
  const [temperature, setTemperature] = useState();
  const [ressenti, setRessenti] = useState();
  const [humidite, setHumidite] = useState();
  const [vent, setVent] = useState();
  const [pression, setPression] = useState();
  const [heure, setHeure] = useState();
  const [dataChart, setDataChart] = useState();
  const [jour2, setJour2] = useState();
  const [jour3, setJour3] = useState();
  const [jour4, setJour4] = useState();
  const [jour5, setJour5] = useState();
  const [jour6, setJour6] = useState();
  const [temp2, setTemp2] = useState();
  const [temp3, setTemp3] = useState();
  const [temp4, setTemp4] = useState();
  const [temp5, setTemp5] = useState();
  const [temp6, setTemp6] = useState();
  const [img2, setImg2] = useState();
  const [img3, setImg3] = useState();
  const [img4, setImg4] = useState();
  const [img5, setImg5] = useState();
  const [img6, setImg6] = useState();
  const metaTheme = document.getElementById("themecolor");
  const infoTxt = document.querySelector('.info-txt');

  const handleKeyUp = async (event) => {
    if (event.key === 'Enter') {
      if (!ville || !/^[a-zA-ZÀ-ÿ -]+$/.test(ville)) {
        alert('Veuillez entrer une ville valide...');
        return;
      }
      infoTxt.style.display = 'block';
      const key = process.env.REACT_APP_API_KEY;
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&appid=${key}`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${ville}&units=metric&appid=${key}`)
      ]);
      if (!currentResponse.ok || !forecastResponse.ok) {
        alert("Ville non reconnue, vérifiez l'orthographe et le nom complet de la ville...");
        infoTxt.style.display = 'none';
        return;
      }
      const [currentData, forecastData] = await Promise.all([
        currentResponse.json(),
        forecastResponse.json()
      ]);
      fetchDataCurrent(currentData, forecastData);
      setShowComponents(true);
    }
  };

  const geolocation = async () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par ce navigateur. Firefox, Chrome ou Safari recommandés...");
      return;
    }
    navigator.geolocation.getCurrentPosition(async position => {
      infoTxt.style.display = 'block';
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const key = process.env.REACT_APP_API_KEY;
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
      ]);
      if (!currentResponse.ok || !forecastResponse.ok) {
        alert("Erreur lors de la récupération des données météo. Veuillez réessayer plus tard...");
        infoTxt.style.display = 'none';
        return;
      }
      const [currentData, forecastData] = await Promise.all([
        currentResponse.json(),
        forecastResponse.json()
      ]);
      fetchDataCurrent(currentData, forecastData);
      setShowComponents(true);
    }, error => {
      alert("Veuillez activer la géolocalisation de votre appareil pour ce site...");
    });
  };

  const fetchDataCurrent = async (data, data2) => {
    const date = new Date();
    const offset = parseInt(data.timezone) / 60;
    const { name, sys, main, wind, weather } = data;
    const heureLocale = new Date(date.getTime() + (offset + date.getTimezoneOffset()) * 6e4).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    infoTxt.style.display = 'none';
    setHeure(heureLocale);
    setNomVille(name);
    setPays(sys.country);
    setTemperature(main.temp.toFixed(1) + "°C");
    setRessenti(main.feels_like.toFixed(1) + "°C");
    setHumidite(main.humidity + "%");
    setVent(Math.round(3.6 * wind.speed) + "km/h");
    setPression(main.pressure + "hPa");
    const weatherId = weather[0].id;
    let mainImgSrc, backgroundColor;
    if (weatherId === 800) {
      mainImgSrc = heureLocale.startsWith("1") || heureLocale.startsWith("06") || heureLocale.startsWith("07") || heureLocale.startsWith("08") || heureLocale.startsWith("09") ? "./assets/icons/sun.svg" : "./assets/icons/sunnight.svg";
      backgroundColor = "#1c95ec";
      metaTheme.setAttribute("content", "#1c95ec");
    } else if (200 <= weatherId && weatherId <= 232) {
      mainImgSrc = "./assets/icons/thunder.svg";
      backgroundColor = "#2c3c47";
      metaTheme.setAttribute("content", "#2c3c47");
    } else if (600 <= weatherId && weatherId <= 622) {
      mainImgSrc = "./assets/icons/snow.svg";
      backgroundColor = "#83939e";
      metaTheme.setAttribute("content", "#83939e");
    } else if (701 <= weatherId && weatherId <= 781) {
      mainImgSrc = heureLocale.startsWith("1") || heureLocale.startsWith("06") || heureLocale.startsWith("07") || heureLocale.startsWith("08") || heureLocale.startsWith("09") ? "./assets/icons/haze.svg" : "./assets/icons/hazenight.svg";
      backgroundColor = "#63baf7";
      metaTheme.setAttribute("content", "#63baf7");
    } else if (weatherId === 801) {
      mainImgSrc = heureLocale.startsWith("1") || heureLocale.startsWith("06") || heureLocale.startsWith("07") || heureLocale.startsWith("08") || heureLocale.startsWith("09") ? "./assets/icons/fewclouds.svg" : "./assets/icons/fewcloudsnight.svg";
      backgroundColor = "#41adfa";
      metaTheme.setAttribute("content", "#41adfa");
    } else if (802 <= weatherId && weatherId <= 804) {
      mainImgSrc = "./assets/icons/clouds.svg";
      backgroundColor = "#3e85b8";
      metaTheme.setAttribute("content", "#3e85b8");
    } else if (501 <= weatherId && weatherId <= 531) {
      mainImgSrc = "./assets/icons/shower.svg";
      backgroundColor = "#2f5069";
      metaTheme.setAttribute("content", "#2f5069");
    } else {
      mainImgSrc = "./assets/icons/rain.svg";
      backgroundColor = "#386e94";
      metaTheme.setAttribute("content", "#386e94");
    }
    setMainImg(<img src={mainImgSrc} className="mainImg" alt={weather[0].description} />);
    document.body.style.background = backgroundColor;
    fetchDataForecasts(data2);
  };

  const fetchDataForecasts = async (data) => {
    const t = [];
    const s = [];
    for (let i = 0; i < data.list.length; i++) {
      const n = data.list[i].dt_txt.substring(11);
      const r = data.list[i].main.temp;
      const o = data.list[i].weather[0].id;
      if (n.indexOf("12:00:00") !== -1) {
        t.push(o);
        s.push(r);
      }
    }
    const j2 = data.list[7].dt_txt;
    const j3 = data.list[15].dt_txt;
    const j4 = data.list[23].dt_txt;
    const j5 = data.list[31].dt_txt;
    const j6 = data.list[39].dt_txt;
    setImg2(getImage(t[0]));
    setImg3(getImage(t[1]));
    setImg4(getImage(t[2]));
    setImg5(getImage(t[3]));
    setImg6(getImage(t[4]));
    setTemp2(Math.floor(s[0]));
    setTemp3(Math.floor(s[1]));
    setTemp4(Math.floor(s[2]));
    setTemp5(Math.floor(s[3]));
    setTemp6(Math.floor(s[4]));
    const E = ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"];
    const day2 = new Date(j2.slice(0, -9));
    const day3 = new Date(j3.slice(0, -9));
    const day4 = new Date(j4.slice(0, -9));
    const day5 = new Date(j5.slice(0, -9));
    const day6 = new Date(j6.slice(0, -9));
    setJour2(E[day2.getDay()]);
    setJour3(E[day3.getDay()]);
    setJour4(E[day4.getDay()]);
    setJour5(E[day5.getDay()]);
    setJour6(E[day6.getDay()]);
    const listeDonnees = [{
      name: data.list[0].dt_txt.substring(11).slice(0, -3),
      temp: data.list[0].main.temp
    }, {
      name: data.list[1].dt_txt.substring(11).slice(0, -3),
      temp: data.list[1].main.temp
    }, {
      name: data.list[2].dt_txt.substring(11).slice(0, -3),
      temp: data.list[2].main.temp
    }, {
      name: data.list[3].dt_txt.substring(11).slice(0, -3),
      temp: data.list[3].main.temp
    }, {
      name: data.list[4].dt_txt.substring(11).slice(0, -3),
      temp: data.list[4].main.temp
    }, {
      name: data.list[5].dt_txt.substring(11).slice(0, -3),
      temp: data.list[5].main.temp
    }, {
      name: data.list[6].dt_txt.substring(11).slice(0, -3),
      temp: data.list[6].main.temp
    }, {
      name: data.list[7].dt_txt.substring(11).slice(0, -3),
      temp: data.list[7].main.temp
    }];
    setDataChart(listeDonnees);
  };

  const handleReturn = () => {
    setShowComponents(false);
    document.body.style.background = "#1c95ec";
    metaTheme.content = "#1c95ec";
  };

  function getImage(number) {
    if (number === 800) {
      return <img src="./assets/icons/sun.svg" alt="Temps dégagé" />;
    } else if (200 <= number && number <= 232) {
      return <img src="./assets/icons/thunder.svg" alt="Temps orageux" />;
    } else if (600 <= number && number <= 622) {
      return <img src="./assets/icons/snow.svg" alt="Tmps neigeux" />;
    } else if (701 <= number && number <= 781) {
      return <img src="./assets/icons/sun.svg" alt="Temps brumeux" />;
    } else if (number === 801) {
      return <img src="./assets/icons/fewclouds.svg" alt="Temps partiellement nuageux" />;
    } else if (802 <= number && number <= 804) {
      return <img src="./assets/icons/clouds.svg" alt="Temps nuageux" />;
    } else if (501 <= number && number <= 531) {
      return <img src="./assets/icons/shower.svg" alt="Temps très pluvieux" />;
    } else {
      return <img src="./assets/icons/rain.svg" alt="Temps pluvieux" />;
    }
  }

  return (
    <div className="wrapper">
      <header>
        {showComponents ? (
          <>
            <span id="heure">{heure}</span>
            <span id="retour" aria-label="Retour" onClick={handleReturn}><RxMagnifyingGlass color="white" size="25px" /></span>
          </>
        ) : (
          <span>Météo</span>
        )}
      </header>
      {!showComponents && (
        <div className="input-part">
          <p className="info-txt">Chargement...</p>
          <input
            type="text"
            placeholder="Saisissez le nom d'une ville"
            maxLength="40"
            aria-label="Rechercher"
            onKeyUp={(event) => handleKeyUp(event)}
            onChange={(event) => setVille(event.target.value)}
            required
          />
          <div className="separator"></div>
          <button onClick={geolocation}>Localisation actuelle</button>
        </div>
      )}
      {showComponents && (
        <>
          <div className="current-part">
            <div className="main-info">
              <div className="temp">
                {mainImg}
                <span>{temperature}</span>
              </div>
            </div>
            <div className="location">
              <span>{nomVille}, {pays}</span>
            </div>
            <div className="bottom-details">
              <div className="column feels">
                <div className="details">
                  <span>{ressenti}</span>
                  <p>Ressenti</p>
                </div>
              </div>
              <div className="column humidity">
                <div className="details">
                  <span>{humidite}</span>
                  <p>Humidité</p>
                </div>
              </div>
              <div className="column wind">
                <div className="details">
                  <span>{vent}</span>
                  <p>Vent</p>
                </div>
              </div>
              <div className="column pressure">
                <div className="details">
                  <span>{pression}</span>
                  <p>Pression</p>
                </div>
              </div>
            </div>
          </div>
          <div className="chart-part">
            <div className="graphique">
              <p className="titreGraph">Températures prochaines 24 heures</p>
              <LineChart width={320} height={150} data={dataChart}>
                <XAxis axisLine={false} tick={false} dataKey="name" />
                <Tooltip
                  contentStyle={{ backgroundColor: "rgba(255,255,255,.1)", borderColor: "rgba(255,255,255,.1)" }}
                  wrapperStyle={{ outline: "none" }}
                  formatter={(value) => value + "°C"}
                />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="rgba(255,255,255,.7)"
                  strokeWidth="2"
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </div>
          </div>
          <div className="forecasts-part">
            <div className="bottom-details">
              <div className="column">
                <div className="details">
                  <p>{jour2}</p>
                  {img2}
                  <div className="temp">
                    <span>{temp2}</span>
                    °C
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="details">
                  <p>{jour3}</p>
                  {img3}
                  <div className="temp">
                    <span>{temp3}</span>
                    °C
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="details">
                  <p>{jour4}</p>
                  {img4}
                  <div className="temp">
                    <span>{temp4}</span>
                    °C
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="details">
                  <p>{jour5}</p>
                  {img5}
                  <div className="temp">
                    <span>{temp5}</span>
                    °C
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="details">
                  <p>{jour6}</p>
                  {img6}
                  <div className="temp">
                    <span>{temp6}</span>
                    °C
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <span className="copyright">&copy;2020-{new Date().getFullYear()}
        <a href="https://leoseguin.fr/" target="_blank" rel="noreferrer">Léo SEGUIN</a>
      </span>
    </div>
  );
}

export default App;