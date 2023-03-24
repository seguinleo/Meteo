import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, Tooltip } from "recharts";
import { RxMagnifyingGlass } from 'react-icons/rx';
import Image from "next/image"
import "./assets/css/style.css";

export default function App({ Component, pageProps }) {
  const [showComponents, setShowComponents] = useState(false);
  const [metaTheme, setMetaTheme] = useState('#1c95ec');
  const [mainImg, setMainImg] = useState(null);
  const [ville, setVille] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [pays, setPays] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [ressenti, setRessenti] = useState(null);
  const [humidite, setHumidite] = useState(null);
  const [vent, setVent] = useState(null);
  const [pression, setPression] = useState(null);
  const [dataChart, setDataChart] = useState(null);
  const [heure, setHeure] = useState(null);
  const [jour2, setJour2] = useState(null);
  const [jour3, setJour3] = useState(null);
  const [jour4, setJour4] = useState(null);
  const [jour5, setJour5] = useState(null);
  const [jour6, setJour6] = useState(null);
  const [temp2, setTemp2] = useState(null);
  const [temp3, setTemp3] = useState(null);
  const [temp4, setTemp4] = useState(null);
  const [temp5, setTemp5] = useState(null);
  const [temp6, setTemp6] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);
  const [img4, setImg4] = useState(null);
  const [img5, setImg5] = useState(null);
  const [img6, setImg6] = useState(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js')
      });
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        }
      );
    }
  }, []);

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeColor);
    }
  }, [metaTheme]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    document.querySelector('.info-txt').style.display = 'block';
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ville
      })
    });
    const data = await response.json();
    if (response.ok) {
      const { currentData, forecastData } = data;
      fetchDataCurrent(currentData, forecastData);
      setShowComponents(true);
    } else {
      const { error } = data;
      alert(error);
    }
    document.querySelector('.info-txt').style.display = 'none';
  };

  const geolocation = async (event) => {
    event.preventDefault();
    document.querySelector('.info-txt').style.display = 'block';
    const response = await fetch('/api/geolocation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        latitude, longitude
      })
    });
    const data = await response.json();
    if (response.ok) {
      const { currentData, forecastData } = data;
      fetchDataCurrent(currentData, forecastData);
      setShowComponents(true);
    } else {
      const { error } = data;
      alert(error);
    }
    document.querySelector('.info-txt').style.display = 'none';
  };

  const fetchDataCurrent = async (data, data2) => {
    const date = new Date();
    const offset = parseInt(data.timezone) / 60;
    const { name, sys, main, wind, weather } = data;
    const heureLocale = new Date(date.getTime() + (offset + date.getTimezoneOffset()) * 6e4).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    setHeure(heureLocale);
    setVille(name);
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
      setMetaTheme("#1c95ec");
    } else if (200 <= weatherId && weatherId <= 232) {
      mainImgSrc = "./assets/icons/thunder.svg";
      backgroundColor = "#2c3c47";
      setMetaTheme("#2c3c47");
    } else if (600 <= weatherId && weatherId <= 622) {
      mainImgSrc = "./assets/icons/snow.svg";
      backgroundColor = "#83939e";
      setMetaTheme("#83939e");
    } else if (701 <= weatherId && weatherId <= 781) {
      mainImgSrc = heureLocale.startsWith("1") || heureLocale.startsWith("06") || heureLocale.startsWith("07") || heureLocale.startsWith("08") || heureLocale.startsWith("09") ? "./assets/icons/haze.svg" : "./assets/icons/hazenight.svg";
      backgroundColor = "#63baf7";
      setMetaTheme("#63baf7");
    } else if (weatherId === 801) {
      mainImgSrc = heureLocale.startsWith("1") || heureLocale.startsWith("06") || heureLocale.startsWith("07") || heureLocale.startsWith("08") || heureLocale.startsWith("09") ? "./assets/icons/fewclouds.svg" : "./assets/icons/fewcloudsnight.svg";
      backgroundColor = "#41adfa";
      setMetaTheme("#41adfa");
    } else if (802 <= weatherId && weatherId <= 804) {
      mainImgSrc = "./assets/icons/clouds.svg";
      backgroundColor = "#3e85b8";
      setMetaTheme("#3e85b8");
    } else if (501 <= weatherId && weatherId <= 531) {
      mainImgSrc = "./assets/icons/shower.svg";
      backgroundColor = "#2f5069";
      setMetaTheme("#2f5069");
    } else {
      mainImgSrc = "./assets/icons/rain.svg";
      backgroundColor = "#386e94";
      setMetaTheme("#386e94");
    }
    setMainImg(<Image src={mainImgSrc} className="mainImg" alt={weather[0].description} width={125} height={125} />);
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
    const listeDonnees = data.list.slice(0, 8).map((item) => {
      return {
        name: item.dt_txt.substring(11).slice(0, -3),
        temp: item.main.temp,
        weather: item.weather[0]
      };
    });
    setDataChart(listeDonnees);
  };

  const handleReturn = () => {
    setShowComponents(false);
    document.body.style.background = "#1c95ec";
    setMetaTheme("#1c95ec");
  };

  function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
      const weather = payload[0].payload.weather;
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} - ${payload[0].value.toFixed(1)}°C`}</p>
          {getImage(weather.id)}
        </div>
      );
    }
    return null;
  }

  function getImage(number) {
    if (number === 800) {
      return <Image src="./assets/icons/sun.svg" alt="Temps dégagé" width={60} height={60} />;
    } else if (200 <= number && number <= 232) {
      return <Image src="./assets/icons/thunder.svg" alt="Temps orageux" width={60} height={60} />;
    } else if (600 <= number && number <= 622) {
      return <Image src="./assets/icons/snow.svg" alt="Tmps neigeux" width={60} height={60} />;
    } else if (701 <= number && number <= 781) {
      return <Image src="./assets/icons/sun.svg" alt="Temps brumeux" width={60} height={60} />;
    } else if (number === 801) {
      return <Image src="./assets/icons/fewclouds.svg" alt="Temps partiellement nuageux" width={60} height={60} />;
    } else if (802 <= number && number <= 804) {
      return <Image src="./assets/icons/clouds.svg" alt="Temps nuageux" width={60} height={60} />;
    } else if (501 <= number && number <= 531) {
      return <Image src="./assets/icons/shower.svg" alt="Temps très pluvieux" width={60} height={60} />;
    } else {
      return <Image src="./assets/icons/rain.svg" alt="Temps pluvieux" width={60} height={60} />;
    }
  }

  return (
    <main className="wrapper">
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
      <section>
      {!showComponents && (
        <form onSubmit={handleSubmit}>
          <div className="input-part">
            <p className="info-txt">Chargement...</p>
            <input
              type="text"
              placeholder="Saisissez le nom d'une ville"
              maxLength="40"
              aria-label="Rechercher"
              value={ville}
              onChange={(event) => setVille(event.target.value)}
              required
            />
            <button type="submit">
              Rechercher
            </button>
            <div className="separator"></div>
            <button type="button" onClick={geolocation}>
              Localisation actuelle
            </button>
          </div>
        </form>
      )}
      </section>
      {showComponents && (
        <section>
          <div className="current-part">
            <div className="main-info">
              <div className="temp">
                {mainImg}
                <span>{temperature}</span>
              </div>
            </div>
            <div className="location">
              <span>{ville}, {pays}</span>
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
              <p className="titreGraph">Prochaines 24 heures</p>
              <LineChart width={320} height={150} data={dataChart}>
                <XAxis axisLine={false} tick={false} dataKey="name" />
                <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: "none" }} />
                <Line
                  dataKey="temp"
                  stroke="rgba(255,255,255,.7)"
                  strokeWidth="2"
                  dot={{ r: 4 }}
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
        </section>
      )}
      <Component {...pageProps} />
    </main>
  );
}
