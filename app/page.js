"use client";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center mt-10">🍅 ポモドーロタイマー 🍅</h1>
      <div className="timer flex items-center justify-center">
        <p className="text-8xl font-bold my-10">25:00</p>
      </div>
      <div className="text-4xl contorl-btn flex items-center justify-center gap-4 cursor-pointer">
        <button className="hover:opacity-80" onClick={() => console.log("スタート")}>▶️</button>
        <button className="hover:opacity-80" onClick={() => console.log("一時停止")}>⏸️</button>
        <button className="hover:opacity-80" onClick={() => console.log("リセット")}>⏹️</button>
      </div>
      <div className="mode flex gap-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium">
          作業中 ☁️
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300">
          休憩中 🌙
        </button>
      </div>
      <ul className="history-list">
        <li>ここに完了したセッションが記録される。</li>
        <li>ここに完了したセッションが記録される。</li>
        <li>ここに完了したセッションが記録される。</li>
      </ul>
    </div>
  );
}

