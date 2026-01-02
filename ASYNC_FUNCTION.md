# 非同期処理について
今回のAPIの勉強で非同期処理がたくさん出てきてよくわからないので、ここに勉強したことをまとめるmd

## Promise
promiseは非同期処理を扱うためのオブジェクト。
簡単にいうと「今は結果がまだわからないけど、いつか近い将来に結果を返すと」という約束（Promise）のオブジェクトらしい。
最近だとAPIからデータを取得したり大きな画像をロードしたり複雑な計算をする時に使う。
これらの処理は時間がかかるので、その間もUIを固まらせずに他の処理を続けられるようにPromiseを使って非同期で処理をしている。

### Promiseの使い方
例としてAPIからデータを取得する場合のコード
このようにすっきりするし `fetch関数自体がPromiseを返す` のでとても使いやすいらしい。
```
function fetchUserData(userId) {
  return fetch(`https://api.example.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
}

fetchUserData(123)
  .then(userData => {
    console.log('ユーザーデータ取得成功:', userData);
  })
  .catch(error => {
    console.error('エラー発生:', error);
  });
```

#### 「fetchはPromiseを返す」とは？

##### 普通の関数が値を返す場合

```javascript
// 普通の関数（同期処理）
function add(a, b) {
  return a + b;  // すぐに結果を返す
}

const result = add(2, 3);
console.log(result);  // 5 （すぐに表示される）
```

- 関数を呼び出すと、**すぐに結果が返ってくる**
- `result`には`5`という数値が入る
- 処理は一瞬で終わる

##### fetchがPromiseを返す場合

```javascript
// fetch関数（非同期処理）
const promise = fetch('https://api.example.com/users/123');
console.log(promise);  // Promise { <pending> } （まだ結果はない）
```

- `fetch()`を呼び出すと、**すぐにPromiseオブジェクトが返ってくる**
- でも、**APIからのデータはまだ返ってきていない**（時間がかかる）
- Promiseオブジェクトは「結果が来たら教えてね」という**約束**を表している

##### なぜPromiseを返すのか？

API呼び出しは時間がかかるから：

```
普通の関数:
  関数を呼ぶ → すぐ結果が返る → 次の処理へ

fetch():
  関数を呼ぶ → Promiseオブジェクトを返す（まだデータはない）
  ↓
  バックグラウンドでAPIにリクエスト送信
  ↓
  時間が経って...
  ↓
  データが返ってきたら → Promiseが「成功」になる → .then()が実行される
```

##### 具体例で理解する

```javascript
// 1. fetchを呼ぶ
const promise = fetch('https://api.example.com/users/123');
// この時点では、promiseにはPromiseオブジェクトが入っているだけ
// データはまだ来ていない！

// 2. Promiseオブジェクトには.then()メソッドがある
promise.then(response => {
  // データが返ってきたら、ここが実行される
  console.log('データが来た！', response);
});

// 3. fetchの呼び出し直後は、.then()の中は実行されていない
console.log('これは先に実行される');  // ← これが先に表示される
```

##### まとめ

- **「fetchはPromiseを返す」** = fetch()を呼ぶと、すぐにPromiseオブジェクトが返ってくる
- **Promiseオブジェクト** = 「まだ結果はないけど、結果が来たら教えてね」という約束
- **.then()** = 結果が来たときに実行される処理を登録するメソッド
- **非同期処理** = 時間がかかる処理を、待たずに次の処理を続けられる仕組み


----
ちなみにめちゃ難しくて理解に時間かかるので、まずは先に進もうということにしました。
なのでpromiseは「あー聞いたことあるよ」くらいだし、async/awaitはまだ「何それ美味しいの？」状態。
