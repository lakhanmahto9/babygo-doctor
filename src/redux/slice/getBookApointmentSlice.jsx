import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBookApointmentApi,  } from "../apis/api";



export const GetBookApointment = createAsyncThunk(
  "apointment",
  async (payload, thunkAPI) => {
    try {
      const data = await getBookApointmentApi(payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Fetching failed" }
      );
    }
  }
);

const getBookApointmentSlice = createSlice({
  name: "apointment",
  initialState: {
    apointment: [],
    status: "idle",
    error: null,
   
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetBookApointment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(GetBookApointment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.apointment = action.payload.data.result;
      })
      .addCase(GetBookApointment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

  },
});

export default getBookApointmentSlice.reducer;

