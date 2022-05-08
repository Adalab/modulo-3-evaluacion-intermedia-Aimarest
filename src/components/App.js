import "../styles/App.scss";
import { useState, useEffect } from "react";
import objectToExport from "../services/LocalStorage";
import ApiData from "../services/ApiData";
function App() {
  //Variables de estado:
  const [data, setData] = useState(objectToExport.get("quotes", []));
  const [search, setSearch] = useState("");
  const [emptyMessage, setEmptyMessage] = useState("");
  const [newQuote, setNewQuote] = useState({
    quote: "",
    character: "",
  });
  const [character, setCharacter] = useState("all");
  useEffect(() => {
    if (data.length === 0) {
      ApiData().then((dataFromApi) => {
        objectToExport.set("quotes", dataFromApi);
        setData(dataFromApi);
      });
    }
  }, []);
  const htmlData = data
    .filter((quote) => {
      if (character === "all") {
        return true;
      } else if (
        quote.character.toLowerCase().includes(character.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    })
    .filter((quote) => quote.quote.toLowerCase().includes(search.toLowerCase()))
    .map((phrase, index) => {
      return (
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
      );
    });

  function handleSearchQuote(event) {
    setSearch(event.target.value);
  }
  function handleNewQuote(event) {
    setNewQuote({
      ...newQuote,
      [event.target.id]: event.target.value,
    });
    objectToExport.set("quotes", [...data, newQuote]);
  }
  function handleClick(event) {
    event.preventDefault();
    if (!newQuote.character || !newQuote.quote) {
      setEmptyMessage(
        "Debe escribir una frase y el nombre del personaje para que se muestre en la lista"
      );
      return;
    }
    setEmptyMessage(null);
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
      <header className="header">
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
          <select
            id="character"
            value={character}
            onChange={handleSearchCharacter}
          >
            <option value="all">Todos</option>
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
            required
          />
          <input
            className="new-quote__input"
            type="text"
            name="character"
            id="character"
            placeholder="Personaje"
            onChange={handleNewQuote}
            value={newQuote.character}
            required
          />
          <input
            className="new-quote__btn"
            type="submit"
            value="Añadir una nueva frase"
            onClick={handleClick}
          />
        </form>
        {emptyMessage && <div className="error">{emptyMessage}</div>}
      </main>
    </div>
  );
}

export default App;
