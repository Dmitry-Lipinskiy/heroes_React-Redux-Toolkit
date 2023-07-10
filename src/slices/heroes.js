// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   heroes: [], 
//   heroesLoadingStatus: 'idle', 
// };

// const heroesSlice = createSlice({
//   name: 'heroes',
//   initialState, 
//   reducers: {
//     heroesFetching: (state) => {
//       state.heroesLoadingStatus = 'loading';
//     },
//     heroesFetched: (state, action) => {
//       state.heroesLoadingStatus = 'idle';
//       state.heroes = action.payload;
//     },
//     heroesFetchingError: (state) => {
//       state.heroesLoadingStatus = 'error';
//     },
//     heroCreated: (state, action) => {
//       state.heroes.push(action.payload);
//     },
//     heroDeleted: (state, action) => {
//       state.heroes = state.heroes.filter((item) => item.id !== action.payload);
//     },
//   },
// });

// const { actions, reducer } = heroesSlice;

// export default reducer;

// export const { heroesFetching, heroesFetched, heroesFetchingError, heroCreated, heroDeleted } = actions;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { useHttp } from '../hooks/http.hook';

const initialState = {
  heroes: [], 
  heroesLoadingStatus: 'idle', 
};

export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', async () => {
  const { request } = useHttp();
  return await request('http://localhost:3001/heroes');
});

const heroesSlice = createSlice({
  name: 'heroes',
  initialState, 
  reducers: {
    heroCreated: (state, action) => {
      state.heroes.push(action.payload);
    },
    heroDeleted: (state, action) => {
      state.heroes = state.heroes.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchHeroes.pending, (state) => {
      state.heroesLoadingStatus = 'loading';
    })
    .addCase(fetchHeroes.fulfilled, (state, action) => {
      state.heroesLoadingStatus = 'idle';
      state.heroes = action.payload;
    })
    .addCase(fetchHeroes.rejected, (state) => {
      state.heroesLoadingStatus = 'error'; 
    })
    .addDefaultCase(() => {});
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;

export const { heroesFetching, heroesFetched, heroesFetchingError, heroCreated, heroDeleted } = actions;

export const addHeroes = (request, newHero) => (dispatch) => {
  request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
    .then((res) => console.log(res, 'Отправка успешна'))
    .then(dispatch(heroCreated(newHero)))
    .catch((err) => console.log(err));
}

export const onDeleteHeroes = (request, id) => (dispatch) => {
  request(`http://localhost:3001/heroes/${id}`, 'DELETE')
    .then((data) => console.log(data, 'Deleted'))
    .then(dispatch(heroDeleted(id)))
    .catch((err) => console.log(err));
}