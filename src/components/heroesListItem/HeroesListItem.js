import classNames from 'classnames';

export const HeroesListItem = ({ name, description, element, onDelete }) => {

  const elementClassName = classNames(
    'bg-gradient', {
      'bg-danger': element === 'fire',
      'bg-primary': element === 'water',
      'bg-success': element === 'wind',
      'bg-secondary': element === 'earth',
  });

  return (
    <li
      className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}
    >
      <img
        src='http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg'
        className='img-fluid w-25 d-inline'
        alt='unknown hero'
        style={{ objectFit: 'cover' }}
      />
      <div className='card-body'>
        <h3 className='card-title'>{name}</h3>
        <p className='card-text'>{description}</p>
      </div>
      <span 
        className='position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light'
        onClick={onDelete}
      >
        <button
          type='button'
          className='btn-close btn-close'
          aria-label='Close'
        ></button>
      </span>
    </li>
  );
};
