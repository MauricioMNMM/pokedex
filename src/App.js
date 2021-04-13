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
        <h2>Pokemons</h2>
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
  render() {
    const { pokemon } = this.state;
    return (
      <div className="tarjeta capitalize">
        {this.state.pokemon.sprites !== undefined && (
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        )}
        <div className="m-3 text-lg">
          <h3 className="text-center">{pokemon.name}</h3>
          <div className="flex justify-around m-3">
            {this.state.pokemon.types.map((type) => {
              return (
                <p className={"bg-blue-500 p-1 rounded text-white text-xl"}>
                  {type.type.name}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
