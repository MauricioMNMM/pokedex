import React from "react";
import pokeball from "./../assets/images/pokeball.png";

function NavBar({ onChange, value }) {
  return (
    <nav className="nav">
      <div className="nav-img-title">
        <img src={pokeball} alt="bokeball" />
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
export default NavBar;
