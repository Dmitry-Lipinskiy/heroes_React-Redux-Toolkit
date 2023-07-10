import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { fetchHeroes, onDeleteHeroes } from '../../slices/heroes';
import { useHttp } from '../../hooks/http.hook';
import { HeroesListItem } from '../heroesListItem';
import { Spinner } from '../spinner';
import { activeFilterSelector, heroesLoadingStatusSelector, heroesSelector } from '../../selectors';

export const HeroesList = () => {

  const filtredHeroesSelector = createSelector(
    activeFilterSelector,
    heroesSelector,
    (filter, heroes) => {
      if (filter === 'all') {
        return heroes;
      } else {
        return heroes.filter((item) => item.element === filter);
      }
    }
  );

  const filteredHeroes = useSelector(filtredHeroesSelector);
  const heroesLoadingStatus = useSelector(heroesLoadingStatusSelector);

  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchHeroes());
    // eslint-disable-next-line
  }, []);

  const onDelete = useCallback((id) => {
    dispatch(onDeleteHeroes(request, id));
    // eslint-disable-next-line
  }, [request]);

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (heroesLoadingStatus === 'error') {
    return <h5 className='text-center mt-5'>Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className='text-center mt-5'>Героев пока нет</h5>;
    }

    return arr.map(({ id, ...props }) => (
      <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)} />
    ));
  };

  const elements = renderHeroesList(filteredHeroes);
  return <ul>{elements}</ul>;
};
