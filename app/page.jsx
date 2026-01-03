'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  // 名言のテキストを保存するstate（初期値は空文字）
  const [quote, setQuote] = useState('');
  // 著者名を保存するstate（初期値は空文字）
  const [author, setAuthor] = useState('');
  // ローディング状態を保存するstate（初期値はfalse）
  const [loading, setLoading] = useState(false);
  // エラーメッセージを保存するstate (初期値はnull)
  const [error, setError] = useState(null);


  // 名言を習得する関数
  const fetchQuote = async () => {
    // 1. ローディング開始、エラーをクリア
    setLoading(true);
    setError(null);

    try {
      // 2. APIからデータを取得
      const response = await fetch('https://api.quotable.io/random');

      // 3. レスポンスが正常かチェック
      if (!response.ok) {
        throw new Error('データの取得に失敗しました');
      }

      // 4. レスポンスをJSON形式に変換
      const data = await response.json();

      // 5. 取得したデータをstateに保存
      setQuote(data.content);
      setAuthor(data.author);

    } catch (error) {
      // 6. エラーが発生した時
      setError(error.message || '名言の取得に失敗しました');
    } finally {
      // 7. 成功失敗問わずローディング状態をfalseに変更
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>ランダム名言アプリ</h1>

      {/* エラーがある時はエラーメッセージを表示 */}
      {error && <p style={{ color: 'red' }}>エラー： {error}</p>}

      {/* ローディング中の表示 */}
      {loading && <p>読み込み中・・・</p>}

      {/* 名言を表示するエリア */}
      <div>
        <p>{quote}</p>
      </div>

      {/* 著者を表示するエリア */}
      <div>
        <p>― {author}</p>
      </div>

      {/* 新しい名言を取得ボタン */}
      <button onClick={() => {}}>
        新しい名言を取得
      </button>

    </div>
  );
}