export const ServerPokemonComponent = async () => {
  const data = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  const pokemon = await data.json();

  return (
    <div
      style={{
        border: "1px solid red",
        padding: "20px",
        textAlign: "center",
        borderRadius: "10px",
        backgroundColor: "#fff0f0",
        maxWidth: "400px",
        margin: "20px auto",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <p style={{ fontSize: "1.5em", color: "#333" }}>Server Component</p>
      <br />
      <h1 style={{ fontSize: "2.5em", color: "#d32f2f" }}>{pokemon.name}</h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{ width: "150px", height: "150px", borderRadius: "50%" }}
      />
    </div>
  );
};
