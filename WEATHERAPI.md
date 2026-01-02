# weatherApi.jsで学んだことや注意事項をまとめるメモ書きのmd

## getMockCurrentWeather
モックの今の天気を取得する関数。cityを引数として都市名を受け取る。

### `return new Promise((resolve) => {`
new Promise(...)でPromiseオブジェクトを作成。
new Promiseはjsで非同期処理を扱うためのPromiseオブジェクトを作成するコンストラクタらしい。

#### Promise と new Promise の違い
- **`Promise`** = Promiseクラス（設計図）そのもの
- **`new Promise()`** = Promiseクラスからインスタンス（実物）を作成

`Promise`クラスには静的メソッドもあります：
- `Promise.resolve(value)` - 既に解決済みのPromiseを作成
- `Promise.reject(reason)` - 既に拒否されたPromiseを作成
- `Promise.all([...])` - 複数のPromiseを並行実行し、すべて成功したら結果を返す

基本的な構造は以下の通り：
```
new Promise((resolve, reject) => {
  // 非同期処理を実行
  // 成功したら: resolve(結果の値)
  // 失敗したら: reject(エラー)
})
```

