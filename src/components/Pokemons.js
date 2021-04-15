import React from "react";

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
      isHover: false,
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
  handleMouseEnter = (event) => {
    event.preventDefault();
    this.setState({ isHover: true });
  };
  handleMouseLeave = (event) => {
    event.preventDefault();
    this.setState({ isHover: false });
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
          <img
            src={
              this.state.isHover
                ? pokemon.sprites.back_default
                : pokemon.sprites.front_default
            }
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            alt={pokemon.name}
          />
        )}
        <samp className="num">#{pokemon.id}</samp>
      </div>
    );
  }
}
export default Pokemons;
