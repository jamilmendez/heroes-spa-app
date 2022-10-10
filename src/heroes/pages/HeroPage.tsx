import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getHeroById } from "../helpers";

export const HeroPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const hero = useMemo(() => getHeroById(id), [id]);

  const onNavigateBack = () => {
    navigate(-1); // navega a la página anterior
  }

  if ( !hero ) {
    return <Navigate to={'/marvel'} />
  }

  return (
    <div className="row mt-5 animate__animated animate__fadeInLeft">
      <div className="col-4">
        <img 
          src={`../assets/heroes/${ hero.id }.jpg`}
          alt={ hero.superhero }
          className="img-thumbnail"
        />
      </div>
      <div className="col-8">
        <h3>{ hero.superhero }</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Alter ego:<b> { hero.alter_ego } </b></li>
          <li className="list-group-item">Publisher:<b> { hero.publisher } </b></li>
          <li className="list-group-item">First appearance:<b> { hero.first_appearance } </b></li>
        </ul>

        <h5 className="mt-3">Characters</h5>
        <p>{ hero.characters }</p>

        <button 
          className="btn btn-outline-primary"
          onClick={ onNavigateBack }
        >
          Return
        </button>
      </div>
    </div>
  )
}