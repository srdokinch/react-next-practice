App.jsxで学んだことや注意事項をまとめるメモ書きのmd

## 18行目からのコンポーネントレンダリングについて
`<CityInput` でコンポーネントをレンダリング。
`onSearch={handleSearch}` で検索処理を行う関数を渡している。

## 全体の流れ
1- ユーザーが `CityInput` コンポーネントの入力フィールドに都市名を入力する
2- 入力内容がリアルタイムで`city`ステートに反映される
3- 検索ボタンをクリックすると`handleSearch`関数が呼び出され、現在の都市名が渡される

この構造により、Appコンポーネントがステートを管理し`CityInput`コンポーネントがUIの表示とユーザー操作を担当する役割分担になっている。

## IMPLEMENTATIONのステップ5で追加した部分
4行目で必要なコンポーネントのインポート
8行目と9行目で今日の天気データを保存するstateと明日の天気データを保存するstateを初期値`null`でセット。

`<WeatherCard weather={todayWeather} title="今日の天気" />`でWeatherCardコンポーネントに今日の天気を渡し表示する
`<WeatherCard weather={tomorrowWeather} title="明日の天気" />`で明日の天気を表示