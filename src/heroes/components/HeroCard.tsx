import { Link } from "react-router-dom";

type HeroProp = {
  id: string;
  superhero: string;
  publisher: string;
  alter_ego: string;
  first_appearance: string;
  characters: string;
};

type FilterProp = {
  alter_ego: string;
  characters: string;
};

const FilterCharacter = ({ alter_ego, characters }: FilterProp) => {
  return (alter_ego === characters) ? null : <p>{ characters }</p>;
};

export const HeroCard = ({
  id,
  alter_ego,
  characters,
  first_appearance,
  publisher,
  superhero,
}: HeroProp) => {
  const heroImageUrl = `./assets/heroes/${id}.jpg`;
  // const charactersByHero = (<p>{ characters }</p>);

  return (
    <div className="col animate__animated animate__fadeIn">
      <div className="card">
        <div className="row no-gutters">
          <div className="col-4">
            <img src={heroImageUrl} alt={superhero} className="card-img" />
          </div>

          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">{superhero}</h5>
              <p className="card-text">{alter_ego}</p>

              {/* {
                (alter_ego !== characters) && charactersByHero
              } */}
              <FilterCharacter alter_ego={alter_ego} characters={characters} />

              <p className="card-text">
                <small className="text-muted">{first_appearance}</small>
              </p>

              <Link to={`/hero/${id}`}>More...</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
