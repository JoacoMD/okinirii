import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Anime } from '../classes/anime';
import { fetchTopAnimes } from './services/anime.service';
import { RootState } from './store'

interface AnimePage {
    pageNumber: number
    content: Anime[]
}

export interface AnimeState {
    pages: AnimePage[];
    loading: boolean
}

const initialState: AnimeState = {
  pages: [],
  loading: false
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchAnimes = createAsyncThunk(
  'animes/fetchAnimes',
  async (pageNumber: number) => {
    const response = await fetchTopAnimes(pageNumber);
    // The value we return becomes the `fulfilled` action payload
    return response.data.top;
  }
);

export const animeSlice = createSlice({
  name: 'animes',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnimes.fulfilled, (state, action) => {
        state.loading = false;
        const page = state.pages.findIndex(p => p.pageNumber === action.meta.arg)
        if (page < 0) {
            state.pages.push({pageNumber: action.meta.arg, content: action.payload})
        } else {
            state.pages[page] = {pageNumber: action.meta.arg, content: action.payload}
        }
      });
  },
});

// export const { increment, decrement, incrementByAmount } = animeSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAnimes = (state: RootState) => state.animes;

export default animeSlice.reducer;
