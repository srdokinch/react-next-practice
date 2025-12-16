# 天気予報アプリ - React練習プロジェクト

Reactを使用した天気予報アプリケーションです。OpenWeatherMap APIを使用して、指定した都市の今日の天気と明日の天気を表示します。

## 機能

- 都市名を入力して天気情報を検索
- 今日の天気情報を表示（気温、天気、湿度、風速など）
- 明日の天気予報を表示

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

#### ダミーデータを使用する場合（推奨：開発時）

APIキーの設定は不要です。`.env`ファイルを作成しなくても、自動的にダミーデータが使用されます。

または、明示的にダミーデータを使用したい場合は：

```bash
cp .env.example .env
```

`.env`ファイルに以下を設定：

```
VITE_USE_MOCK_DATA=true
```

#### 実際のAPIを使用する場合

`.env.example`をコピーして`.env`ファイルを作成し、OpenWeatherMapのAPIキーを設定してください。

```bash
cp .env.example .env
```

`.env`ファイルを開いて、以下を設定します：

```
VITE_API_KEY=your_api_key_here
```

**APIキーの取得方法：**

1. [OpenWeatherMap](https://openweathermap.org/api)にアクセス
2. 無料アカウントを作成
3. API KeysページでAPIキーを取得
4. `.env`ファイルに設定

**注意：** APIキーが設定されていない場合、または`VITE_USE_MOCK_DATA=true`の場合、ダミーデータが自動的に使用されます。

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開いてください。

## プロジェクト構成

```
src/
├── components/
│   ├── CityInput.jsx       # 都市名入力コンポーネント
│   ├── CityInput.css
│   ├── WeatherCard.jsx     # 天気情報表示カード
│   └── WeatherCard.css
├── services/
│   └── weatherApi.js       # 天気APIとの通信処理
├── App.jsx                 # メインアプリコンポーネント
├── App.css
├── main.jsx                # エントリーポイント
└── index.css
```

## 使用技術

- React 18
- Vite
- Axios
- OpenWeatherMap API

## ビルド

本番用ビルド：

```bash
npm run build
```

ビルド結果のプレビュー：

```bash
npm run preview
```
