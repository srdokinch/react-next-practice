import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('')
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>天気予報アプリ</h1>
      </header>
      <main>
        {/* ここにコンポーネントを追加していく */}
      </main>
    </div>
  )
}

export default App
