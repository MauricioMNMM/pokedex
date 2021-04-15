import { useEffect, useState } from "react";

function App() {
  const [pokemons] = useState([]);
  const [search] = useState("");
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=100")
      .then((response) => response.json())
      .then((pokemonsJson) => {
        this.setState({
          pokemons: pokemonsJson.results,
        });
      });
  });

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  filterPokemons = () => {
    const search = search.toLowerCase();
    return pokemons.filter((pokemon) => pokemon.name.startsWith(search));
  };

  const data = this.filterPokemons();
  return (
    <div>
      <NavBar onChange={this.handleChange} value={search} />
      <Pokemons data={data} />
    </div>
  );
}
