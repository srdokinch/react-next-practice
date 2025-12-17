import { useState } from 'react'
import './App.css'
import CityInput from './components/CityInput'

function App() {
  const [city, setCity] = useState('')

  const handleSearch = (cityName) => {
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
      </main>
    </div>
  )
}

export default App
