import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUPiWithdrawApi,
  withdrawApi,
} from "../apis/api";

export const WithdrawAmount = createAsyncThunk(
  "upiwithdraw/withdraw",
  async (payload, thunkAPI) => {
    try {
      const data = await withdrawApi(payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Withdraw failed" }
      );
    }
  }
);
export const FetchUpiWithdraw = createAsyncThunk(
  "upiwithdraw/fetch",
  async (_, thunkAPI) => {
    try {
      const data = await fetchUPiWithdrawApi();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Withdraw failed" }
      );
    }
  }
);


const withdrawByUPISlice = createSlice({
  name: "upiwithdraw",
  initialState: {
    upi: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(WithdrawAmount.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(WithdrawAmount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.upi.push(action.payload.data.data);
      })
      .addCase(WithdrawAmount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //fetch
      .addCase(FetchUpiWithdraw.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(FetchUpiWithdraw.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.upi = (action.payload.data.data);
      })
      .addCase(FetchUpiWithdraw.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export default withdrawByUPISlice.reducer;
