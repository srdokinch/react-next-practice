const CityInput = ({city, setCity, onSearch}) => {
  const handleSubbmit = (e) => {
    e.preventDefault()
    if(city.trim()) {
      onSearch(city.trim())
    }
  }

  return (
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