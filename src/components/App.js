import "../styles/App.scss";
import { useState } from "react";
import phrasesList from "../data/phrases.json";
function App() {
  //Variables de estado:
  const [data, setData] = useState(phrasesList);
  const htmlData = data.map((phrase, index) => (
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
          />
          <label htmlFor="character">Filtrar por personaje</label>
          <select>
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
      </main>
    </div>
  );
}

export default App;
