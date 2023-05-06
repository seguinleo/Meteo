import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, Tooltip } from "recharts";
import { RxMagnifyingGlass } from 'react-icons/rx';
import { BsFillSunriseFill, BsFillSunsetFill } from 'react-icons/bs';
import Head from 'next/head';
import Image from "next/image";
import "./assets/css/style.css";

export default function App({ Component, pageProps }) {
  const [showComponents, setShowComponents] = useState(false);
  const [metaTheme, setMetaTheme] = useState('#1c95ec');
  const [mainImg, setMainImg] = useState(null);
  const [ville, setVille] = useState('');
  const [pays, setPays] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [rain, setRain] = useState(null);
  const [ressenti, setRessenti] = useState(null);
  const [humidite, setHumidite] = useState(null);
  const [vent, setVent] = useState(null);
  const [ventDirection, setVentDirection] = useState(0);
  const [pression, setPression] = useState(null);
  const [lever, setLever] = useState(null);
  const [coucher, setCoucher] = useState(null);
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
    const metaThemeColor = document.querySelector('#themecolor');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', metaTheme);
    }
    if (typeof window !== 'undefined') {
      const savedVille = localStorage.getItem('ville');
      setVille(savedVille || '');
    }
  }, [metaTheme]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    document.querySelector('.info-txt').style.display = 'block';
    const villeTrim = ville.trim();
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        villeTrim
      })
    });
    const data = await response.json();
    if (response.ok) {
      const { currentData, forecastData } = data;
      fetchDataCurrent(currentData, forecastData);
      setShowComponents(true);
    } else {
      alert("Un problème est survenu lors de la recherche de la ville...");
    }
    document.querySelector('.info-txt').style.display = 'none';
  };

  const geolocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        document.querySelector('.info-txt').style.display = 'block';
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
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
          alert("Un problème est survenu lors de la géolocalisation...");
        }
        document.querySelector('.info-txt').style.display = 'none';
      }, () => {
        alert("Veuillez activer la géolocalisation de votre appareil pour ce site...");
      });
    } else {
      alert("Votre navigateur ne supporte pas la géolocalisation...");
    }
  };

  const fetchDataCurrent = async (data, data2) => {
    const date = new Date();
    const offset = parseInt(data.timezone) / 60;
    const { name, sys, main, rain, wind, weather } = data;
    const heureLocale = new Date(date.getTime() + (offset + date.getTimezoneOffset()) * 6e4).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    const weatherId = weather[0].id;
    const ventDeg = wind.deg ? wind.deg : 0;
    const lever = new Date(data.sys.sunrise * 1000).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    const coucher = new Date(data.sys.sunset * 1000).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    setLever(lever);
    setCoucher(coucher);
    setHeure(heureLocale);
    setVille(name);
    localStorage.setItem('ville', name);
    setPays(sys.country);
    setTemperature(`${main.temp.toFixed(1)}°C`);
    !rain ? setRain("0mm") : setRain(`${rain['1h']}mm`);
    setRessenti(`${main.feels_like.toFixed(0)}°C`);
    setHumidite(`${main.humidity}%`);
    setVent(`${(3.6 * wind.speed).toFixed(0)}km/h`);
    setPression(`${main.pressure}hPa`);
    setVentDirection(ventDeg + 180);
    let mainImgSrc, backgroundColor;
    switch (weatherId) {
      case 800:
        mainImgSrc = heureLocale.startsWith("1") || heureLocale.startsWith("06") || heureLocale.startsWith("07") || heureLocale.startsWith("08") || heureLocale.startsWith("09") ? "/assets/icons/sun.svg" : "/assets/icons/sunnight.svg";
        backgroundColor = "#1c95ec";
        setMetaTheme("#1c95ec");
        break;
      case (200 <= weatherId && weatherId <= 232):
        mainImgSrc = "/assets/icons/thunder.svg";
        backgroundColor = "#2c3c47";
        setMetaTheme("#2c3c47");
        break;
      case (600 <= weatherId && weatherId <= 622):
        mainImgSrc = "/assets/icons/snow.svg";
        backgroundColor = "#83939e";
        setMetaTheme("#83939e");
        break;
      case (701 <= weatherId && weatherId <= 781):
        mainImgSrc = heureLocale.startsWith("1") || heureLocale.startsWith("06") || heureLocale.startsWith("07") || heureLocale.startsWith("08") || heureLocale.startsWith("09") ? "/assets/icons/haze.svg" : "/assets/icons/hazenight.svg";
        backgroundColor = "#63baf7";
        setMetaTheme("#63baf7");
        break;
      case 801:
        mainImgSrc = heureLocale.startsWith("1") || heureLocale.startsWith("06") || heureLocale.startsWith("07") || heureLocale.startsWith("08") || heureLocale.startsWith("09") ? "/assets/icons/fewclouds.svg" : "/assets/icons/fewcloudsnight.svg";
        backgroundColor = "#41adfa";
        setMetaTheme("#41adfa");
        break;
      case (802 <= weatherId && weatherId <= 804):
        mainImgSrc = "/assets/icons/clouds.svg";
        backgroundColor = "#3e85b8";
        setMetaTheme("#3e85b8");
        break;
      case (501 <= weatherId && weatherId <= 531):
        mainImgSrc = "/assets/icons/shower.svg";
        backgroundColor = "#2f5069";
        setMetaTheme("#2f5069");
        break;
      default:
        mainImgSrc = "/assets/icons/rain.svg";
        backgroundColor = "#386e94";
        setMetaTheme("#386e94");
        break;
    }
    setMainImg(<Image src={mainImgSrc} className="mainImg" alt={weather[0].description} width={125} height={125} />);
    document.body.style.background = backgroundColor;
    fetchDataForecasts(data2);
  };

  const fetchDataForecasts = async (data) => {
    const { list } = data;
    const forecasts = list.filter(forecast => forecast.dt_txt.includes('12:00:00'));
    const temperatures = forecasts.map(forecast => Math.floor(forecast.main.temp));
    const weatherIds = forecasts.map(forecast => forecast.weather[0].id);
    const days = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];
    const dates = forecasts.map(forecast => new Date(forecast.dt_txt.slice(0, -9)));
    const daysOfWeek = dates.map(date => days[date.getDay()]);
    const chartData = list.slice(0, 8).map(item => ({
      name: item.dt_txt.substring(11).slice(0, -3),
      temp: item.main.temp,
      humidity: item.main.humidity,
      wind: item.wind.speed,
      windDeg: item.wind.deg,
      weather: item.weather[0],
      rain: item.pop || 0
    }));
    setImg2(getImage(weatherIds[0]));
    setImg3(getImage(weatherIds[1]));
    setImg4(getImage(weatherIds[2]));
    setImg5(getImage(weatherIds[3]));
    setImg6(getImage(weatherIds[4]));
    setTemp2(temperatures[0]);
    setTemp3(temperatures[1]);
    setTemp4(temperatures[2]);
    setTemp5(temperatures[3]);
    setTemp6(temperatures[4]);
    setJour2(daysOfWeek[0]);
    setJour3(daysOfWeek[1]);
    setJour4(daysOfWeek[2]);
    setJour5(daysOfWeek[3]);
    setJour6(daysOfWeek[4]);
    setDataChart(chartData);
  };

  const handleReturn = () => {
    setShowComponents(false);
    document.body.style.background = "#1c95ec";
    setMetaTheme("#1c95ec");
  };

  function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
      const weather = payload[0].payload.weather;
      const rain = payload[0].payload.rain;
      const humidity = payload[0].payload.humidity;
      const wind = payload[0].payload.wind;
      const windDeg = payload[0].payload.windDeg;
      return (
        <div className="custom-tooltip">
          <p className="bold">
            {label}{getImage(weather.id)}
          </p>
          <p>Température {payload[0].value.toFixed(0)}°C</p>
          <p>Humidité {humidity}%</p>
          <p>
            <svg width="18" height="18" viewBox="0 0 50 50">
              <path d="M25 5 L40 45 L25 35 L10 45 Z" fill="currentColor" transform={`rotate(${windDeg + 180}, 25, 25)`} />
            </svg>
            Vent {(3.6 * wind).toFixed(0)}km/h
          </p>
          <p>Pluie {(rain * 100).toFixed(0)}%</p>
        </div>
      );
    }
    return null;
  }

  function getImage(number) {
    switch (number) {
      case 800:
        return <Image src="/assets/icons/sun.svg" alt="Temps dégagé" width={60} height={60} />;
      case (200 <= number && number <= 232):
        return <Image src="/assets/icons/thunder.svg" alt="Temps orageux" width={60} height={60} />;
      case (600 <= number && number <= 622):
        return <Image src="/assets/icons/snow.svg" alt="Tmps neigeux" width={60} height={60} />;
      case (701 <= number && number <= 781):
        return <Image src="/assets/icons/sun.svg" alt="Temps brumeux" width={60} height={60} />;
      case 801:
        return <Image src="/assets/icons/fewclouds.svg" alt="Temps partiellement nuageux" width={60} height={60} />;
      case (802 <= number && number <= 804):
        return <Image src="/assets/icons/clouds.svg" alt="Temps nuageux" width={60} height={60} />;
      case (501 <= number && number <= 531):
        return <Image src="/assets/icons/shower.svg" alt="Temps très pluvieux" width={60} height={60} />;
      default:
        return <Image src="/assets/icons/rain.svg" alt="Temps pluvieux" width={60} height={60} />;
    }    
  }

  return (
    <>
      <Head>
        <title>Météo &#8211; Léo SEGUIN</title>
      </Head>
      <div className="wrapper">
        <header>
          {showComponents ? (
            <>
              <span id="heure">{heure} {ville}, {pays}</span>
              <span id="retour" aria-label="Retour" onClick={handleReturn}><RxMagnifyingGlass color="white" size="25px" /></span>
            </>
          ) : (
            <span>Météo</span>
          )}
        </header>
        <main>
          {!showComponents && (
            <section>
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
            </section>
          )}
          {showComponents && (
            <section>
              <div className="current-part">
                <div className="main-info">
                  <div className="temp">
                    {mainImg}
                  </div>
                  <div className="temp">
                    <span className="mainTemp">{temperature}</span>
                    <span className="tempRessenti">Ressenti: {ressenti}</span>
                  </div>
                </div>
                <div className="bottom-details">
                  <div className="column">
                    <div className="details">
                      <span>{humidite}</span>
                      <p>Humidité</p>
                    </div>
                  </div>
                  <div className="column">
                    <div className="details">
                      <span>
                        <svg width="18" height="18" viewBox="0 0 50 50">
                          <path d="M25 5 L40 45 L25 35 L10 45 Z" fill="currentColor" transform={`rotate(${ventDirection}, 25, 25)`} />
                        </svg>
                        {vent}</span>
                      <p>Vent</p>
                    </div>
                  </div>
                  <div className="column">
                    <div className="details">
                      <span>{rain}</span>
                      <p>Précipitations</p>
                    </div>
                  </div>
                  <div className="column">
                    <div className="details">
                      <span>{pression}</span>
                      <p>Pression</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chart-part">
                <div className="graphique">
                  <p className="titreGraph">Prévisions (24h)</p>
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
                    <div className="detailsForecasts">
                      <p>{jour2}</p>
                      {img2}
                      <div className="temp">
                        <span>{temp2}</span>
                        °C
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="detailsForecasts">
                      <p>{jour3}</p>
                      {img3}
                      <div className="temp">
                        <span>{temp3}</span>
                        °C
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="detailsForecasts">
                      <p>{jour4}</p>
                      {img4}
                      <div className="temp">
                        <span>{temp4}</span>
                        °C
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="detailsForecasts">
                      <p>{jour5}</p>
                      {img5}
                      <div className="temp">
                        <span>{temp5}</span>
                        °C
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="detailsForecasts">
                      <p>{jour6}</p>
                      {img6}
                      <div className="temp">
                        <span>{temp6}</span>
                        °C
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sunPart">
                  <p><BsFillSunriseFill />{lever}</p>
                  <p><BsFillSunsetFill />{coucher}</p>
                </div>
              </div>
            </section>
          )}
        </main>
        <Component {...pageProps} />
      </div>
    </>
  );
}
