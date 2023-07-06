import Card from "./Card";

export default function Cards({ characters }) {
  // eslint-disable-next-line no-lone-blocks
  {
    console.log(characters);
  }
  return (
    <div>
      {characters.map((character) => (
        <Card
          key={character.id}
          name={character.name}
          status={character.status}
          species={character.species}
          gender={character.gender}
          origin={character.origin.name}
          image={character.image}
        />
      ))}
    </div>
  );
}
