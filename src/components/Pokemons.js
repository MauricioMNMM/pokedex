import React from "react";
import { useState, useEffect } from "react";

function Pokemons({ data }) {
  return (
    <div className="flex flex-wrap justify-center">
      {data.map((pokemon) => {
        return <Target key={pokemon.url} {...pokemon} />;
      })}
    </div>
  );
}
function Target({ url }) {
  const [pokemon, setPokemon] = useState({ sprites: {}, types: [] });
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setPokemon(json);
        setIsHover(false);
      });
  }, []);

  const getTypeColor = (type) => {
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

  const handleMouseEnter = (event) => {
    event.preventDefault();
    setIsHover(true);
  };
  const handleMouseLeave = (event) => {
    event.preventDefault();
    setIsHover(false);
  };

  const color = getTypeColor(pokemon.types[0]?.type.name);
  return (
    <div className={`tarjeta capitalize bg-${color}`}>
      <div className="estadisticas">
        <h3 className="name">{pokemon.name}</h3>
        <div className="tipoText">
          {pokemon.types.map((type) => {
            return <p className="tipo">{type.type.name}</p>;
          })}
        </div>
      </div>
      {pokemon.sprites !== undefined && (
        <img
          src={
            isHover
              ? pokemon.sprites.back_default
              : pokemon.sprites.front_default
          }
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          alt={pokemon.name}
        />
      )}
      <samp className="num">#{pokemon.id}</samp>
    </div>
  );
}
export default Pokemons;
