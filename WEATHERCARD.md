# WeatherCard.jsxで学んだことや注意事項をまとめるメモ書きのmd
WeatherCard.jsxは天気情報を表示するカードコンポーネント

## 7行目
OpenWeatherMapのアイコンを使用
`weather.weather[0].icon` からアイコンIDを取得

## データの表示
- `weather.main.temp`: 気温（`Math.round()`で整数に丸める）
- `weather.weather[0].description`: 天気の説明（例: "快晴"）
- `weather.main.humidity`: 湿度
- `weather.wind?.speed`: 風速（`?.`はオプショナルチェーンで、`wind`が存在しない場合のエラーを防ぐ）

### オプショナルチェーンとは
オプショナルチェーンとはオブジェクトのプロパティに安全にアクセスするための構文。

通常であれば `weather.wind.speed`のようになるがwindがundefinedやnullの場合エラーになる。
ただオプショナルチェーンを使用して `weather.wind?.speed`にしてundefinedやnullの場合はエラーにならず単純にundefinedを返す。

#### || 0 の役割
||は論理OR演算子で左側がfalsyな値の場合のみ右側を返します。
`weather.wind?.speed || 0`
上記は
1- weather.wind?.speed を評価してwindが存在すればspeedの値を返す。windが存在しないならundefinedを返す。
2- 左側がfalsyなら右側を返す。例えば2であればそのまま、ただundefinedであれば０を返す。