import "../styles/App.scss";
import { useState } from "react";
import phrasesList from "../data/phrases.json";
function App() {
  //Variables de estado:
  const [data, setData] = useState(phrasesList);
  const [search, setSearch] = useState("");
  const [newQuote, setNewQuote] = useState({
    quote: "",
    character: "",
  });
  const [character, setCharacter] = useState("");
  const htmlData = data
    .filter((quote) =>
      quote.character.toLowerCase().includes(character.toLowerCase())
    )
    .filter((quote) => quote.quote.toLowerCase().includes(search.toLowerCase()))
    .map((phrase, index) => (
      <li className="quote__item" key={index}>
        <p className="phrase__character">
          <label>Personaje:</label>
          {phrase.character}
        </p>
        <p className="phrase__quote">
          <label>Frase:</label>
          {phrase.quote}
        </p>
      </li>
    ));
  function handleSearchQuote(event) {
    setSearch(event.target.value);
  }
  function handleNewQuote(event) {
    setNewQuote({
      ...newQuote,
      [event.target.id]: event.target.value,
    });
  }
  function handleClick(event) {
    event.preventDefault();
    setData([...data, newQuote]);
    setNewQuote({
      quote: "",
      character: "",
    });
  }
  function handleSearchCharacter(event) {
    event.preventDefault();
    setCharacter(event.target.value);
  }
  return (
    <div className="App">
      <header>
        <h1 className="header__title">Frases de Friends</h1>
        <form>
          <label htmlFor="search">Filtrar por frase</label>
          <input
            className="header__search"
            autoComplete="off"
            type="search"
            name="search"
            placeholder="Filtrar frases"
            onChange={handleSearchQuote}
            value={search}
          />
          <label htmlFor="character">Filtrar por personaje</label>
          <select id="character" onChange={handleSearchCharacter}>
            <option value="Todos">Todos</option>
            <option value="Joey">Joey</option>
            <option value="Rachel">Rachel</option>
            <option value="Chandler">Chandler</option>
            <option value="Phoebe">Phoebe</option>
            <option value="Ross">Ross</option>
            <option value="Monica">Monica</option>
          </select>
        </form>
      </header>
      <main>
        <ul className="quotes__list">{htmlData}</ul>
        <form className="new-quote__form">
          <h2 className="new-quote__title">Añadir una nueva frase</h2>
          <input
            className="new-quote__input"
            type="text"
            name="quote"
            id="quote"
            placeholder="Frase"
            onChange={handleNewQuote}
            value={newQuote.quote}
          />
          <input
            className="new-quote__input"
            type="text"
            name="character"
            id="character"
            placeholder="Personaje"
            onChange={handleNewQuote}
            value={newQuote.character}
          />
          <input
            className="new-quote__btn"
            type="submit"
            value="Añadir una nueva frase"
            onClick={handleClick}
          />
        </form>
      </main>
    </div>
  );
}

export default App;
