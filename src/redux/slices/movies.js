import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const { data } = await axios.get("/movies");
  return data;
});

export const fetchDeleteMovie = createAsyncThunk(
  "movies/fetchDeleteMovie",
  async (id) => axios.delete(`/movies/${id}`)
);

export const fetchAddMovie = createAsyncThunk(
  "/movies/fetchAddMovie",
  async (params) => {
    const { data } = await axios.post("/movies", params);
    return data;
  }
);

const initialState = {
  movies: {
    items: [],
    status: "loading",
  },
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMovies.pending]: (state) => {
      state.movies.items = [];
      state.movies.status = "loading";
    },
    [fetchMovies.fulfilled]: (state, action) => {
      state.movies.items = action.payload;
      state.movies.status = "loaded";
    },
    [fetchMovies.rejected]: (state) => {
      state.movies.items = [];
      state.movies.status = "error";
    },
    [fetchDeleteMovie.pending]: (state, action) => {
      state.movies.items = state.movies.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
  },
});

export const moviesReducer = movieSlice.reducer;
