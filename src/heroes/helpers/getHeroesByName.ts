import { heroes } from "../data/heroes";

export const getHeroesByName = (name: any = '') => {

  name = name.trim().toLocaleLowerCase();

  if (name.length === 0) return [];

  return heroes.filter( heroe => heroe.superhero.toLowerCase().includes(name) );

}