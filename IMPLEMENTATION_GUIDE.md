# 天気予報アプリ - 実装手順書

この手順書に従って、天気予報アプリを一から実装していきます。
**各ステップで「どのファイルに」「何を書くか」「なぜそうするか」を明確に説明します。**

## 📁 プロジェクト構造の確認

以下のファイルが既に準備されています：

```
src/
├── main.jsx              ✅ Reactエントリーポイント（完成・編集不要）
├── index.css             ✅ グローバルスタイル（完成・編集不要）
├── App.jsx               ⚠️ 基本構造のみ（ステップ1で編集）
├── App.css               ✅ スタイル（完成・後で調整可能）
├── services/
│   └── weatherApi.js     ✅ API関数（完成・編集不要）
└── components/
    ├── CityInput.jsx     ❌ 新規作成（ステップ2）
    ├── CityInput.css     ✅ 空ファイル（後でスタイルを書く）
    ├── WeatherCard.jsx   ❌ 新規作成（ステップ4）
    └── WeatherCard.css   ✅ 空ファイル（後でスタイルを書く）
```

**注意**: CSSファイルは後から書くため、この手順書ではスタイルに関する記述は最小限です。

---

---

## 📝 実装ステップ

### ステップ1: App.jsx の基本構造を整える

**対象ファイル**: `src/App.jsx`（編集）

**目的**: 
- 現在の検索フォーム部分を削除（CityInputコンポーネントに移動するため）
- 基本構造を整えて、コンポーネントを追加できる状態にする

**何を変更するか**:
現在のApp.jsxには検索フォーム（`input`と`button`）が含まれていますが、これを削除します。
理由：検索機能は後で作成する `CityInput` コンポーネントに移動するため。

**変更後のコード**:

```jsx
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
        {/* ここにコンポーネントを追加していきます */}
      </main>
    </div>
  )
}

export default App
```

**変更点の説明**:
- `header` の中にある `<div className="search-container">` とその中の `input` と `button` を削除
- `main` タグの中は一旦空のコメントだけにする（後でコンポーネントを追加）
- `city` と `setCity` の state は残しておく（後で使うため）

**確認方法**:
- ブラウザで表示し、検索フォームが消えていることを確認

---

---

### ステップ2: CityInputコンポーネントを作成

**対象ファイル**: `src/components/CityInput.jsx`（**新規作成**）

**目的**: 都市名を入力して検索するためのコンポーネントを作成します。

**何を作成するか**:
新しいファイル `src/components/CityInput.jsx` を作成し、以下のコードを記述します。

**作成するコード**:

```jsx
const CityInput = ({ city, setCity, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.trim()) {
      onSearch(city.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="都市名を入力してください（例: Tokyo, 東京）"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">検索</button>
    </form>
  )
}

export default CityInput
```

**コードの説明**:

1. **コンポーネントの定義**:
   ```jsx
   const CityInput = ({ city, setCity, onSearch }) => { ... }
   ```
   - `city`: 入力された都市名（親コンポーネントから受け取る）
   - `setCity`: 都市名を更新する関数（親コンポーネントから受け取る）
   - `onSearch`: 検索ボタンが押されたときに実行する関数（親コンポーネントから受け取る）

2. **handleSubmit関数**:
   ```jsx
   const handleSubmit = (e) => {
     e.preventDefault()  // フォームのデフォルト動作（ページリロード）を防ぐ
     if (city.trim()) {  // 入力値の前後の空白を削除して、空でない場合のみ
       onSearch(city.trim())  // 親コンポーネントの検索関数を実行
     }
   }
   ```
   - `e.preventDefault()`: フォーム送信時のページリロードを防ぐ
   - `city.trim()`: 入力値の前後の空白を削除
   - 空白でない場合のみ `onSearch` を実行

3. **JSXの構造**:
   ```jsx
   <form onSubmit={handleSubmit}>
     <input ... />
     <button type="submit">検索</button>
   </form>
   ```
   - `form` 要素の `onSubmit` でフォーム送信を処理
   - `button` の `type="submit"` で、ボタンクリックまたはEnterキーでフォーム送信ができる
   - `input` の `value={city}` と `onChange` で、親コンポーネントのstateと連携

**ポイント**:
- このコンポーネントは表示だけを担当し、実際の検索処理は親コンポーネント（App.jsx）で行う
- CSSファイルは後で追加するため、スタイルは付けない（現時点では見た目はシンプルなまま）

**確認方法**:
- ファイルが正しく作成されていることを確認（まだ表示されません。次のステップで使用します）

---

---

### ステップ3: App.jsx に CityInput を追加

**対象ファイル**: `src/App.jsx`（編集）

**目的**: 
- CityInputコンポーネントをインポートして使用する
- 検索処理の関数（handleSearch）を追加する（まだ実際のAPI呼び出しはしない）

**何を変更するか**:

1. **インポート文を追加**:
   ```jsx
   import CityInput from './components/CityInput'
   ```

2. **handleSearch関数を追加**:
   ```jsx
   const handleSearch = (cityName) => {
     console.log('検索:', cityName)  // 動作確認用（後でAPI呼び出しに変更）
   }
   ```

3. **JSXにCityInputコンポーネントを追加**:
   ```jsx
   <CityInput 
     city={city} 
     setCity={setCity} 
     onSearch={handleSearch} 
   />
   ```

**変更後のコード全体**:

```jsx
import { useState } from 'react'
import './App.css'
import CityInput from './components/CityInput'  // 追加

function App() {
  const [city, setCity] = useState('')
  
  // 検索処理（まだ空の関数）
  const handleSearch = (cityName) => {
    console.log('検索:', cityName)  // 動作確認用
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
```

**変更点の説明**:

- `import CityInput from './components/CityInput'`: CityInputコンポーネントをインポート
- `handleSearch` 関数: 検索時に実行される関数（今はコンソールに出力するだけ）
- `<CityInput ... />`: コンポーネントを配置し、必要なpropsを渡す
  - `city={city}`: 現在の都市名を渡す
  - `setCity={setCity}`: 都市名を更新する関数を渡す
  - `onSearch={handleSearch}`: 検索時に実行する関数を渡す

**確認方法**:
1. ブラウザで表示を確認（検索フォームが表示される）
2. 都市名を入力して検索ボタンをクリック（またはEnterキーを押す）
3. ブラウザのコンソール（F12キーで開く）に「検索: [入力した都市名]」が表示されることを確認

**注意**: この時点では、まだ実際の天気データは取得していません。次のステップからAPIを呼び出します。

---

---

### ステップ4: WeatherCardコンポーネントを作成

**対象ファイル**: `src/components/WeatherCard.jsx`（**新規作成**）

**目的**: 天気情報を表示するカードコンポーネントを作成します。

**何を作成するか**:
新しいファイル `src/components/WeatherCard.jsx` を作成し、天気データを表示するコンポーネントを記述します。

**作成するコード**:

```jsx
const WeatherCard = ({ weather, title }) => {
  // weather が null や undefined の場合は何も表示しない
  if (!weather) {
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
          <p>天気: {weather.weather[0].description}</p>
          <p>湿度: {weather.main.humidity}%</p>
          <p>風速: {weather.wind?.speed || 0} m/s</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
```

**コードの説明**:

1. **コンポーネントの定義**:
   ```jsx
   const WeatherCard = ({ weather, title }) => { ... }
   ```
   - `weather`: 天気データのオブジェクト（親コンポーネントから受け取る）
   - `title`: カードのタイトル（例: "今日の天気"、"明日の天気"）

2. **データがない場合の処理**:
   ```jsx
   if (!weather) {
     return null  // 何も表示しない
   }
   ```
   - データが `null` や `undefined` の場合は、何も表示しない

3. **天気アイコンのURL**:
   ```jsx
   const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
   ```
   - OpenWeatherMapのアイコンを使用
   - `weather.weather[0].icon` からアイコンIDを取得

4. **データの表示**:
   - `weather.main.temp`: 気温（`Math.round()`で整数に丸める）
   - `weather.weather[0].description`: 天気の説明（例: "快晴"）
   - `weather.main.humidity`: 湿度
   - `weather.wind?.speed`: 風速（`?.`はオプショナルチェーンで、`wind`が存在しない場合のエラーを防ぐ）

**データ構造の理解**:

天気データは以下のような構造です：
```javascript
{
  main: {
    temp: 25.5,        // 気温（摂氏）
    humidity: 65       // 湿度（%）
  },
  weather: [{          // 配列（通常は1つの要素）
    description: "快晴",  // 天気説明（日本語）
    icon: "01d"          // アイコンID
  }],
  wind: {
    speed: 3.2        // 風速（m/s）
  }
}
```

**ポイント**:
- まずはシンプルな表示のみ（CSSは後で追加）
- `console.log(weather)` で実際のデータ構造を確認しながら開発できる
- `weather.wind?.speed || 0`: 風速データがない場合は `0` を表示

**確認方法**:
- ファイルが正しく作成されていることを確認（まだ表示されません。次のステップで使用します）

---

---

### ステップ5: App.jsx に天気データのstateとWeatherCardを追加

**対象ファイル**: `src/App.jsx`（編集）

**目的**: 
- 今日の天気と明日の天気を保存するstateを追加する
- WeatherCardコンポーネントをインポートして表示する

**何を変更するか**:

1. **インポート文を追加**:
   ```jsx
   import WeatherCard from './components/WeatherCard'
   ```

2. **stateを追加**:
   ```jsx
   const [todayWeather, setTodayWeather] = useState(null)
   const [tomorrowWeather, setTomorrowWeather] = useState(null)
   ```

3. **JSXにWeatherCardコンポーネントを追加**:
   ```jsx
   <WeatherCard weather={todayWeather} title="今日の天気" />
   <WeatherCard weather={tomorrowWeather} title="明日の天気" />
   ```

**変更後のコード全体**:

```jsx
import { useState } from 'react'
import './App.css'
import CityInput from './components/CityInput'
import WeatherCard from './components/WeatherCard'  // 追加

function App() {
  const [city, setCity] = useState('')
  const [todayWeather, setTodayWeather] = useState(null)      // 追加
  const [tomorrowWeather, setTomorrowWeather] = useState(null)  // 追加
  
  const handleSearch = (cityName) => {
    console.log('検索:', cityName)
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
        
        {/* 天気情報を表示 */}
        <WeatherCard weather={todayWeather} title="今日の天気" />
        <WeatherCard weather={tomorrowWeather} title="明日の天気" />
      </main>
    </div>
  )
}

export default App
```

**変更点の説明**:

- `import WeatherCard from './components/WeatherCard'`: WeatherCardコンポーネントをインポート
- `todayWeather`: 今日の天気データを保存するstate（初期値は `null`）
- `tomorrowWeather`: 明日の天気データを保存するstate（初期値は `null`）
- `<WeatherCard weather={todayWeather} title="今日の天気" />`: 今日の天気を表示
- `<WeatherCard weather={tomorrowWeather} title="明日の天気" />`: 明日の天気を表示

**確認方法**:
- 現時点では `null` なので、WeatherCardは何も表示されないのが正常です
- 次のステップでAPIからデータを取得すると、ここに表示されます

---

---

### ステップ6: weatherApi.js の関数を確認（理解するだけ）

**対象ファイル**: `src/services/weatherApi.js`（**確認のみ・編集不要**）

**目的**: これから使用するAPI関数の使い方を理解します。

**使用する関数**:

1. **`getCurrentWeather(city)`** - 現在の天気を取得
   ```javascript
   // 使用例
   const data = await getCurrentWeather('Tokyo')
   // 戻り値: { name: 'Tokyo', main: {...}, weather: [...], wind: {...}, ... }
   ```
   - 引数: 都市名（文字列、例: "Tokyo", "東京"）
   - 戻り値: 現在の天気データのオブジェクト

2. **`getForecast(city)`** - 5日間の予報を取得
   ```javascript
   // 使用例
   const forecastData = await getForecast('Tokyo')
   // 戻り値: { city: {...}, list: [...] }
   // list: 3時間ごとの予報データの配列
   ```
   - 引数: 都市名（文字列）
   - 戻り値: 予報データのオブジェクト（`list` プロパティに3時間ごとの予報が入っている）

**重要ポイント**:

- **`async/await`**: どちらも `async` 関数なので、呼び出すときは `await` を使う必要がある
- **エラーハンドリング**: `try/catch` でエラーハンドリングが必要
- **ダミーデータ**: APIキーが設定されていない場合、自動的にダミーデータが使用される（コンソールに「📦 ダミーデータを使用しています」と表示される）

**予報データの構造**:
```javascript
{
  city: {
    name: 'Tokyo',
    country: 'JP'
  },
  list: [
    { dt: 1234567890, main: {...}, weather: [...], ... },  // 3時間後の予報
    { dt: 1234576800, main: {...}, weather: [...], ... },  // 6時間後の予報
    // ... 40個のアイテム（5日間分）
  ]
}
```

- `list[0]`: 現在時刻から3時間後の予報
- `list[8]`: 現在時刻から24時間後（8 × 3時間 = 24時間）の予報 = **明日の天気**

---

---

### ステップ7: App.jsx に今日の天気を取得する処理を追加

**対象ファイル**: `src/App.jsx`（編集）

**目的**: 検索時に今日の天気を取得して表示します。

**何を変更するか**:

1. **インポート文を追加**:
   ```jsx
   import { getCurrentWeather } from './services/weatherApi'
   ```

2. **handleSearch関数を変更**:
   - `async` キーワードを追加（非同期関数にする）
   - `getCurrentWeather` を呼び出して今日の天気を取得
   - 取得したデータを `setTodayWeather` でstateに保存

**変更後のコード**:

```jsx
import { useState } from 'react'
import './App.css'
import CityInput from './components/CityInput'
import WeatherCard from './components/WeatherCard'
import { getCurrentWeather } from './services/weatherApi'  // 追加

function App() {
  const [city, setCity] = useState('')
  const [todayWeather, setTodayWeather] = useState(null)
  const [tomorrowWeather, setTomorrowWeather] = useState(null)
  
  const handleSearch = async (cityName) => {  // async を追加
    try {
      // 今日の天気を取得
      const data = await getCurrentWeather(cityName)
      setTodayWeather(data)
      console.log('今日の天気:', data)  // データ構造の確認用
    } catch (error) {
      console.error('エラー:', error.message)
    }
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
        
        {/* 天気情報を表示 */}
        <WeatherCard weather={todayWeather} title="今日の天気" />
        <WeatherCard weather={tomorrowWeather} title="明日の天気" />
      </main>
    </div>
  )
}

export default App
```

**変更点の説明**:

1. **インポート**:
   ```jsx
   import { getCurrentWeather } from './services/weatherApi'
   ```
   - `getCurrentWeather` 関数をインポート

2. **async/await**:
   ```jsx
   const handleSearch = async (cityName) => { ... }
   ```
   - `async` を追加して、非同期処理を扱えるようにする

3. **API呼び出し**:
   ```jsx
   const data = await getCurrentWeather(cityName)
   ```
   - `await` でAPI呼び出しの完了を待つ
   - 取得したデータを `data` に保存

4. **state更新**:
   ```jsx
   setTodayWeather(data)
   ```
   - 取得したデータをstateに保存
   - stateが更新されると、`WeatherCard` コンポーネントが自動的に再レンダリングされる

5. **エラーハンドリング**:
   ```jsx
   try {
     // API呼び出し
   } catch (error) {
     console.error('エラー:', error.message)
   }
   ```
   - エラーが発生した場合、コンソールにエラーメッセージを表示

**確認方法**:
1. ブラウザで都市名を入力して検索ボタンをクリック
2. コンソールに「📦 ダミーデータを使用しています: [都市名]」と表示される
3. コンソールに「今日の天気: {...}」とデータが表示される
4. **今日の天気カード**にデータが表示される（気温、天気、湿度、風速など）
5. 明日の天気カードはまだ何も表示されない（次のステップで実装）

---

---

### ステップ8: 予報データから明日の天気を取得

**対象ファイル**: `src/App.jsx`（編集）

**目的**: 予報データを取得し、その中から明日の天気を抽出して表示します。

**何を変更するか**:

1. **インポート文を追加**:
   ```jsx
   import { getCurrentWeather, getForecast } from './services/weatherApi'
   ```
   - `getForecast` を追加

2. **handleSearch関数に予報取得処理を追加**:
   - `getForecast` を呼び出して予報データを取得
   - `forecastData.list` から明日の天気（24時間後）を抽出
   - 取得したデータを `setTomorrowWeather` でstateに保存

**変更後のコード**:

```jsx
import { useState } from 'react'
import './App.css'
import CityInput from './components/CityInput'
import WeatherCard from './components/WeatherCard'
import { getCurrentWeather, getForecast } from './services/weatherApi'  // getForecast を追加

function App() {
  const [city, setCity] = useState('')
  const [todayWeather, setTodayWeather] = useState(null)
  const [tomorrowWeather, setTomorrowWeather] = useState(null)
  
  const handleSearch = async (cityName) => {
    try {
      // 今日の天気を取得
      const data = await getCurrentWeather(cityName)
      setTodayWeather(data)
      
      // 予報データを取得
      const forecastData = await getForecast(cityName)
      console.log('予報データ:', forecastData)  // データ構造の確認用
      
      // 予報データから明日の天気を取得
      // list 配列から24時間後（8番目のアイテム = 8 * 3時間 = 24時間後）を取得
      if (forecastData.list && forecastData.list.length > 8) {
        const tomorrowData = forecastData.list[8]
        setTomorrowWeather(tomorrowData)
      } else if (forecastData.list && forecastData.list.length > 0) {
        // 8個未満の場合は最後のアイテムを使用
        const tomorrowData = forecastData.list[forecastData.list.length - 1]
        setTomorrowWeather(tomorrowData)
      }
    } catch (error) {
      console.error('エラー:', error.message)
    }
  }
  
  return (
    // ... (既存のコードと同じ)
  )
}
```

**変更点の説明**:

1. **getForecastのインポート**:
   ```jsx
   import { getCurrentWeather, getForecast } from './services/weatherApi'
   ```

2. **予報データの取得**:
   ```jsx
   const forecastData = await getForecast(cityName)
   ```
   - 5日間の予報データを取得
   - `forecastData.list` に3時間ごとの予報が入っている

3. **明日の天気の抽出**:
   ```jsx
   if (forecastData.list && forecastData.list.length > 8) {
     const tomorrowData = forecastData.list[8]
     setTomorrowWeather(tomorrowData)
   }
   ```
   - `list[8]` は24時間後（8 × 3時間 = 24時間）の予報 = **明日の天気**
   - `list.length > 8` をチェックして、データが十分にあることを確認

4. **フォールバック処理**:
   ```jsx
   else if (forecastData.list && forecastData.list.length > 0) {
     const tomorrowData = forecastData.list[forecastData.list.length - 1]
     setTomorrowWeather(tomorrowData)
   }
   ```
   - データが8個未満の場合は、最後のアイテムを使用（念のための処理）

**予報データの構造**:
```javascript
{
  city: { name: 'Tokyo', country: 'JP' },
  list: [
    list[0],  // 3時間後の予報
    list[1],  // 6時間後の予報
    list[2],  // 9時間後の予報
    ...
    list[8],  // 24時間後の予報 = 明日の天気 ← これを使う
    ...
  ]
}
```

**確認方法**:
1. ブラウザで都市名を入力して検索
2. コンソールに「予報データ: {...}」と表示される
3. **今日の天気**と**明日の天気**の両方が表示されることを確認

**トラブルシューティング**:
- 明日の天気が表示されない場合は、コンソールで `forecastData.list` の内容を確認
- `console.log(forecastData.list)` を追加して、配列の構造を確認してみる

---

---

### ステップ9: ローディング状態とエラー状態を追加

**対象ファイル**: `src/App.jsx`（編集）

**目的**: 
- データ取得中の表示（ローディング）を追加する
- エラーメッセージを表示する機能を追加する
- ユーザーに分かりやすいフィードバックを提供する

**何を変更するか**:

1. **stateを追加**:
   ```jsx
   const [loading, setLoading] = useState(false)  // ローディング状態
   const [error, setError] = useState(null)       // エラーメッセージ
   ```

2. **handleSearch関数を変更**:
   - 検索開始時に `setLoading(true)` でローディング開始
   - 検索開始時に `setError(null)` でエラーをリセット
   - 検索開始時に以前のデータをクリア
   - エラーが発生したら `setError(error.message)` でエラーメッセージを設定
   - `finally` ブロックで `setLoading(false)` でローディング終了（エラーが発生しても実行される）

3. **JSXに条件付きレンダリングを追加**:
   - ローディング中は「読み込み中...」を表示
   - エラーがある場合はエラーメッセージを表示
   - ローディング中は天気情報を非表示

**変更後のコード**:

```jsx
import { useState } from 'react'
import './App.css'
import CityInput from './components/CityInput'
import WeatherCard from './components/WeatherCard'
import { getCurrentWeather, getForecast } from './services/weatherApi'

function App() {
  const [city, setCity] = useState('')
  const [todayWeather, setTodayWeather] = useState(null)
  const [tomorrowWeather, setTomorrowWeather] = useState(null)
  const [loading, setLoading] = useState(false)  // 追加
  const [error, setError] = useState(null)       // 追加
  
  const handleSearch = async (cityName) => {
    setLoading(true)   // ローディング開始
    setError(null)     // エラーをリセット
    setTodayWeather(null)      // 以前のデータをクリア
    setTomorrowWeather(null)   // 以前のデータをクリア
    
    try {
      const data = await getCurrentWeather(cityName)
      setTodayWeather(data)
      
      const forecastData = await getForecast(cityName)
      if (forecastData.list && forecastData.list.length > 8) {
        const tomorrowData = forecastData.list[8]
        setTomorrowWeather(tomorrowData)
      } else if (forecastData.list && forecastData.list.length > 0) {
        const tomorrowData = forecastData.list[forecastData.list.length - 1]
        setTomorrowWeather(tomorrowData)
      }
    } catch (error) {
      setError(error.message)  // エラーメッセージを設定
      console.error('エラー:', error.message)
    } finally {
      setLoading(false)  // ローディング終了（エラーが発生しても実行される）
    }
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
        
        {/* ローディング表示 */}
        {loading && <p>読み込み中...</p>}
        
        {/* エラー表示 */}
        {error && <p style={{ color: 'red' }}>エラー: {error}</p>}
        
        {/* 天気情報を表示 */}
        {!loading && (
          <>
            <WeatherCard weather={todayWeather} title="今日の天気" />
            <WeatherCard weather={tomorrowWeather} title="明日の天気" />
          </>
        )}
      </main>
    </div>
  )
}

export default App
```

**変更点の説明**:

1. **ローディングstate**:
   ```jsx
   const [loading, setLoading] = useState(false)
   ```
   - `true`: データ取得中
   - `false`: データ取得完了

2. **エラーstate**:
   ```jsx
   const [error, setError] = useState(null)
   ```
   - `null`: エラーなし
   - エラー時: エラーメッセージ（文字列）

3. **検索開始時の処理**:
   ```jsx
   setLoading(true)    // ローディング開始
   setError(null)      // エラーをリセット
   setTodayWeather(null)      // 以前のデータをクリア
   setTomorrowWeather(null)   // 以前のデータをクリア
   ```
   - 新しい検索の前に、前回のデータやエラーをクリア

4. **finallyブロック**:
   ```jsx
   finally {
     setLoading(false)  // エラーが発生しても必ず実行される
   }
   ```
   - `try` が成功しても `catch` でエラーが発生しても、必ず実行される
   - これにより、ローディング状態が必ず終了する

5. **条件付きレンダリング**:
   ```jsx
   {loading && <p>読み込み中...</p>}  // loading が true の時だけ表示
   {error && <p>エラー: {error}</p>}   // error が null でない時だけ表示
   {!loading && ( ... )}               // loading が false の時だけ表示
   ```
   - `{条件 && <要素>}`: 条件が `true` の時だけ要素を表示
   - `{!loading && ( ... )}`: ローディング中は天気情報を非表示

**確認方法**:
1. 検索ボタンをクリックすると、「読み込み中...」が表示される
2. データ取得が完了すると、「読み込み中...」が消えて天気情報が表示される
3. エラーが発生した場合（例: 存在しない都市名）、エラーメッセージが表示される

---

---

### ステップ10: 動作確認とデバッグ

**対象ファイル**: 全て（確認のみ）

**目的**: 実装が正しく動作するか確認し、問題があれば修正します。

**確認項目**:

1. **CityInputコンポーネント**
   - ✅ テキスト入力ができる
   - ✅ 検索ボタンをクリックすると検索が実行される
   - ✅ Enterキーで検索できる

2. **API呼び出し**
   - ✅ コンソールに「📦 ダミーデータを使用しています: [都市名]」が表示される
   - ✅ エラーが発生しない

3. **WeatherCardコンポーネント**
   - ✅ 今日の天気が表示される（気温、天気、湿度、風速など）
   - ✅ 明日の天気が表示される
   - ✅ データがない場合は何も表示されない

4. **ローディングとエラー**
   - ✅ 検索中に「読み込み中...」が表示される
   - ✅ データ取得完了後、「読み込み中...」が消える
   - ✅ エラー時にエラーメッセージが表示される

**確認手順**:

1. **ブラウザでアプリを開く**:
   ```bash
   npm run dev
   ```
   - ブラウザで `http://localhost:5173` を開く

2. **検索機能の確認**:
   - 都市名（例: "Tokyo", "東京"）を入力
   - 検索ボタンをクリック（またはEnterキーを押す）
   - 「読み込み中...」が表示される
   - 数秒後、今日と明日の天気が表示される

3. **コンソールの確認**:
   - ブラウザの開発者ツール（F12キー）を開く
   - Consoleタブを確認
   - 「📦 ダミーデータを使用しています」が表示される
   - 「今日の天気: {...}」とデータが表示される
   - 「予報データ: {...}」とデータが表示される

**デバッグのヒント**:

- **コンポーネントが表示されない**:
  - インポート文が正しいか確認
  - ファイル名の大文字小文字を確認
  - コンソールにエラーがないか確認

- **データが取得できない**:
  - コンソールにエラーメッセージが表示されていないか確認
  - `console.log()` を追加して、実際のデータ構造を確認
  ```jsx
  console.log('予報データ:', forecastData)
  console.log('list:', forecastData.list)
  ```

- **stateが更新されない**:
  - React DevToolsを使用してstateの変化を確認
  - `console.log()` でstateの値を確認
  ```jsx
  console.log('todayWeather:', todayWeather)
  ```

- **エラーが発生する**:
  - コンソールのエラーメッセージを確認
  - エラーメッセージに表示されているファイル名と行番号を確認
  - 該当箇所のコードを見直す

---

## ✅ 完成！

基本的な機能の実装が完了しました！

**実装した機能**:
- ✅ 都市名入力フォーム
- ✅ 今日の天気の取得と表示
- ✅ 明日の天気の取得と表示
- ✅ ローディング状態の表示
- ✅ エラーハンドリング

---

## 🎨 次のステップ（CSSの追加 - 任意）

基本的な機能が完成したら、CSSファイルにスタイルを追加して見た目を整えましょう。

**スタイルを追加するファイル**:
- `src/components/CityInput.css` - 検索フォームのスタイル
- `src/components/WeatherCard.css` - 天気カードのスタイル
- `src/App.css` - アプリ全体のスタイル（必要に応じて調整）

**ヒント**:
- 既存のCSSファイル（`CityInput.css`, `WeatherCard.css`）には、完成例のスタイルが既に記載されています（ただし、まだインポートされていない）
- 必要に応じて、これらのファイルを確認して、自分でスタイルを書いてみてください

---

## ❓ よくある質問

### Q: コンポーネントが表示されない

**A: 以下を確認してください**:
- インポート文が正しいか確認（`import CityInput from './components/CityInput'`）
- コンポーネント名の大文字小文字を確認（`CityInput` と `cityinput` は違う）
- ファイル名が正しいか確認（`CityInput.jsx`）
- コンソールにエラーがないか確認（F12キーで開発者ツールを開く）
- JSX内でコンポーネントが正しく使用されているか確認（`<CityInput ... />`）

### Q: APIからデータが取得できない

**A: 以下を確認してください**:
- コンソールにエラーメッセージが表示されていないか確認
- `console.log()` で実際のデータ構造を確認
  ```jsx
  console.log('取得したデータ:', data)
  ```
- ネットワークタブでAPIリクエストが送信されているか確認（開発者ツール > Networkタブ）
- `handleSearch` 関数が正しく呼ばれているか確認（`console.log('検索:', cityName)` を追加）

### Q: 明日の天気が正しく表示されない

**A: 以下を確認してください**:
- `forecastData.list` の内容を `console.log()` で確認
  ```jsx
  console.log('list:', forecastData.list)
  console.log('list[8]:', forecastData.list[8])
  ```
- 配列のインデックスが正しいか確認（`list[8]` が存在するか）
- `list.length` を確認して、データが十分にあるか確認
- タイムスタンプを使った方法を試してみる（ステップ8のオプション方法）

### Q: ローディングが終わらない

**A: 以下を確認してください**:
- `finally` ブロックで `setLoading(false)` が実行されているか確認
- エラーが発生していないか確認（コンソールを確認）
- `async/await` が正しく使われているか確認

### Q: エラーメッセージが表示されない

**A: 以下を確認してください**:
- `catch` ブロックで `setError(error.message)` が実行されているか確認
- JSXで `{error && <p>エラー: {error}</p>}` が正しく書かれているか確認

---

---

## 📋 完成後のコード構造（参考）

完成後の各ファイルの全体像です。実装時の参考にしてください。

### `src/App.jsx` の完成形

```jsx
import { useState } from 'react'
import './App.css'
import CityInput from './components/CityInput'
import WeatherCard from './components/WeatherCard'
import { getCurrentWeather, getForecast } from './services/weatherApi'

function App() {
  const [city, setCity] = useState('')
  const [todayWeather, setTodayWeather] = useState(null)
  const [tomorrowWeather, setTomorrowWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const handleSearch = async (cityName) => {
    setLoading(true)
    setError(null)
    setTodayWeather(null)
    setTomorrowWeather(null)
    
    try {
      const data = await getCurrentWeather(cityName)
      setTodayWeather(data)
      
      const forecastData = await getForecast(cityName)
      if (forecastData.list && forecastData.list.length > 8) {
        setTomorrowWeather(forecastData.list[8])
      } else if (forecastData.list && forecastData.list.length > 0) {
        setTomorrowWeather(forecastData.list[forecastData.list.length - 1])
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>天気予報アプリ</h1>
      </header>
      <main>
        <CityInput city={city} setCity={setCity} onSearch={handleSearch} />
        {loading && <p>読み込み中...</p>}
        {error && <p style={{ color: 'red' }}>エラー: {error}</p>}
        {!loading && (
          <>
            <WeatherCard weather={todayWeather} title="今日の天気" />
            <WeatherCard weather={tomorrowWeather} title="明日の天気" />
          </>
        )}
      </main>
    </div>
  )
}

export default App
```

### `src/components/CityInput.jsx` の完成形

```jsx
const CityInput = ({ city, setCity, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.trim()) {
      onSearch(city.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="都市名を入力してください（例: Tokyo, 東京）"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">検索</button>
    </form>
  )
}

export default CityInput
```

### `src/components/WeatherCard.jsx` の完成形

```jsx
const WeatherCard = ({ weather, title }) => {
  if (!weather) {
    return null
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <img src={iconUrl} alt={weather.weather[0].description} />
        <div>
          <p>気温: {Math.round(weather.main.temp)}°C</p>
          <p>天気: {weather.weather[0].description}</p>
          <p>湿度: {weather.main.humidity}%</p>
          <p>風速: {weather.wind?.speed || 0} m/s</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
```

---

## 🎉 まとめ

この手順書に従って実装することで、以下のことを学べます：

- ✅ Reactの基本的な使い方（useState, props, コンポーネント）
- ✅ 非同期処理（async/await）
- ✅ APIとの通信
- ✅ エラーハンドリング
- ✅ 条件付きレンダリング
- ✅ state管理

**一つ一つコードを理解しながら進めてください。分からないことがあれば、各ステップの説明を読み返してください。** 🚀

頑張ってください！
