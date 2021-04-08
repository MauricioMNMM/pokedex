import reactDom from "react-dom";
import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemons: [],
    };
  }
  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=20")
      .then((response) => response.json())
      .then((pokemonsJson) => {
        this.setState({
          pokemons: pokemonsJson.results,
        });
        console.log(this.state.pokemons);
      });
  }
  render() {
    return (
      <div>
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
              <input type="text" placeholder="Buscar" />
              <input type="submit" value="Buscar" className="boton" />
            </form>
          </div>
        </nav>
        <div className="div-tarjetas">
          {this.state.pokemons.map((item) => {
            return <Target datos={item.url} />;
          })}
        </div>
      </div>
    );
  }
}
class Target extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: {},
    };
  }
  componentDidMount() {
    fetch(this.props.datos)
      .then((response) => response.json())
      .then((pokemon) => {
        this.setState({ pokemon });
        console.log(this.state.pokemon);
      });
  }
  render() {
    return (
      <div className="tarjeta">
        {this.state.pokemon.sprites !== undefined && (
          <img src={this.state.pokemon.sprites.front_shiny} alt="pokemon" />
        )}
        <div className="estadisticas">
          <h3>{this.state.pokemon.name}</h3>
        </div>
      </div>
    );
  }
}
export default App;
