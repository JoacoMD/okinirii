import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Anime } from '../classes/anime';
import { RootState } from './store'
import { fetchTopAnimes } from './services/anime.service';

interface AnimePage {
  pageNumber: number
  content: Anime[]
}

export interface AnimeState {
  pages: AnimePage[];
  loading: boolean,
  favorites: any[],
  error: string | undefined
}

const initialState: AnimeState = {
  pages: [],
  loading: false,
  favorites: [],
  error: undefined
};

export const selectAnimes = (state: RootState) => state.animes

export const fetchAnimes = createAsyncThunk(
    'animes/fetchAnimes',
    async (pageNumber: number, a) => {
        const response = await fetchTopAnimes(pageNumber);
        return response.data.top;
    }
);

export const animeSlice = createSlice({
  name: 'animes',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<any>) {
      return {
        ...state,
        favorites: [...state.favorites, action.payload ]
      }
    },
    removeFavorite(state, action: PayloadAction<any>) {
      return {
        ...state,
        favorites: state.favorites.filter(f => f.animeId !== action.payload)
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimes.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchAnimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      })
      .addCase(fetchAnimes.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const page = state.pages.findIndex(p => p.pageNumber === action.meta.arg)
          if (page < 0) {
            state.pages.push({ pageNumber: action.meta.arg, content: action.payload })
          } else {
            state.pages[page] = { pageNumber: action.meta.arg, content: action.payload }
          }
        }
      });
  },
});

export const { addFavorite, removeFavorite } = animeSlice.actions;
export default animeSlice.reducer;
