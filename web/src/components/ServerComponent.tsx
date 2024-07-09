export const ServerPokemonComponent = async () => {
  const data = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')

  const pokemon = await data.json()
  return (
    <div style={{border: 'red 1px solid'}}>
      <p>Server component</p>
      <br />
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  );
}