import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar.js";
import Pokemons from "./components/Pokemons";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=100")
      .then((response) => response.json())
      .then((pokemonsJson) => {
        setPokemons(pokemonsJson.results);
        setSearch("");
      });
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const filterPokemons = () => {
    const buscar = search.toLowerCase();
    return pokemons.filter((pokemon) => pokemon.name.startsWith(buscar));
  };

  const data = filterPokemons();
  return (
    <div>
      <NavBar onChange={handleChange} value={search} />
      <Pokemons data={data} />
    </div>
  );
}

export default App;
