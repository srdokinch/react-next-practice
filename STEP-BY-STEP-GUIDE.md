# ランダム名言アプリ作成手順書

この手順書に従って、API接続を主にしたシンプルなランダム名言アプリを作成しましょう。

## 📚 学習内容

- React Hooks（useState, useEffect）
- fetch APIを使ったAPI接続
- 非同期処理（async/await）
- ローディング状態の管理
- エラーハンドリング

---

## 🎯 使用するAPI

**Quote API** - https://api.quotable.io/
- 無料・APIキー不要
- エンドポイント: `https://api.quotable.io/random`
- レスポンス例:
```json
{
  "_id": "string",
  "content": "The quote text",
  "author": "Author Name",
  "tags": ["tag1", "tag2"],
  "authorSlug": "author-name",
  "length": 123,
  "dateAdded": "string",
  "dateModified": "string"
}
```

---

## 📋 手順

### ステップ1: プロジェクトのセットアップ

1. **既存ファイルのクリーンアップ（必要に応じて）:**

既存のプロジェクトファイル（`.vite/`など）がある場合、Next.jsのセットアップで競合が発生する可能性があります。以下のコマンドで`.vite/`ディレクトリを削除してください：

```bash
rm -rf .vite
```

**注意:** このディレクトリが別のプロジェクトで使用中の場合は削除しないでください。

2. **Next.jsプロジェクトの初期化（必須）:**

現在のディレクトリにNext.jsプロジェクトをセットアップします。

**重要:** `README.md`と`STEP-BY-STEP-GUIDE.md`などの既存ファイルがある場合は、一時的に退避してからセットアップする必要があります。

以下の手順で進めてください：

**手順1: Next.jsプロジェクトのセットアップ**

```bash
npx create-next-app@latest . --eslint --app --no-src-dir --import-alias "@/*" --js --no-typescript --use-npm
```

このコマンドは以下の設定でNext.jsプロジェクトをセットアップします：
- JavaScript（TypeScriptなし）
- ESLint有効
- App Router使用
- `src/`ディレクトリなし
- npm使用

セットアップが完了すると、`package.json`ファイルとNext.jsの必要なファイルが作成されます。

1. **開発サーバーの起動:**

プロジェクトのセットアップが完了したら、開発サーバーを起動します：

```bash
npm run dev
```

ブラウザで `http://localhost:3000` が開くことを確認してください。

**注意:** `package.json`が存在しない場合は、まず上記のステップ1を実行してください。

---

### ステップ2: メインページコンポーネントの作成

このステップでは、名言を表示するためのメインコンポーネントを作成します。

1. **ファイルの場所と名前:**
   - ファイルパス: `app/page.jsx`
   - このファイルは既に存在しているので、開いて編集してください

2. **コンポーネントの基本構造:**

まず、Reactの必要な機能をインポートします：

```javascript
'use client';

import { useState } from 'react';
```

- `'use client'` は、このコンポーネントがクライアントサイド（ブラウザ）で動作することを示します（`useState`を使うために必要）
- `useState` は、コンポーネントの状態（データ）を管理するためのReact Hooksです

3. **必要なstate（状態）の定義:**

コンポーネント内で以下のstateを定義します：

```javascript
export default function Home() {
  // 名言のテキストを保存するstate（初期値は空文字列）
  const [quote, setQuote] = useState('');
  
  // 著者名を保存するstate（初期値は空文字列）
  const [author, setAuthor] = useState('');
  
  // ローディング状態を保存するstate（初期値はfalse）
  const [loading, setLoading] = useState(false);
  
  // エラーメッセージを保存するstate（初期値はnull）
  const [error, setError] = useState(null);

  return (
    // ここにJSXを書く
  );
}
```

**stateの説明:**
- `useState('初期値')` は、状態変数とその更新関数を返します
- `[変数名, set変数名]` の形式で分割代入を使います
- 例：`const [quote, setQuote] = useState('')` は、`quote`という状態変数と、それを更新する`setQuote`関数を作成します

4. **JSXの構造（画面に表示する内容）:**

`return`の後に、以下のような構造でJSXを書きます：

```javascript
return (
  <div>
    <h1>ランダム名言アプリ</h1>
    
    {/* エラーメッセージを表示（エラーがある場合のみ） */}
    {error && <p style={{color: 'red'}}>エラー: {error}</p>}
    
    {/* ローディング中の表示 */}
    {loading && <p>読み込み中...</p>}
    
    {/* 名言を表示するエリア */}
    <div>
      <p>{quote}</p>
    </div>
    
    {/* 著者名を表示するエリア */}
    <div>
      <p>— {author}</p>
    </div>
    
    {/* 「新しい名言を取得」ボタン */}
    <button onClick={() => {}}>
      新しい名言を取得
    </button>
  </div>
);
```

**JSXの説明:**
- `{ }` の中にはJavaScriptの式を書けます
- `{error && <p>...</p>}` は、`error`が`null`でない場合のみ`<p>`タグを表示します（条件付きレンダリング）
- `{quote}` は、`quote`変数の値を表示します
- `onClick={() => {}}` は、ボタンをクリックした時の処理を定義します（今は空なので、後で実装します）

5. **完成形の例（参考用）:**

ここまでの内容をまとめると、以下のようになります：

```javascript
'use client';

import { useState } from 'react';

export default function Home() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div>
      <h1>ランダム名言アプリ</h1>
      
      {error && <p style={{color: 'red'}}>エラー: {error}</p>}
      {loading && <p>読み込み中...</p>}
      
      <div>
        <p>{quote}</p>
      </div>
      
      <div>
        <p>— {author}</p>
      </div>
      
      <button onClick={() => {}}>
        新しい名言を取得
      </button>
    </div>
  );
}
```

**注意:** この時点では、ボタンをクリックしても何も起こりません。次のステップ3でAPI接続機能を実装します。

---

### ステップ3: API接続機能の実装

このステップでは、外部のAPIから名言を取得する機能を実装します。

1. **必要なインポートを追加:**

まず、`useEffect`も必要になるので、インポートを追加します：

```javascript
'use client';

import { useState, useEffect } from 'react';
```

- `useEffect`は、コンポーネントの読み込み時や更新時に処理を実行するためのReact Hooksです（ステップ4で使用）

2. **名言を取得する関数を作成:**

コンポーネント内（`return`の前）に、APIから名言を取得する関数を作成します。

**関数の基本構造:**

```javascript
export default function Home() {
  // stateの定義（ステップ2で作成したもの）
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 名言を取得する関数（ここに追加）
  const fetchQuote = async () => {
    // ここにAPI接続のコードを書く
  };

  return (
    // JSXの内容
  );
}
```

**`async/await`とは？**

- `async`：この関数が非同期処理（時間がかかる処理）を含むことを示します
- `await`：非同期処理の完了を待つことを示します
- API接続は時間がかかるので、`async/await`を使います

**関数の実装（段階的に）:**

**ステップ3-1: ローディング状態をtrueに設定**

```javascript
const fetchQuote = async () => {
  // ローディングを開始
  setLoading(true);
};
```

- APIリクエストを開始する前に、ローディング状態を`true`にします
- これで「読み込み中...」が画面に表示されます

**ステップ3-2: エラー状態をリセット**

```javascript
const fetchQuote = async () => {
  setLoading(true);
  // 前回のエラーをクリア
  setError(null);
};
```

- 新しいリクエストを開始する時に、前回のエラーメッセージをクリアします

**ステップ3-3: APIにリクエストを送る**

```javascript
const fetchQuote = async () => {
  setLoading(true);
  setError(null);
  
  // APIからデータを取得
  const response = await fetch('https://api.quotable.io/random');
};
```

**`fetch`の説明:**
- `fetch('URL')`：指定したURLにHTTPリクエストを送ります
- `await`：リクエストの完了を待ちます
- `response`：サーバーからの応答が入ります

**ステップ3-4: レスポンスをJSON形式に変換**

```javascript
const fetchQuote = async () => {
  setLoading(true);
  setError(null);
  
  const response = await fetch('https://api.quotable.io/random');
  // レスポンスをJSON形式（JavaScriptオブジェクト）に変換
  const data = await response.json();
};
```

**`.json()`の説明:**
- APIからのレスポンスは通常、JSON形式（文字列）です
- `.json()`メソッドで、それをJavaScriptのオブジェクトに変換します
- `await`を使って変換の完了を待ちます

**ステップ3-5: 取得したデータをstateに保存**

```javascript
const fetchQuote = async () => {
  setLoading(true);
  setError(null);
  
  const response = await fetch('https://api.quotable.io/random');
  const data = await response.json();
  
  // 取得したデータをstateに保存
  setQuote(data.content);  // 名言のテキスト
  setAuthor(data.author);  // 著者名
  
  // ローディングを終了
  setLoading(false);
};
```

**データの構造:**
- APIから返ってくるデータは以下のような形です：
```javascript
{
  "content": "名言のテキスト",
  "author": "著者名",
  // その他のデータ...
}
```
- `data.content`で名言のテキスト、`data.author`で著者名にアクセスできます

3. **エラーハンドリング（エラー処理）の実装:**

API接続は失敗することがあります（ネットワークエラー、サーバーエラーなど）。その場合の処理を追加します。

**try-catch文を使う:**

```javascript
const fetchQuote = async () => {
  setLoading(true);
  setError(null);
  
  try {
    // 正常な処理をここに書く
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    
    setQuote(data.content);
    setAuthor(data.author);
    setLoading(false);
    
  } catch (error) {
    // エラーが発生した時の処理
    setError('名言の取得に失敗しました');
    setLoading(false);
  }
};
```

**try-catch文の説明:**
- `try { }`：正常な処理を書くブロック
- `catch (error) { }`：エラーが発生した時の処理を書くブロック
- エラーが発生すると、`try`内の処理は途中で止まり、`catch`内の処理が実行されます

**エラーハンドリングの完成形:**

```javascript
const fetchQuote = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const response = await fetch('https://api.quotable.io/random');
    
    // レスポンスが正常かチェック
    if (!response.ok) {
      throw new Error('API接続に失敗しました');
    }
    
    const data = await response.json();
    setQuote(data.content);
    setAuthor(data.author);
    
  } catch (error) {
    // エラーメッセージを設定
    setError(error.message || '名言の取得に失敗しました');
  } finally {
    // 成功・失敗に関わらず実行される処理
    setLoading(false);
  }
};
```

**補足説明:**
- `response.ok`：HTTPステータスが200-299の時は`true`、それ以外は`false`
- `throw new Error()`：エラーを意図的に発生させます
- `finally { }`：成功・失敗に関わらず必ず実行される処理（ローディングを必ず終了させる）

4. **完成した関数の全体像:**

```javascript
const fetchQuote = async () => {
  // 1. ローディング開始、エラーをクリア
  setLoading(true);
  setError(null);
  
  try {
    // 2. APIからデータを取得
    const response = await fetch('https://api.quotable.io/random');
    
    // 3. レスポンスが正常かチェック
    if (!response.ok) {
      throw new Error('API接続に失敗しました');
    }
    
    // 4. データをJSON形式に変換
    const data = await response.json();
    
    // 5. 取得したデータをstateに保存
    setQuote(data.content);
    setAuthor(data.author);
    
  } catch (error) {
    // 6. エラーが発生した時の処理
    setError(error.message || '名言の取得に失敗しました');
  } finally {
    // 7. ローディングを終了（成功・失敗に関わらず）
    setLoading(false);
  }
};
```

5. **この時点でのコード全体（参考用）:**

```javascript
'use client';

import { useState } from 'react';

export default function Home() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // APIから名言を取得する関数
  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://api.quotable.io/random');
      
      if (!response.ok) {
        throw new Error('API接続に失敗しました');
      }
      
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
      
    } catch (error) {
      setError(error.message || '名言の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>ランダム名言アプリ</h1>
      
      {error && <p style={{color: 'red'}}>エラー: {error}</p>}
      {loading && <p>読み込み中...</p>}
      
      <div>
        <p>{quote}</p>
      </div>
      
      <div>
        <p>— {author}</p>
      </div>
      
      <button onClick={() => {}}>
        新しい名言を取得
      </button>
    </div>
  );
}
```

**注意:** 
- この時点では、関数は作成しましたが、まだボタンから呼び出されていません
- 次のステップ4と5で、初回読み込み時とボタンクリック時にこの関数を呼び出すようにします

---

### ステップ4: 初回読み込み時の名言取得

このステップでは、ページを開いた時に自動的に名言を取得する機能を実装します。

1. **useEffectとは？**

`useEffect`は、Reactコンポーネントの特定のタイミングで処理を実行するためのReact Hooksです。

**主な使い方：**
- コンポーネントが最初に表示された時（マウント時）
- 特定の値が変更された時
- コンポーネントが削除される時（アンマウント時）

2. **useEffectの基本構文:**

```javascript
useEffect(() => {
  // 実行したい処理を書く
}, [依存配列]);
```

**依存配列とは？**
- 空配列 `[]`：コンポーネントが最初に表示された時だけ実行
- 変数を含む `[変数名]`：その変数が変更された時に実行
- 省略：毎回の再レンダリング時に実行（通常は使わない）

3. **初回読み込み時に名言を取得する実装:**

`return`の前、`fetchQuote`関数の後に`useEffect`を追加します。

**ステップ4-1: useEffectをインポート（既に済んでいる場合）**

ステップ3で既にインポートしているので、確認してください：

```javascript
import { useState, useEffect } from 'react';
```

もし`useEffect`が含まれていない場合は、追加してください。

**ステップ4-2: useEffectを追加**

```javascript
export default function Home() {
  // stateの定義
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // APIから名言を取得する関数（ステップ3で作成）
  const fetchQuote = async () => {
    // ... (既存のコード)
  };

  // 初回読み込み時に名言を取得
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    // JSXの内容
  );
}
```

**このコードの意味：**
- `useEffect(() => { ... }, [])`：コンポーネントが最初に表示された時に1回だけ実行
- `fetchQuote()`：名言を取得する関数を呼び出す
- 依存配列が空 `[]` なので、最初の1回だけ実行されます

**なぜ空配列なのか？**
- ページを開いた時に1回だけ名言を取得すれば十分だからです
- 毎回実行すると、不要なAPIリクエストが発生してしまいます

4. **動作の確認:**

実装後、以下の動作を確認してください：
- ページを開くと自動的に名言が表示される
- ページをリロードすると、新しい名言が取得される

5. **この時点でのコード全体（参考用）:**

```javascript
'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // APIから名言を取得する関数
  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://api.quotable.io/random');
      
      if (!response.ok) {
        throw new Error('API接続に失敗しました');
      }
      
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
      
    } catch (error) {
      setError(error.message || '名言の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  // 初回読み込み時に名言を取得
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div>
      <h1>ランダム名言アプリ</h1>
      
      {error && <p style={{color: 'red'}}>エラー: {error}</p>}
      {loading && <p>読み込み中...</p>}
      
      <div>
        <p>{quote}</p>
      </div>
      
      <div>
        <p>— {author}</p>
      </div>
      
      <button onClick={() => {}}>
        新しい名言を取得
      </button>
    </div>
  );
}
```

**注意:** 
- この時点では、ページを開くと自動的に名言が表示されますが、ボタンをクリックしても何も起こりません
- 次のステップ5でボタンのクリック機能を実装します

---

### ステップ5: ボタンの実装

このステップでは、ボタンをクリックした時に新しい名言を取得する機能を実装します。

1. **現在のボタンの状態:**

現在、ボタンは以下のようになっています：

```javascript
<button onClick={() => {}}>
  新しい名言を取得
</button>
```

- `onClick={() => {}}`：空の関数なので、クリックしても何も起こりません

2. **ボタンのクリックイベントの基本:**

**onClickの基本構文:**

```javascript
<button onClick={関数名}>
  ボタンのテキスト
</button>
```

または

```javascript
<button onClick={() => 関数名()}>
  ボタンのテキスト
</button>
```

**両方の書き方の違い:**

**方法1: 関数を直接渡す**
```javascript
<button onClick={fetchQuote}>
  新しい名言を取得
</button>
```
- 関数を直接渡します
- `()`を付けないことに注意（`()`を付けると即座に実行されてしまいます）

**方法2: アロー関数を使う（推奨）**
```javascript
<button onClick={() => fetchQuote()}>
  新しい名言を取得
</button>
```
- `() => fetchQuote()`というアロー関数を作成して渡します
- この場合、`fetchQuote()`の`()`が必要です

**なぜ方法2が推奨されるのか？**
- 将来的に引数を渡したい時に便利です
- 複数の処理を実行したい時に拡張しやすいです

3. **実装方法:**

ステップ5-1: ボタンのonClickを更新

```javascript
<button onClick={() => fetchQuote()}>
  新しい名言を取得
</button>
```

これで、ボタンをクリックすると`fetchQuote`関数が呼ばれ、新しい名言が取得されます。

4. **動作の流れ:**

ボタンをクリックした時の流れ：

```
1. ユーザーがボタンをクリック
   ↓
2. onClickイベントが発火
   ↓
3. fetchQuote()関数が実行される
   ↓
4. setLoading(true) → 「読み込み中...」が表示される
   ↓
5. APIから名言を取得
   ↓
6. setQuote(data.content) → 名言が表示される
   ↓
7. setAuthor(data.author) → 著者名が表示される
   ↓
8. setLoading(false) → 「読み込み中...」が消える
```

5. **完成したコード全体（参考用）:**

```javascript
'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // APIから名言を取得する関数
  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://api.quotable.io/random');
      
      if (!response.ok) {
        throw new Error('API接続に失敗しました');
      }
      
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
      
    } catch (error) {
      setError(error.message || '名言の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  // 初回読み込み時に名言を取得
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div>
      <h1>ランダム名言アプリ</h1>
      
      {error && <p style={{color: 'red'}}>エラー: {error}</p>}
      {loading && <p>読み込み中...</p>}
      
      <div>
        <p>{quote}</p>
      </div>
      
      <div>
        <p>— {author}</p>
      </div>
      
      {/* ボタンクリック時にfetchQuote関数を呼び出す */}
      <button onClick={() => fetchQuote()}>
        新しい名言を取得
      </button>
    </div>
  );
}
```

6. **動作確認:**

実装後、以下の動作を確認してください：
- ページを開くと自動的に名言が表示される（ステップ4の機能）
- 「新しい名言を取得」ボタンをクリックすると、新しい名言が取得される
- ローディング中は「読み込み中...」が表示される
- エラーが発生した場合は、エラーメッセージが表示される

**おめでとうございます！** 🎉
基本的なランダム名言アプリが完成しました！

---

### ステップ6: 追加機能（チャレンジ項目）

もし余裕があれば、以下を追加してみてください：

1. **カテゴリフィルター:**
   - APIエンドポイント: `https://api.quotable.io/random?tags=technology`
   - タグ選択ボタンを追加

2. **複数の名言を表示:**
   - 「さらに名言を追加」ボタン
   - 配列で名言を管理

3. **名言のコピー機能:**
   - クリップボードにコピーするボタン

---

## 💡 実装のヒント

### 基本的な構造

```javascript
// 状態管理
const [quote, setQuote] = useState('');
const [author, setAuthor] = useState('');
const [loading, setLoading] = useState(false);

// API関数
const fetchQuote = async () => {
  // ここを実装
};

// 初回読み込み
useEffect(() => {
  // ここを実装
}, []);

// レンダリング
return (
  <div>
    {/* UIを実装 */}
  </div>
);
```

### fetch APIの基本形

```javascript
const response = await fetch('https://api.quotable.io/random');
const data = await response.json();
```

### エラーハンドリングの基本形

```javascript
try {
  setLoading(true);
  // API呼び出し
  setLoading(false);
} catch (error) {
  // エラー処理
  setLoading(false);
}
```

---

## 🐛 トラブルシューティング

1. **APIが呼び出せない:**
   - ブラウザのコンソールでエラーを確認
   - ネットワークタブでリクエストを確認
   - CORSエラーが出る場合は、Next.jsのAPI Routesを使用

2. **状態が更新されない:**
   - useStateの使い方を確認
   - 非同期処理が正しく完了しているか確認

---

## 📖 参考リソース

- [Quote API ドキュメント](https://github.com/lukePeavey/quotable)
- [React Hooks ドキュメント](https://react.dev/reference/react)
- [Next.js ドキュメント](https://nextjs.org/docs)

---

## ✅ チェックリスト

実装が完了したら、以下を確認してください：

- [ ] ページを開いた時に自動で名言が表示される
- [ ] ボタンをクリックすると新しい名言が取得できる
- [ ] ローディング中は適切な表示がある
- [ ] エラーが発生した場合にエラーメッセージが表示される
- [ ] コンソールにエラーが出ていない

---

頑張ってください！🎉

