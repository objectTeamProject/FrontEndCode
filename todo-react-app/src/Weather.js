import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css'; // CSS 파일을 불러옵니다.

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(false);

    const APIKey = ''; // Replace with your OpenWeatherMap API key

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                fetchWeather(latitude, longitude);
            }, () => {
                setError(true);
            });
        } else {
            setError(true);
        }
    }, []);

    const fetchWeather = async (lat, lon) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${APIKey}`);
            setWeather(response.data);
            setError(false);
        } catch {
            setError(true);
        }
    };

    const getWeatherEmoji = (main) => {
        switch (main.toLowerCase()) {
            case 'clear':
                return '☀️';
            case 'rain':
                return '🌧️';
            case 'snow':
                return '❄️';
            case 'clouds':
                return '☁️';
            case 'haze':
                return '🌫️';
            default:
                return '🌈';
        }
    };

    return (
        <div className="weather-container-horizontal">
            {error && (
                <div className="not-found fadeIn">
                    <p>Oops! Unable to fetch weather data :/</p>
                </div>
            )}
            
            {weather && (
                <div className="weather-horizontal">
                    <div className="weather-title">오늘의 날씨</div>
                    <div className="weather-icon">{getWeatherEmoji(weather.weather[0].main)}</div>
                    <div className="weather-info">
                        <p className="location">{weather.name}</p>
                        <p className="temperature">{parseInt(weather.main.temp)}<span>°C</span></p>
                        <p className="description">{weather.weather[0].description}</p>
                        <p className="temp-range">최저: {parseInt(weather.main.temp_min)}°C / 최고: {parseInt(weather.main.temp_max)}°C</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
