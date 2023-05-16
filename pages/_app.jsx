/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
} from 'recharts';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { BsFillSunriseFill, BsFillSunsetFill } from 'react-icons/bs';
import { RiFahrenheitFill, RiCelsiusFill } from 'react-icons/ri';
import Head from 'next/head';
import Image from 'next/image';
import CustomTooltip from './components/CustomTooltip';
import './assets/css/style.css';

export default function App({ Component, pageProps }) {
  const [showComponents, setShowComponents] = useState(false);
  const [metaTheme, setMetaTheme] = useState('#1c95ec');
  const [mainImg, setMainImg] = useState(null);
  const [ville, setVille] = useState('');
  const [pays, setPays] = useState(null);
  const [temperature, setTemperature] = useState(null);
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
  const [error, setError] = useState(false);

  useEffect(() => {
    const metaThemeColor = document.querySelectorAll('.themecolor');
    if (metaThemeColor) {
      metaThemeColor.forEach((meta) => meta.setAttribute('content', metaTheme));
    }
    if (typeof window !== 'undefined') {
      const savedVille = localStorage.getItem('ville');
      setVille(savedVille || '');
    }
  }, [metaTheme]);

  function showError(message) {
    const notification = document.getElementById('errorNotification');
    setError(message);
    notification.style.display = 'block';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 5000);
  }

  function getImage(number) {
    if ((number >= 200 && number <= 202) || (number >= 230 && number <= 232)) {
      return <Image src="/assets/icons/storm.png" alt="Tempête" width={48} height={45} />;
    }
    if (number >= 210 && number <= 221) {
      return <Image src="/assets/icons/thunder.png" alt="Orage" width={48} height={45} />;
    }
    if (number >= 300 && number <= 321) {
      return <Image src="/assets/icons/drizzle.png" alt="Bruine" width={48} height={45} />;
    }
    if (number === 500) {
      return <Image src="/assets/icons/rain.png" alt="Pluie" width={48} height={45} />;
    }
    if (number >= 501 && number <= 504) {
      return <Image src="/assets/icons/shower.png" alt="Pluie forte" width={48} height={45} />;
    }
    if (number === 511) {
      return <Image src="/assets/icons/hail.png" alt="Neige" width={48} height={45} />;
    }
    if (number >= 520 && number <= 531) {
      return <Image src="/assets/icons/shower.png" alt="Averse" width={48} height={45} />;
    }
    if (number === 600) {
      return <Image src="/assets/icons/snow.png" alt="Neige" width={48} height={45} />;
    }
    if (number === 601 || number === 602) {
      return <Image src="/assets/icons/blizzard.png" alt="Neige forte" width={48} height={45} />;
    }
    if (number >= 611 && number <= 616) {
      return <Image src="/assets/icons/sleet.png" alt="Pluie verglaçante" width={48} height={45} />;
    }
    if (number >= 620 && number <= 622) {
      return <Image src="/assets/icons/blizzard.png" alt="Blizzard" width={48} height={45} />;
    }
    if (number >= 701 && number <= 721) {
      return <Image src="/assets/icons/haze.png" alt="Brume" width={48} height={45} />;
    }
    if (number === 731 || (number >= 751 && number <= 771)) {
      return <Image src="/assets/icons/dust.png" alt="Poussières" width={48} height={45} />;
    }
    if (number === 741) {
      return <Image src="/assets/icons/fog.png" alt="Brouillard" width={48} height={45} />;
    }
    if (number === 781) {
      return <Image src="/assets/icons/tornado.png" alt="Tornade" width={48} height={45} />;
    }
    if (number === 800) {
      return <Image src="/assets/icons/sun.png" alt="Soleil" width={48} height={45} />;
    }
    if (number === 801 || number === 802) {
      return <Image src="/assets/icons/fewclouds.png" alt="Quelques nuages" width={48} height={45} />;
    }
    if (number === 803 || number === 804) {
      return <Image src="/assets/icons/clouds.png" alt="Nuages" width={48} height={45} />;
    }
    return <Image src="/assets/icons/clouds.png" alt="Nuages" width={48} height={45} />;
  }

  const fetchDataCurrent = async (data, data2) => {
    const {
      name, sys, main, wind, weather,
    } = data;
    const weatherId = weather[0].id;
    const ventDeg = wind.deg ? wind.deg : 0;
    const date = new Date();
    const timezoneOffsetMinutes = data.timezone / 60;
    const timezoneOffsetHours = timezoneOffsetMinutes / 60;
    const utcDate = new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
    );
    const localDate = new Date(utcDate.getTime() + (timezoneOffsetHours * 60 * 60 * 1000));
    const heureLocale = localDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const sunriseUTC = new Date(sys.sunrise * 1000);
    const sunriseLocal = new Date(sunriseUTC.getTime()
      + (date.getTimezoneOffset() * 60 * 1000)
      + (timezoneOffsetMinutes * 60 * 1000));
    const sunUp = sunriseLocal.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const sunsetUTC = new Date(sys.sunset * 1000);
    const sunsetLocal = new Date(sunsetUTC.getTime()
      + (date.getTimezoneOffset() * 60 * 1000)
      + (timezoneOffsetMinutes * 60 * 1000));
    const sunDown = sunsetLocal.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    setLever(sunUp);
    setCoucher(sunDown);
    setHeure(heureLocale);
    setVille(name);
    localStorage.setItem('ville', name);
    setPays(sys.country);
    setTemperature(`${main.temp.toFixed(1)}°C`);
    setRessenti(`${main.feels_like.toFixed(0)}°C`);
    setHumidite(`${main.humidity}%`);
    setVent(`${(3.6 * wind.speed).toFixed(0)}km/h`);
    setPression(`${main.pressure}hPa`);
    setVentDirection(ventDeg + 180);
    let mainImgSrc;
    let backgroundColor;
    if ((weatherId >= 200 && weatherId <= 202) || (weatherId >= 230 && weatherId <= 232)) {
      mainImgSrc = '/assets/icons/storm.png';
      backgroundColor = '#19242b';
      setMetaTheme('#19242b');
    } else if (weatherId >= 210 && weatherId <= 221) {
      mainImgSrc = '/assets/icons/thunder.png';
      backgroundColor = '#202d36';
      setMetaTheme('#202d36');
    } else if (weatherId >= 300 && weatherId <= 321) {
      if (heureLocale > sunUp && heureLocale < sunDown) {
        mainImgSrc = '/assets/icons/drizzle.png';
      } else {
        mainImgSrc = '/assets/icons/drizzleNight.png';
      }
      backgroundColor = '#425b6b';
      setMetaTheme('#425b6b');
    } else if (weatherId === 500) {
      mainImgSrc = '/assets/icons/rain.png';
      backgroundColor = '#3d5669';
      setMetaTheme('#3d5669');
    } else if (weatherId >= 501 && weatherId <= 504) {
      mainImgSrc = '/assets/icons/shower.png';
      backgroundColor = '#2c3c47';
      setMetaTheme('#2c3c47');
    } else if (weatherId === 511) {
      mainImgSrc = '/assets/icons/hail.png';
      backgroundColor = '#879eb0';
      setMetaTheme('#879eb0');
    } else if (weatherId >= 520 && weatherId <= 531) {
      mainImgSrc = '/assets/icons/shower.png';
      backgroundColor = '#2c3c47';
      setMetaTheme('#2c3c47');
    } else if (weatherId === 600) {
      mainImgSrc = '/assets/icons/snow.png';
      backgroundColor = '#879eb0';
      setMetaTheme('#879eb0');
    } else if (weatherId === 601 || weatherId === 602) {
      mainImgSrc = '/assets/icons/blizzard.png';
      backgroundColor = '#657682';
      setMetaTheme('#657682');
    } else if (weatherId >= 611 && weatherId <= 616) {
      if (heureLocale > sunUp && heureLocale < sunDown) {
        mainImgSrc = '/assets/icons/sleet.png';
      } else {
        mainImgSrc = '/assets/icons/sleetNight.png';
      }
      backgroundColor = '#2c3c47';
      setMetaTheme('#2c3c47');
    } else if (weatherId >= 620 && weatherId <= 622) {
      mainImgSrc = '/assets/icons/blizzard.png';
      backgroundColor = '#657682';
      setMetaTheme('#657682');
    } else if (weatherId >= 701 && weatherId <= 721) {
      if (heureLocale > sunUp && heureLocale < sunDown) {
        mainImgSrc = '/assets/icons/haze.png';
      } else {
        mainImgSrc = '/assets/icons/hazeNight.png';
      }
      backgroundColor = '#6cb0e0';
      setMetaTheme('#6cb0e0');
    } else if (weatherId === 731 || (weatherId >= 751 && weatherId <= 771)) {
      mainImgSrc = '/assets/icons/dust.png';
      backgroundColor = '#6cb0e0';
      setMetaTheme('#6cb0e0');
    } else if (weatherId === 741) {
      mainImgSrc = '/assets/icons/fog.png';
      backgroundColor = '#6cb0e0';
      setMetaTheme('#6cb0e0');
    } else if (weatherId === 781) {
      mainImgSrc = '/assets/icons/tornado.png';
      backgroundColor = '#2c3c47';
      setMetaTheme('#2c3c47');
    } else if (weatherId === 800) {
      if (heureLocale > sunUp && heureLocale < sunDown) {
        mainImgSrc = '/assets/icons/sun.png';
      } else {
        mainImgSrc = '/assets/icons/moon.png';
      }
      backgroundColor = '#1c95ec';
      setMetaTheme('#1c95ec');
    } else if (weatherId === 801 || weatherId === 802) {
      if (heureLocale > sunUp && heureLocale < sunDown) {
        mainImgSrc = '/assets/icons/fewclouds.png';
      } else {
        mainImgSrc = '/assets/icons/fewcloudsNight.png';
      }
      backgroundColor = '#5080a3';
      setMetaTheme('#5080a3');
    } else if (weatherId === 803 || weatherId === 804) {
      mainImgSrc = '/assets/icons/clouds.png';
      backgroundColor = '#496c85';
      setMetaTheme('#496c85');
    } else {
      mainImgSrc = '/assets/icons/clouds.png';
      backgroundColor = '#496c85';
      setMetaTheme('#496c85');
    }
    setMainImg(<Image src={mainImgSrc} className="mainImg" alt={weather[0].description} width={96} height={90} />);
    document.body.style.background = backgroundColor;
    // eslint-disable-next-line no-use-before-define
    fetchDataForecasts(data2);
  };

  const fetchDataForecasts = async (data) => {
    const { list } = data;
    const forecasts = list.filter((forecast) => forecast.dt_txt.includes('12:00:00'));
    const temperatures = forecasts.map((forecast) => Math.floor(forecast.main.temp));
    const weatherIds = forecasts.map((forecast) => forecast.weather[0].id);
    const days = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];
    const dates = forecasts.map((forecast) => new Date(forecast.dt_txt.slice(0, -9)));
    const daysOfWeek = dates.map((date) => days[date.getDay()]);
    const chartData = list.slice(0, 8).map((item) => ({
      name: item.dt_txt.substring(11).slice(0, -3),
      temp: item.main.temp,
      humidity: item.main.humidity,
      wind: item.wind.speed,
      windDeg: item.wind.deg,
      weather: item.weather[0],
      rain: item.pop || 0,
    }));
    setImg2(getImage(weatherIds[0]));
    setImg3(getImage(weatherIds[1]));
    setImg4(getImage(weatherIds[2]));
    setImg5(getImage(weatherIds[3]));
    setImg6(getImage(weatherIds[4]));
    setTemp2(`${temperatures[0]}°C`);
    setTemp3(`${temperatures[1]}°C`);
    setTemp4(`${temperatures[2]}°C`);
    setTemp5(`${temperatures[3]}°C`);
    setTemp6(`${temperatures[4]}°C`);
    setJour2(daysOfWeek[0]);
    setJour3(daysOfWeek[1]);
    setJour4(daysOfWeek[2]);
    setJour5(daysOfWeek[3]);
    setJour6(daysOfWeek[4]);
    setDataChart(chartData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    document.querySelector('.info-txt').style.display = 'block';
    const villeTrim = ville.trim();
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        villeTrim,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      const { currentData, forecastData } = data;
      fetchDataCurrent(currentData, forecastData);
      setShowComponents(true);
    } else {
      showError('Un problème est survenu, saisissez le nom complet de la ville...');
    }
    document.querySelector('.info-txt').style.display = 'none';
  };

  const geolocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        document.querySelector('.info-txt').style.display = 'block';
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        const response = await fetch('/api/geolocation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            latitude, longitude,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          const { currentData, forecastData } = data;
          fetchDataCurrent(currentData, forecastData);
          setShowComponents(true);
        } else {
          showError('Un problème est survenu lors de la géolocalisation...');
        }
        document.querySelector('.info-txt').style.display = 'none';
      }, () => {
        showError('Veuillez activer la géolocalisation de votre appareil pour ce site...');
      });
    } else {
      showError('Votre navigateur ne supporte pas la géolocalisation...');
    }
  };

  const handleReturn = () => {
    setShowComponents(false);
    document.body.style.background = '#1c95ec';
    setMetaTheme('#1c95ec');
  };

  const handleUnity = () => {
    if (temperature.endsWith('C')) {
      setTemperature(`${(temperature.slice(0, -2) * 1.8 + 32).toFixed(1)}°F`);
      setRessenti(`${(ressenti.slice(0, -2) * 1.8 + 32).toFixed(0)}°F`);
      setVent(`${(vent.slice(0, -4) / 1.609).toFixed(0)}mph`);
      setTemp2(`${(temp2.slice(0, -2) * 1.8 + 32).toFixed(0)}°F`);
      setTemp3(`${(temp3.slice(0, -2) * 1.8 + 32).toFixed(0)}°F`);
      setTemp4(`${(temp4.slice(0, -2) * 1.8 + 32).toFixed(0)}°F`);
      setTemp5(`${(temp5.slice(0, -2) * 1.8 + 32).toFixed(0)}°F`);
      setTemp6(`${(temp6.slice(0, -2) * 1.8 + 32).toFixed(0)}°F`);
      setDataChart(dataChart.map((item) => ({
        ...item,
        temp: (item.temp * 1.8 + 32),
        wind: (item.wind / 1.609),
      })));
    } else {
      setTemperature(`${((temperature.slice(0, -2) - 32) / 1.8).toFixed(1)}°C`);
      setRessenti(`${((ressenti.slice(0, -2) - 32) / 1.8).toFixed(0)}°C`);
      setVent(`${(vent.slice(0, -3) * 1.609).toFixed(0)}km/h`);
      setTemp2(`${((temp2.slice(0, -2) - 32) / 1.8).toFixed(0)}°C`);
      setTemp3(`${((temp3.slice(0, -2) - 32) / 1.8).toFixed(0)}°C`);
      setTemp4(`${((temp4.slice(0, -2) - 32) / 1.8).toFixed(0)}°C`);
      setTemp5(`${((temp5.slice(0, -2) - 32) / 1.8).toFixed(0)}°C`);
      setTemp6(`${((temp6.slice(0, -2) - 32) / 1.8).toFixed(0)}°C`);
      setDataChart(dataChart.map((item) => ({
        ...item,
        temp: ((item.temp - 32) / 1.8),
        wind: (item.wind * 1.609),
      })));
    }
  };

  return (
    <>
      <Head>
        <title>Météo &#8211; Léo SEGUIN</title>
      </Head>
      <div className="wrapper">
        <header>
          {showComponents ? (
            <>
              <span id="heure">
                {heure}
                {' '}
                {ville}
                ,
                {' '}
                {pays}
              </span>
              <button
                type="button"
                aria-label="Changer d'unité"
                onClick={handleUnity}
              >
                {temperature.endsWith('C') ? <RiFahrenheitFill color="white" size="25px" /> : <RiCelsiusFill color="white" size="25px" />}
              </button>
              <button
                type="button"
                aria-label="Retour"
                onClick={handleReturn}
              >
                <RxMagnifyingGlass color="white" size="25px" />
              </button>
            </>
          ) : (
            <h1>Météo</h1>
          )}
        </header>
        <div id="errorNotification">{error}</div>
        <main>
          {!showComponents && (
            <section>
              <form onSubmit={handleSubmit}>
                <div className="input-part">
                  <p className="info-txt">Chargement...</p>
                  <input
                    type="text"
                    placeholder="Paris, FR"
                    maxLength="40"
                    aria-label="Rechercher"
                    value={ville}
                    onChange={(event) => setVille(event.target.value)}
                    required
                  />
                  <button type="submit">
                    Rechercher
                  </button>
                  <div className="separator" />
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
                    <span className="tempRessenti">
                      Ressenti
                      {' '}
                      {ressenti}
                    </span>
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
                        {vent}
                      </span>
                      <p>Vent</p>
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
                  <LineChart width={320} height={100} data={dataChart}>
                    <XAxis axisLine={false} tick={false} dataKey="name" />
                    <YAxis axisLine={false} tick={false} domain={['dataMin', 'dataMax']} width={0} />
                    <Tooltip content={<CustomTooltip getImage={getImage} temperature={temperature} />} wrapperStyle={{ outline: 'none' }} />
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
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="detailsForecasts">
                      <p>{jour3}</p>
                      {img3}
                      <div className="temp">
                        <span>{temp3}</span>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="detailsForecasts">
                      <p>{jour4}</p>
                      {img4}
                      <div className="temp">
                        <span>{temp4}</span>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="detailsForecasts">
                      <p>{jour5}</p>
                      {img5}
                      <div className="temp">
                        <span>{temp5}</span>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="detailsForecasts">
                      <p>{jour6}</p>
                      {img6}
                      <div className="temp">
                        <span>{temp6}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sunPart">
                  <p>
                    <BsFillSunriseFill />
                    {lever}
                  </p>
                  <p>
                    <BsFillSunsetFill />
                    {coucher}
                  </p>
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
