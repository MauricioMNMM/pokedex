import React from "react";
import "./App.css";

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
function NavBar({ onChange, value }) {
  return (
    <nav className="nav">
      <div className="nav-img-title">
        <img
          src="https://img.icons8.com/plasticine/2x/open-pokeball.png"
          alt="bokeball"
        />
        <h2 className="mb-4">Pokemons</h2>
      </div>
      <div className="nav-search-submit">
        <form>
          <input
            type="text"
            name="search"
            value={value}
            onChange={onChange}
            placeholder="Buscar"
          />
          <input type="submit" value="Buscar" className="boton" />
        </form>
      </div>
    </nav>
  );
}
function Pokemons({ data }) {
  return (
    <div className="flex flex-wrap justify-center">
      {data.map((pokemon) => {
        return <Target key={pokemon.url} {...pokemon} />;
      })}
    </div>
  );
}
class Target extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: {
        sprites: {},
        types: [],
      },
    };
  }
  componentDidMount() {
    fetch(this.props.url)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ pokemon: json });
      });
  }
  getTypeColor = (type) => {
    const TYPE_COLORS = {
      water: "blue-500",
      fire: "red-500",
      grass: "green-400",
      bug: "green-500",
      normal: "gray-400",
      electric: "yellow-400",
      ground: "",
      poison: "purple-500",
      fighting: "",
      fairy: "pink-300",
      psychic: "yellow-600",
      rock: "gray-600",
      ghost: "gray-400",
    };
    return TYPE_COLORS[type] || "gray-500";
  };
  render() {
    const { pokemon } = this.state;
    const color = this.getTypeColor(pokemon.types[0]?.type.name);
    return (
      <div className={`tarjeta capitalize bg-${color}`}>
        <div className="estadisticas">
          <h3 className="name">{pokemon.name}</h3>
          <div className="tipoText">
            {this.state.pokemon.types.map((type) => {
              return <p className="tipo">{type.type.name}</p>;
            })}
          </div>
        </div>
        {this.state.pokemon.sprites !== undefined && (
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        )}
        <samp className="num">#{}</samp>
      </div>
    );
  }
}
export default App;
