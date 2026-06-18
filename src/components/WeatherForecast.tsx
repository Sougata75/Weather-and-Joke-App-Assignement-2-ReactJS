import axios from "axios";
import { useState , useEffect } from "react";
import type { WeatherType } from "../typescript/interface/interface";
import BgImg from '../assets/bgImg.jpg';
import SunArc from '../assets/sunArc.png';


function WeatherForecast() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isErrors, setIsErrors] = useState<string>("");
    const [weather, setWeather] = useState<WeatherType|null>(null);

    useEffect(() => {
      setIsLoading(true);
        const fetchData = async () => {
            setIsLoading(true);
            try{
                const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=aa4f9e0eabe8cadb87b8201be24756d1`);
                setWeather(weatherData?.data)
            } catch(error: any){
                setIsErrors(error.message);
                console.log(isErrors);
            }finally{
                setIsLoading(false);
            }
        };
        fetchData();

        const intervalId = setInterval(() =>{
            fetchData();
        }, 600000);

        return () => clearInterval(intervalId);
        
    },[]);

    const currentTemp = weather?Math.round(weather.main.temp - 273.15):0;
    const feelsLikeTemp = weather?Math.round(weather.main.feels_like - 278.15):0;
    const maxTemp = weather?Math.round(weather.main.temp_max - 273.15):0;
    const minTemp = weather?Math.round(weather.main.temp_min - 273.15):0;
    const visibilityData = weather ? (weather.visibility / 1000).toFixed(1) : 0;

    const timeFormat = (unixTimestamp?: number) => {
        if(!unixTimestamp)return "--:--";

        const date = new Date(unixTimestamp * 1000);

        return date.toLocaleTimeString(`en-US`, {
            hour:'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const sunRise = timeFormat(weather?.sys.sunrise);
    const sunSet = timeFormat(weather?.sys.sunset);
    

  return (
    <>
        <div className="h-[100vh] bg-gray-900 flex justify-center md:items-center">
        <div className="w-[400px] h-full md:h-[650px] bg-white p-6 md:rounded-3xl bg-cover bg-bottom overflow-y-scroll noBar" style={{backgroundImage:`url(${BgImg})`}}>
          <div className="w-full flex flex-nowrap">
            <div className="w-[50%]">
            <h2 className={`${isLoading ? "text-lg":"text-2xl"} font-semibold text-white txtShadow mb-2`}>
            <i className="fa-solid fa-location-dot"></i>{isLoading? "City not found !":`${weather?.sys.country}, ${weather?.name}`}
          </h2>
          <div className="w-[120px] h-[150px] flex flex-wrap mb-7">
            <h2 className=" text-[70px] text-white txtShadow">
              {currentTemp}°
              <p className="text-sm">Feels like : {feelsLikeTemp}°</p>
            </h2>
            <p className=" text-white text-xl txtShadow">{weather?.weather[0].main}</p>
          </div>
          </div>
          <div className="w-[50%] h-[100px] mt-3">
            <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
          </div>
          </div>

          <div className="mb-3">
            <p className="w-full text-white txtShadow">↑{maxTemp}°/↓{minTemp}°</p>
          </div>
          <div className="w-full bg-black/5 backdrop-blur-[5px] px-4 py-1 mb-4 rounded-3xl shadow-md shadow-gray-500">
            <h3 className="font-semibold text-white mb-3">Atmosphere</h3>
            <div className="w-full flex flex-wrap mb-1">
              <div className="w-[50%]">
                <p className="text-gray-800 text-[15px] font-medium mb-2">
                  Humidity: {weather?.main.humidity}%
                </p>
                <p className="text-gray-800 text-[15px] font-medium mb-2">
                  Wind speed: {weather?.wind.speed} km/h
                </p>
                <p className="text-gray-800 text-[15px] font-medium mb-2">
                  Wind Direction: {weather?.wind.deg}°
                </p>
              </div>
              <div className="w-[50%]">
                <div className="justify-self-end">
                  <p className="text-gray-800 text-[15px] font-medium mb-2">
                    Visibility: {visibilityData} km
                  </p>
                  <p className="text-gray-800 text-[15px] font-medium mb-2">
                    Cloud Cover: {weather?.clouds.all}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-black/5 backdrop-blur-[5px] px-4 py-1 mb-4 rounded-3xl shadow-md shadow-gray-500">
            <h3 className="font-semibold text-white mb-3">Pressure Details</h3>
            <div className="w-full flex flex-wrap mb-1">
              <div className="w-[50%]">
                <p className="text-gray-800 text-[14px] font-medium mb-3">
                  Pressure: {weather?.main.pressure} hPa
                </p>
                <p className="text-gray-800 text-[14px] font-medium mb-3">
                  Sea Level: {weather?.main.sea_level} hPa
                </p>
              </div>
              <div className="w-[50%]">
                <div className="justify-self-end">
                  <p className="text-gray-800 text-[14px] font-medium mb-3">
                    Ground Level: {weather?.main.grnd_level} hPa
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-black/5 backdrop-blur-[5px] px-4 py-1  rounded-3xl shadow-md shadow-gray-500">
              <h3 className="font-semibold text-white mb-3">Sun Cycle</h3>
              <div className="mr-[1px] h-[90px] bg-cover" style={{backgroundImage:`url(${SunArc})`}}></div>
              <div className="w-full flex justify-between py-2 px-1 mb-2">
                <h2 className="text-xs text-center">Sun Rise
                    <p className="font-semibold text-[16px]">{sunRise}</p>
                </h2>
                <h2 className="text-xs text-center">Sun Set
                    <p className="font-semibold text-[16px]">{sunSet}</p>
                </h2>
              </div>
          </div>
        </div>
      </div>
        </>
  );
}

export default WeatherForecast;
