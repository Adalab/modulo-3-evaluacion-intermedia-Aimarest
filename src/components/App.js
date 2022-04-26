import "../styles/App.scss";
import { useState } from "react";
import phrasesList from "../data/phrases.json";
function App() {
  //Variables de estado:
  const [data, setData] = useState(phrasesList);
  return (
    <div className="App">
      <h1>Hola mundo</h1>
    </div>
  );
}

export default App;
