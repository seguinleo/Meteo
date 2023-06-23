/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { BsFillSunriseFill, BsFillSunsetFill, BsFillDropletFill } from 'react-icons/bs';
import { RiFahrenheitFill, RiCelsiusFill } from 'react-icons/ri';
// eslint-disable-next-line import/no-unresolved
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';
import Image from 'next/image';
import CustomTooltip from './components/CustomTooltip';
import './assets/css/style.css';

export default function App(props) {
  let timeoutError;
  const { Component } = props;
  const [showComponents, setShowComponents] = useState(false);
  const [metaTheme, setMetaTheme] = useState('#1c95ec');
  const [mainImg, setMainImg] = useState(null);
  const [ville, setVille] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [ressenti, setRessenti] = useState(null);
  const [humidite, setHumidite] = useState(null);
  const [vent, setVent] = useState(null);
  const [ventDirection, setVentDirection] = useState(0);
  const [pression, setPression] = useState(null);
  const [lever, setLever] = useState(null);
  const [coucher, setCoucher] = useState(null);
  const [airPollution, setAirPollution] = useState(null);
  const [uv, setUv] = useState(null);
  const [latitudeVille, setLatitudeVille] = useState(null);
  const [longitudeVille, setLongitudeVille] = useState(null);
  const [moonPhase, setMoonPhase] = useState(null);
  const [dataChart, setDataChart] = useState(null);
  const [heure, setHeure] = useState(null);
  const [jour2, setJour2] = useState(null);
  const [jour3, setJour3] = useState(null);
  const [jour4, setJour4] = useState(null);
  const [jour5, setJour5] = useState(null);
  const [jour6, setJour6] = useState(null);
  const [jour7, setJour7] = useState(null);
  const [jour8, setJour8] = useState(null);
  const [temp2, setTemp2] = useState(null);
  const [temp3, setTemp3] = useState(null);
  const [temp4, setTemp4] = useState(null);
  const [temp5, setTemp5] = useState(null);
  const [temp6, setTemp6] = useState(null);
  const [temp7, setTemp7] = useState(null);
  const [temp8, setTemp8] = useState(null);
  const [rain2, setRain2] = useState(null);
  const [rain3, setRain3] = useState(null);
  const [rain4, setRain4] = useState(null);
  const [rain5, setRain5] = useState(null);
  const [rain6, setRain6] = useState(null);
  const [rain7, setRain7] = useState(null);
  const [rain8, setRain8] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);
  const [img4, setImg4] = useState(null);
  const [img5, setImg5] = useState(null);
  const [img6, setImg6] = useState(null);
  const [img7, setImg7] = useState(null);
  const [img8, setImg8] = useState(null);
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
    if (timeoutError) clearTimeout(timeoutError);
    const notification = document.querySelector('#errorNotification');
    setError(message);
    notification.style.display = 'block';
    timeoutError = setTimeout(() => {
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
    if ((number >= 501 && number <= 504) || (number >= 520 && number <= 531)) {
      return <Image src="/assets/icons/shower.png" alt="Pluie forte" width={48} height={45} />;
    }
    if (number === 511) {
      return <Image src="/assets/icons/hail.png" alt="Grêle" width={48} height={45} />;
    }
    if (number === 600) {
      return <Image src="/assets/icons/snow.png" alt="Neige" width={48} height={45} />;
    }
    if ((number === 601 || number === 602) || (number >= 620 && number <= 622)) {
      return <Image src="/assets/icons/blizzard.png" alt="Neige forte" width={48} height={45} />;
    }
    if (number >= 611 && number <= 616) {
      return <Image src="/assets/icons/sleet.png" alt="Pluie verglaçante" width={48} height={45} />;
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
    return <Image src="/assets/icons/clouds.png" alt="Nuages" width={48} height={45} />;
  }

  const fetchDataAirPollution = (data) => {
    let { aqi } = data.list[0].main;

    if (aqi === 1) {
      aqi = `${aqi} - Excellent`;
    } else if (aqi === 2) {
      aqi = `${aqi} - Bon`;
    } else if (aqi === 3) {
      aqi = `${aqi} - Moyen`;
    } else if (aqi === 4) {
      aqi = `${aqi} - Mauvais`;
    } else {
      aqi = `${aqi} - Très mauvais`;
    }
    setAirPollution(aqi);
  };

  const fetchDataForecasts = async (data) => {
    const { hourly, daily } = data;
    const forecastsHourly = hourly.slice(1, 24);
    const chartData = forecastsHourly.filter((item, index) => index % 2 === 0).map((item) => {
      const forecastDateTime = new Date(item.dt * 1000);
      const forecastTime = forecastDateTime.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: data.timezone,
      });
      return {
        name: forecastTime,
        temp: item.temp,
        humidity: item.humidity,
        pressure: item.pressure,
        wind: item.wind_speed,
        windDeg: item.wind_deg,
        weather: item.weather[0],
        rain: (item.pop * 100) || 0,
        uv: item.uvi,
      };
    });

    const forecastsDaily = daily.slice(1, 8);
    const temperaturesDaily = forecastsDaily.map((forecast) => Math.floor(forecast.temp.day));
    const weatherIdsDaily = forecastsDaily.map((forecast) => forecast.weather[0].id);
    const days = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];
    const dates = daily.slice(1, 8).map((forecast) => new Date(forecast.dt * 1000));
    const daysOfWeek = dates.map((date) => days[date.getDay()]);

    setImg2(getImage(weatherIdsDaily[0]));
    setImg3(getImage(weatherIdsDaily[1]));
    setImg4(getImage(weatherIdsDaily[2]));
    setImg5(getImage(weatherIdsDaily[3]));
    setImg6(getImage(weatherIdsDaily[4]));
    setImg7(getImage(weatherIdsDaily[5]));
    setImg8(getImage(weatherIdsDaily[6]));
    setTemp2(`${temperaturesDaily[0]}°C`);
    setTemp3(`${temperaturesDaily[1]}°C`);
    setTemp4(`${temperaturesDaily[2]}°C`);
    setTemp5(`${temperaturesDaily[3]}°C`);
    setTemp6(`${temperaturesDaily[4]}°C`);
    setTemp7(`${temperaturesDaily[5]}°C`);
    setTemp8(`${temperaturesDaily[6]}°C`);
    setRain2(`${Math.floor(forecastsDaily[0].pop * 100)}%`);
    setRain3(`${Math.floor(forecastsDaily[1].pop * 100)}%`);
    setRain4(`${Math.floor(forecastsDaily[2].pop * 100)}%`);
    setRain5(`${Math.floor(forecastsDaily[3].pop * 100)}%`);
    setRain6(`${Math.floor(forecastsDaily[4].pop * 100)}%`);
    setRain7(`${Math.floor(forecastsDaily[5].pop * 100)}%`);
    setRain8(`${Math.floor(forecastsDaily[6].pop * 100)}%`);
    setJour2(daysOfWeek[0]);
    setJour3(daysOfWeek[1]);
    setJour4(daysOfWeek[2]);
    setJour5(daysOfWeek[3]);
    setJour6(daysOfWeek[4]);
    setJour7(daysOfWeek[5]);
    setJour8(daysOfWeek[6]);
    setDataChart(chartData);
  };

  const fetchDataCurrent = async (city, data, data2) => {
    const {
      current,
      timezone_offset: timezoneOffset,
    } = data;
    const { moon_phase: moonPhaseCurrent } = data.daily[0];
    const weatherId = current.weather[0].id;
    const ventDeg = current.wind_deg ? current.wind_deg : 0;
    const date = new Date();
    const timezoneOffsetMinutes = timezoneOffset / 60;
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
    const sunriseUTC = new Date(current.sunrise * 1000);
    const sunriseLocal = new Date(
      sunriseUTC.getTime()
      + (date.getTimezoneOffset() * 60 * 1000)
      + (timezoneOffsetMinutes * 60 * 1000),
    );
    const sunUp = sunriseLocal.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const sunsetUTC = new Date(current.sunset * 1000);
    const sunsetLocal = new Date(
      sunsetUTC.getTime()
      + (date.getTimezoneOffset() * 60 * 1000)
      + (timezoneOffsetMinutes * 60 * 1000),
    );
    const sunDown = sunsetLocal.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const name = city;

    setLever(sunUp);
    setCoucher(sunDown);
    setHeure(heureLocale);
    setVille(name);
    setTemperature(`${current.temp.toFixed(1)}°C`);
    setRessenti(`${current.feels_like.toFixed(0)}°C`);
    setHumidite(`${current.humidity}%`);
    setVent(`${(3.6 * current.wind_speed).toFixed(0)}km/h`);
    setPression(`${current.pressure}hPa`);
    setVentDirection(ventDeg + 180);
    setUv(current.uvi);
    setLatitudeVille(data.lat);
    setLongitudeVille(data.lon);
    setMoonPhase(moonPhaseCurrent);

    localStorage.setItem('ville', name);

    let mainImgSrc;
    let backgroundColor;

    if ((weatherId >= 200 && weatherId <= 202) || (weatherId >= 230 && weatherId <= 232)) {
      mainImgSrc = '/assets/icons/storm.png';
      if (heureLocale > sunUp && heureLocale < sunDown) {
        backgroundColor = '#19242b';
        setMetaTheme('#19242b');
      } else {
        backgroundColor = '#281e33';
        setMetaTheme('#281e33');
      }
    } else if (weatherId >= 210 && weatherId <= 221) {
      mainImgSrc = '/assets/icons/thunder.png';
      if (heureLocale > sunUp && heureLocale < sunDown) {
        backgroundColor = '#202d36';
        setMetaTheme('#202d36');
      } else {
        backgroundColor = '#2f1f3f';
        setMetaTheme('#2f1f3f');
      }
    } else if (weatherId >= 300 && weatherId <= 321) {
      if (heureLocale > sunUp && heureLocale < sunDown) {
        mainImgSrc = '/assets/icons/drizzle.png';
        backgroundColor = '#425b6b';
        setMetaTheme('#425b6b');
      } else {
        mainImgSrc = '/assets/icons/drizzleNight.png';
        backgroundColor = '#543973';
        setMetaTheme('#543973');
      }
    } else if (weatherId === 500) {
      mainImgSrc = '/assets/icons/rain.png';
      if (heureLocale > sunUp && heureLocale < sunDown) {
        backgroundColor = '#3d5669';
        setMetaTheme('#3d5669');
      } else {
        backgroundColor = '#412e57';
        setMetaTheme('#412e57');
      }
    } else if ((weatherId >= 501 && weatherId <= 504) || (weatherId >= 520 && weatherId <= 531)) {
      mainImgSrc = '/assets/icons/shower.png';
      if (heureLocale > sunUp && heureLocale < sunDown) {
        backgroundColor = '#2c3c47';
        setMetaTheme('#2c3c47');
      } else {
        backgroundColor = '#312440';
        setMetaTheme('#312440');
      }
    } else if (weatherId === 511) {
      mainImgSrc = '/assets/icons/hail.png';
      if (heureLocale > sunUp && heureLocale < sunDown) {
        backgroundColor = '#879eb0';
        setMetaTheme('#879eb0');
      } else {
        backgroundColor = '#5a4c6b';
        setMetaTheme('#5a4c6b');
      }
    } else if (weatherId === 600) {
      mainImgSrc = '/assets/icons/snow.png';
      if (heureLocale > sunUp && heureLocale < sunDown) {
        backgroundColor = '#879eb0';
        setMetaTheme('#879eb0');
      } else {
        backgroundColor = '#77668a';
        setMetaTheme('#77668a');
      }
    } else if ((weatherId === 601 || weatherId === 602) || (weatherId >= 620 && weatherId <= 622)) {
      mainImgSrc = '/assets/icons/blizzard.png';
      if (heureLocale > sunUp && heureLocale < sunDown) {
        backgroundColor = '#657682';
        setMetaTheme('#657682');
      } else {
        backgroundColor = '#857a91';
        setMetaTheme('#857a91');
      }
    } else if (weatherId >= 611 && weatherId <= 616) {
      if (heureLocale > sunUp && heureLocale < sunDown) {
        mainImgSrc = '/assets/icons/sleet.png';
        backgroundColor = '#2c3c47';
        setMetaTheme('#2c3c47');
      } else {
        mainImgSrc = '/assets/icons/sleetNight.png';
        backgroundColor = '#462c63';
        setMetaTheme('#462c63');
      }
    } else if (weatherId >= 701 && weatherId <= 721) {
      if (heureLocale > sunUp && heureLocale < sunDown) {
        mainImgSrc = '/assets/icons/haze.png';
        backgroundColor = '#6cb0e0';
        setMetaTheme('#6cb0e0');
      } else {
        mainImgSrc = '/assets/icons/hazeNight.png';
        backgroundColor = '#895abf';
        setMetaTheme('#895abf');
      }
    } else if (weatherId === 731 || (weatherId >= 751 && weatherId <= 771)) {
      mainImgSrc = '/assets/icons/dust.png';
      if (heureLocale > sunUp && heureLocale < sunDown) {
        backgroundColor = '#6cb0e0';
        setMetaTheme('#6cb0e0');
      } else {
        backgroundColor = '#895abf';
        setMetaTheme('#895abf');
      }
    } else if (weatherId === 741) {
      mainImgSrc = '/assets/icons/fog.png';
      if (heureLocale > sunUp && heureLocale < sunDown) {
        backgroundColor = '#6cb0e0';
        setMetaTheme('#6cb0e0');
      } else {
        backgroundColor = '#895abf';
        setMetaTheme('#895abf');
      }
    } else if (weatherId === 781) {
      mainImgSrc = '/assets/icons/tornado.png';
      if (heureLocale > sunUp && heureLocale < sunDown) {
        backgroundColor = '#2c3c47';
        setMetaTheme('#2c3c47');
      } else {
        backgroundColor = '#462c63';
        setMetaTheme('#462c63');
      }
    } else if (weatherId === 800) {
      if (heureLocale > sunUp && heureLocale < sunDown) {
        mainImgSrc = '/assets/icons/sun.png';
        backgroundColor = '#1c95ec';
        setMetaTheme('#1c95ec');
      } else {
        mainImgSrc = '/assets/icons/moon.png';
        backgroundColor = '#723ead';
        setMetaTheme('#723ead');
      }
    } else if (weatherId === 801 || weatherId === 802) {
      if (heureLocale > sunUp && heureLocale < sunDown) {
        mainImgSrc = '/assets/icons/fewclouds.png';
        backgroundColor = '#5080a3';
        setMetaTheme('#5080a3');
      } else {
        mainImgSrc = '/assets/icons/fewcloudsNight.png';
        backgroundColor = '#5a308a';
        setMetaTheme('#5a308a');
      }
    } else {
      mainImgSrc = '/assets/icons/clouds.png';
      if (heureLocale > sunUp && heureLocale < sunDown) {
        backgroundColor = '#496c85';
        setMetaTheme('#496c85');
      } else {
        backgroundColor = '#4a2d6b';
        setMetaTheme('#4a2d6b');
      }
    }

    setMainImg(<Image src={mainImgSrc} className="mainImg" alt={current.weather[0].description} width={96} height={90} />);
    document.body.style.background = backgroundColor;
    fetchDataForecasts(data);
    fetchDataAirPollution(data2);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    document.querySelector('.info-txt').style.display = 'block';
    const villeTrim = ville.trim();
    if (villeTrim === '') {
      showError('Veuillez saisir une ville valide...');
      document.querySelector('.info-txt').style.display = 'none';
      return;
    }
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
      const { city, oneCallData, airPollutionData } = data;
      fetchDataCurrent(city, oneCallData, airPollutionData);
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
          const { city, oneCallData, airPollutionData } = data;
          fetchDataCurrent(city, oneCallData, airPollutionData);
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
    setVille(localStorage.getItem('ville'));
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
      setTemp7(`${(temp7.slice(0, -2) * 1.8 + 32).toFixed(0)}°F`);
      setTemp8(`${(temp8.slice(0, -2) * 1.8 + 32).toFixed(0)}°F`);
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
      setTemp7(`${((temp7.slice(0, -2) - 32) / 1.8).toFixed(0)}°C`);
      setTemp8(`${((temp8.slice(0, -2) - 32) / 1.8).toFixed(0)}°C`);
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
                {localStorage.getItem('ville')}
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
                  aria-required="true"
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
          )}
          {showComponents && (
            <>
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
                <div className="details">
                  <div className="column">
                    <div className="detail">
                      <span>{humidite}</span>
                      <p>Humidité</p>
                    </div>
                  </div>
                  <div className="column">
                    <div className="detail">
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
                    <div className="detail">
                      <span>{pression}</span>
                      <p>Pression</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chart-part">
                <div className="graphique">
                  <p className="titreGraph">Prévisions</p>
                  <ResponsiveContainer width="90%" height={100} style={{ margin: 'auto' }}>
                    <LineChart data={dataChart}>
                      <XAxis axisLine={false} tick={false} dataKey="name" />
                      <YAxis yAxisId="temperature" axisLine={false} tick={false} domain={['dataMin', 'dataMax']} width={0} />
                      <YAxis yAxisId="rain" orientation="right" axisLine={false} tick={false} domain={[0, 100]} width={0} />
                      <Tooltip content={<CustomTooltip getImage={getImage} temperature={temperature} />} wrapperStyle={{ outline: 'none' }} />
                      <Line
                        dataKey="temp"
                        stroke="rgba(255,255,255,.7)"
                        strokeWidth="2"
                        dot={{ r: 4 }}
                        yAxisId="temperature"
                      />
                      <Line
                        dataKey="rain"
                        stroke="rgba(57,196,243,.7)"
                        strokeWidth="2"
                        dot={{ r: 4 }}
                        yAxisId="rain"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="forecasts-part">
                <div className="details">
                  <div className="column">
                    <div className="detailsForecasts">
                      <p>{jour2}</p>
                      {img2}
                      <div className="temp">
                        <span>{temp2}</span>
                      </div>
                      <div className="pop">
                        <span>
                          <BsFillDropletFill />
                          {rain2}
                        </span>
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
                      <div className="pop">
                        <span>
                          <BsFillDropletFill />
                          {rain3}
                        </span>
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
                      <div className="pop">
                        <span>
                          <BsFillDropletFill />
                          {rain4}
                        </span>
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
                      <div className="pop">
                        <span>
                          <BsFillDropletFill />
                          {rain5}
                        </span>
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
                      <div className="pop">
                        <span>
                          <BsFillDropletFill />
                          {rain6}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="detailsForecasts">
                      <p>{jour7}</p>
                      {img7}
                      <div className="temp">
                        <span>{temp7}</span>
                      </div>
                      <div className="pop">
                        <span>
                          <BsFillDropletFill />
                          {rain7}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="detailsForecasts">
                      <p>{jour8}</p>
                      {img8}
                      <div className="temp">
                        <span>{temp8}</span>
                      </div>
                      <div className="pop">
                        <span>
                          <BsFillDropletFill />
                          {rain8}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <details>
                  <summary>Plus d&#39;informations</summary>
                  <div className="plusInfo">
                    <p>
                      Pollution de l&#39;air :
                      {' '}
                      {airPollution}
                    </p>
                    <p>
                      Indice UV :
                      {' '}
                      {uv}
                    </p>
                    <p>
                      Longitude :
                      {' '}
                      {longitudeVille}
                    </p>
                    <p>
                      Latitude :
                      {' '}
                      {latitudeVille}
                    </p>
                    <p>
                      <BsFillSunriseFill />
                      {lever}
                      {' '}
                      <BsFillSunsetFill />
                      {coucher}
                    </p>
                    <p>
                      Phase de lune :
                      {' '}
                      {moonPhase}
                    </p>
                  </div>
                </details>
              </div>
            </>
          )}
        </main>
        {!showComponents && (
        <footer className="copyright">
          &copy;
          <a href="https://leoseguin.fr/" target="_blank" rel="noreferrer" aria-label="Vers leoseguin.fr">leoseguin.fr</a>
          {' '}
          -
          {' '}
          <a href="https://leoseguin.fr/mentionslegales" target="_blank" rel="noreferrer" aria-label="Vers mentions légales">Mentions légales</a>
        </footer>
        )}
        <Component />
        <Analytics />
      </div>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
