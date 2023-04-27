import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUS = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});
const DataSlice = createSlice({
  name: "summary",
  initialState: {
    data: "",
    Status: STATUS.IDLE,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch.pending, (state, action) => {
        state.Status = STATUS.LOADING;
      })
      .addCase(fetch.fulfilled, (state, action) => {
        state.data = action.payload;
        state.Status = STATUS.IDLE;
      })
      .addCase(fetch.rejected, (state, action) => {
        state.Status = STATUS.ERROR;
      });
  },
});
export const fetch = createAsyncThunk("summary/fetch", async (params) => {
  try {
    const res = await axios(
      "https://article-extractor-and-summarizer.p.rapidapi.com/summarize",
      {
        params: { url: params, length: 3 },
        headers: {
          "content-type": "application/octet-stream",
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
          "X-RapidAPI-Host": "article-extractor-and-summarizer.p.rapidapi.com",
        },
      }
    );
    return res.data;
  } catch (err) {}
});

export default DataSlice.reducer;
