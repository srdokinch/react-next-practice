import { useState } from 'react'
import './App.css'
import CityInput from './components/CityInput'
import WeatherCard from './components/WeatherCard'
import{ getCurrentWeather } from './services/weatherApi'

function App() {
  const [city, setCity] = useState('')
  const [todayWeather, setTodayWeather] = useState(null)
  const [tomorrowWeather, setTomorrowWeather] = useState(null)
  const handleSearch = async (cityName) => {
    try {
      const data = await getCurrentWeather(cityName)
      setTodayWeather(data)
      console.log('今日の天気:', data)
    } catch (error) {
      console.error('エラー:', error.message)
    }
    console.log('検索：', cityName)  //動作確認用（後でAPI呼び出しに変更するよ）
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>天気予報アプリ</h1>
      </header>
      <main>
        <CityInput
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
        />
        <WeatherCard weather={todayWeather} title="今日の天気" />
        <WeatherCard weather={tomorrowWeather} title="明日の天気" />
      </main>
    </div>
  );
}

export default App;
