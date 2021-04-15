import React from "react";
import "./App.css";
import NavBar from "./components/NavBar.js";
import Pokemons from "./components/Pokemons";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      search: "",
    };
  }
  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=100")
      .then((response) => response.json())
      .then((pokemonsJson) => {
        this.setState({
          pokemons: pokemonsJson.results,
        });
      });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  filterPokemons = () => {
    const search = this.state.search.toLowerCase();
    return this.state.pokemons.filter((pokemon) =>
      pokemon.name.startsWith(search)
    );
  };
  render() {
    const data = this.filterPokemons();
    return (
      <div>
        <NavBar onChange={this.handleChange} value={this.state.search} />
        <Pokemons data={data} />
      </div>
    );
  }
}
export default App;
