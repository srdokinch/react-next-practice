// ReactとReactDOMをインポート
// React: コンポーネントの作成やstate管理など、Reactのコア機能を提供
// ReactDOM: Reactコンポーネントを実際のDOM（ブラウザの画面）に表示するためのライブラリ
// ReactとReactDOMの違い:
//   - React: UIのロジック（コンポーネント、state、propsなど）を担当
//   - ReactDOM: Reactで作ったUIを実際のブラウザ画面に描画することを担当
//   これらを分離することで、React Native（モバイルアプリ）など他の環境でもReactを使えるようになる
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// ReactアプリケーションをDOMにレンダリング（表示）
// document.getElementById('root') でHTMLのroot要素を取得
// createRoot() でReact 18の新しいルートAPIを使用
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode: 開発時に潜在的な問題を検出するためのモード
  // 本番環境では動作に影響しない
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
