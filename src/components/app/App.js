import { HeroesList } from '../heroesList';
import { HeroesAddForm } from '../heroesAddForm';
import { HeroesFilters } from '../heroesFilters';

import './app.scss';

export const App = () => (
  <main className='app'>
    <div className='content'>
      <HeroesList />
      <div className='content__interactive'>
        <HeroesAddForm />
        <HeroesFilters />
      </div>
    </div>
  </main>
);


