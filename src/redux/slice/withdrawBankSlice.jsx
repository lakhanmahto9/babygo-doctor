import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBankWithdrawApi, withdrawApi } from "../apis/api";

export const WithdrawBankAmount = createAsyncThunk(
  "withdrawbank/withdrawbank",
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

export const FetchBankAmount = createAsyncThunk(
  "withdrawbank/fetch",
  async (payload, thunkAPI) => {
    try {
      const data = await fetchBankWithdrawApi(payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Withdraw failed" }
      );
    }
  }
);

const withdrawByBankSlice = createSlice({
  name: "withdrawbank",
  initialState: {
    bank: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(WithdrawBankAmount.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(WithdrawBankAmount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bank.push(action.payload.data.data);
      })
      .addCase(WithdrawBankAmount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // fetch
      .addCase(FetchBankAmount.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(FetchBankAmount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bank = action.payload.data.data;
      })
      .addCase(FetchBankAmount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default withdrawByBankSlice.reducer;
