# 天気予報アプリ - プロジェクト構成

## 必要なファイル構成

```
react-next-practice/
├── package.json                 # 依存関係とスクリプト
├── .env                         # 環境変数（APIキー用）
├── .env.example                 # 環境変数のテンプレート
├── .gitignore                   # Git除外設定
├── README.md                    # プロジェクト説明
├── public/
│   └── index.html              # HTMLエントリーポイント
└── src/
    ├── index.js / index.jsx    # Reactエントリーポイント
    ├── App.jsx                 # メインアプリコンポーネント
    ├── App.css                 # メインスタイル
    ├── components/
    │   ├── WeatherCard.jsx     # 天気情報を表示するカードコンポーネント
    │   └── CityInput.jsx       # 都市名入力コンポーネント
    ├── services/
    │   └── weatherApi.js       # 天気APIとの通信を処理
    └── utils/
        └── constants.js        # 定数（API URLなど）
```

## 必要な依存関係（package.json）

### 必須パッケージ
- **react**: React本体
- **react-dom**: React DOMレンダリング
- **axios**: HTTPリクエスト用（またはfetch API）

### 開発用パッケージ（Viteを使用する場合）
- **vite**: ビルドツール
- **@vitejs/plugin-react**: ViteのReactプラグイン

### 開発用パッケージ（Create React Appを使用する場合）
- **react-scripts**: Create React Appのスクリプト

## 主な機能

1. **都市名入力**: ユーザーが都市名を入力
2. **今日の天気**: 現在の天気情報を表示
3. **明日の天気**: 翌日の天気予報を表示
4. **エラーハンドリング**: APIエラーや無効な都市名の処理

## 使用するAPI

### OpenWeatherMap API（推奨）
- URL: `https://api.openweathermap.org/data/2.5/weather` (現在の天気)
- URL: `https://api.openweathermap.org/data/2.5/forecast` (5日間予報)
- 無料プラン: 1分間に60リクエスト、1日に1,000,000リクエスト
- 登録: https://openweathermap.org/api

### 代替API
- WeatherAPI.com（月100万リクエストまで無料）
- Weatherbit（無料プランあり）

## 実装する機能

### WeatherCard コンポーネント
- 気温、天気説明、アイコン、湿度、風速などを表示

### CityInput コンポーネント
- 入力フィールドと検索ボタン

### weatherApi.js
- `getCurrentWeather(city)` - 現在の天気を取得
- `getForecast(city)` - 予報を取得
- APIキーの管理

## 環境変数の設定

`.env`ファイルに以下を設定：
```
VITE_API_KEY=your_api_key_here
VITE_API_URL=https://api.openweathermap.org/data/2.5
```