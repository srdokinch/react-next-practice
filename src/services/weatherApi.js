import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = import.meta.env.VITE_API_URL || 'https://api.openweathermap.org/data/2.5'
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || !API_KEY

// ダミーの現在の天気データを生成
const getMockCurrentWeather = (city) => {
  // 少し遅延を入れてAPI呼び出しをシミュレート
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: city || '東京',
        main: {
          temp: Math.floor(Math.random() * 15) + 15, // 15-30°C
          feels_like: Math.floor(Math.random() * 15) + 15,
          humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
          pressure: 1013
        },
        weather: [
          {
            main: ['Clear', 'Clouds', 'Rain', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
            description: ['快晴', '曇り', '雨', '晴れ時々曇り'][Math.floor(Math.random() * 4)],
            icon: ['01d', '02d', '10d', '03d'][Math.floor(Math.random() * 4)]
          }
        ],
        wind: {
          speed: (Math.random() * 5).toFixed(1) // 0-5 m/s
        },
        sys: {
          country: 'JP'
        }
      })
    }, 500) // 500ms遅延
  })
}

// ダミーの予報データを生成
const getMockForecast = (city) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 明日の天気データを作成（リストの最初のアイテムとして）
      const tomorrowWeather = {
        dt: Math.floor(Date.now() / 1000) + 86400, // 明日のタイムスタンプ
        main: {
          temp: Math.floor(Math.random() * 15) + 15,
          feels_like: Math.floor(Math.random() * 15) + 15,
          humidity: Math.floor(Math.random() * 40) + 40,
          pressure: 1013
        },
        weather: [
          {
            main: ['Clear', 'Clouds', 'Rain', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
            description: ['快晴', '曇り', '雨', '晴れ時々曇り'][Math.floor(Math.random() * 4)],
            icon: ['01d', '02d', '10d', '03d'][Math.floor(Math.random() * 4)]
          }
        ],
        wind: {
          speed: (Math.random() * 5).toFixed(1)
        },
        dt_txt: new Date(Date.now() + 86400 * 1000).toISOString()
      }

      resolve({
        city: {
          name: city || '東京',
          country: 'JP'
        },
        list: [tomorrowWeather] // 明日のデータのみ返す
      })
    }, 500)
  })
}

// 現在の天気を取得
export const getCurrentWeather = async (city) => {
  // モックデータを使用する場合
  if (USE_MOCK_DATA) {
    console.log('📦 ダミーデータを使用しています:', city)
    return getMockCurrentWeather(city)
  }

  // 実際のAPIを使用する場合
  try {
    const response = await axios.get(`${API_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // 摂氏で取得
        lang: 'ja' // 日本語で取得
      }
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || '天気情報の取得に失敗しました')
  }
}

// 5日間の予報を取得（明日の天気を含む）
export const getForecast = async (city) => {
  // モックデータを使用する場合
  if (USE_MOCK_DATA) {
    console.log('📦 ダミーデータを使用しています:', city)
    return getMockForecast(city)
  }

  // 実際のAPIを使用する場合
  try {
    const response = await axios.get(`${API_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // 摂氏で取得
        lang: 'ja' // 日本語で取得
      }
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || '天気予報の取得に失敗しました')
  }
}
