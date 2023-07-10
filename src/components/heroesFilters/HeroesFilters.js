import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { fetchFilters, activeFilterChanged } from '../../slices/filters';
import { Spinner } from '../spinner';
import { filtersSelector, filtersLoadingStatusSelector, activeFilterSelector } from '../../selectors';

export const HeroesFilters = () => {

  const filters = useSelector(filtersSelector);
  const filtersLoadingStatus = useSelector(filtersLoadingStatusSelector);
  const activeFilter = useSelector(activeFilterSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilters());
    // eslint-disable-next-line
  }, []);

  const isLoading = filtersLoadingStatus === 'loading';
  const isError = filtersLoadingStatus === 'error';

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
    return <h5 className='text-center mt-5'>Ошибка загрузки</h5>;
  }

  const renderFilters = (arr) => {
    if (arr.length === 0) {
      return <h5 className='text-center mt-5'>Фильтры не найдены</h5>;
    }

    return arr.map(({ name, className, label }) => {
      
      const btnClass = classNames('btn', className, {
        active: name === activeFilter,
      });

      return (
        <button
          key={name}
          id={name}
          className={btnClass}
          onClick={() => dispatch(activeFilterChanged(name))}
        >
          {label}
        </button>
      );
    });
  };

  const elements = renderFilters(filters);

  return (
    <div className='card shadow-lg mt-4'>
      <div className='card-body'>
        <p className='card-text'>Отфильтруйте героев по элементам</p>
        <div className='btn-group'>
          {elements}
        </div>
      </div>
    </div>
  );
};
