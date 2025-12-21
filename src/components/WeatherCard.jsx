const WeatherCard = ({ weather, title}) => {
  if(!weather) {
    return null
  }

  // 天気アイコンのURLを生成
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <img src={iconUrl} alt={weather.weather[0].description} />
        <div>
          <p>気温: {Math.round(weather.main.temp)}°C</p>
          <p>体感: {Math.round(weather.main.feels_like)}°C</p>
          <p>天気: {weather.weather[0].description}</p>
          <p>湿度: {weather.main.humidity}%</p>
          <p>風速: {weather.wind?.speed || 0} m/s</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard