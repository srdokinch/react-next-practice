const CityInput = ({city, setCity, onSearch}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    if(city.trim()) {
      onSearch(city.trim())
    }
  }

  return (
    // フォームが送信された時にhandleSubmitが実行されブラウザが自動でイベント情報（e）を渡す
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        placeholder="都市名を入力してください（例：札幌, Sapporo）"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">検索</button>
    </form>
  )
}

export default CityInput;