// ReactライブラリからuseStateという機能を取り込む
// useStateはコンポーネントの状態（データ）を管理するためのフック
import { useState } from 'react'
import './App.css'

// Appという名前の関数コンポーネントを定義
function App() {

  const [todos, setTodos] = useState([]); // todosという名前の状態変数と、それを更新するsetTodos関数を定義
  const [newTodo, setNewTodo] = useState(''); // newTodoという名前の状態変数と、それを更新するsetNewTodo関数を定義
  const [editingId, setEditingId] = useState(null); // editingIdという名前の状態変数と、それを更新するsetEditingId関数を定義
  const [editText, setEditText] = useState(''); // editTextという名前の状態変数と、それを更新するsetEditText関数を定義
  const [nextId, setNextId] = useState(1); // 次のIDを管理するstate。初期値は1（最初のTodoのID）

  // Todoを追加する関数
  const addTodo = () => {
      // Todoオブジェクトの作成
      const todo = {
        id: nextId, // 1から順番に連番のIDを割り当てる
        text: newTodo
      };
      setTodos([...todos, todo]); // 既存のtodos配列に新しいtodoを追加
      setNextId(nextId + 1); // 次のIDを1増やす
      setNewTodo(''); // 入力フィールドをクリアするため、newTodoを空文字列に設定
  };

  // Todoを削除する関数
  const deleteTodo = (id) => {
    // filter()メソッドを使って、指定されたID以外のTodoだけを残す
    // todo.id !== idは、「TodoのIDが削除対象のIDと異なる」という条件
    // この条件がtrueのものだけが新しい配列に残り、falseのものは除外される
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 編集モードを開始する関数
  const startEdit = (todo) => {
    setEditingId(todo.id); // 編集中のTodoのIDを保存（どのTodoが編集中か分かるようにする）
    setEditText(todo.text); // 編集フィールドに、現在のTodoのテキストをセット
  };

  // 編集を保存する関数
  const saveEdit = () => {
    // todos：既存のTodo配列
    // .map(...)：各要素に対して処理を実行
    // todo =>：各Todo要素を指す
    // 戻り値：新しい配列
    setTodos(todos.map(todo =>
      todo.id === editingId ? { ...todo, text: editText } : todo //todoのidが編集しているidと同じか確認し、同じであれば編集後の値に上書き。...todoはスプレッド演算子でオブジェクトの全プロパティーを展開してコピー
    ));
    setEditingId(null); // 編集モードを終了するため、editingIdをnullに設定
    setEditText(''); // 編集テキストをクリア
  };

  // 編集をキャンセルする関数
  const cancelEdit = () => {
    setEditingId(null); // 編集モードを終了するため、editingIdをnullに設定
    setEditText(''); // 編集テキストをクリア
  };

  // return文で、このコンポーネントが表示する内容（JSX）を返す
  return (
    <div>
      <h1>Todoリスト</h1>
      <div className="add-todo">
        <input
          type="text"
          placeholder="新しいTodoを入力してね"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)} // eはイベントオブジェクトで、e.target.valueで入力された値を取得できる
        />
        <button onClick={addTodo}>追加</button>
      </div>

      {/* Todo一覧表示 */}
      <div className="todo-list">
        {todos.length === 0 ? (
          <p>まだTodoはありません。追加してください！</p> // Todoが0個の場合に表示するメッセージ
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              {/* 条件分岐で、編集中かどうかで表示を切り替え */}
              {/* editingId === todo.id が true なら編集モード、false なら表示モード */}

              {/* 編集モードの場合の表示 */}
              {editingId === todo.id ? (
                <div className="edit-mode">
                  <input
                    type="text"
                    value={editText} // 編集中のテキストを表示
                    onChange={(e) => setEditText(e.target.value)} // 編集内容が変更された時に、editTextのstateを更新
                    autoFocus // autoFocus属性で、この要素が表示された時に自動的にフォーカス（入力可能な状態）にする
                  />
                  <button onClick={saveEdit}>保存</button> {/* 保存ボタン：クリックするとsaveEdit関数を実行 */}
                  <button onClick={cancelEdit}>キャンセル</button> {/* キャンセルボタン：クリックするとcancelEdit関数を実行 */}
                </div>
              ) : (
                
                // 表示モードの場合の表示
                <div className="display-mode">
                  <span>ID {todo.id} : {todo.text}</span>
                  <div className="todo-actions">
                    <button onClick={() => startEdit(todo)}>編集</button>
                    <button onClick={() => deleteTodo(todo.id)}>削除</button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// export defaultで、このコンポーネントを他のファイルから使用できるようにする
// defaultは、このファイルから1つのメインのものをエクスポートすることを意味する
export default App