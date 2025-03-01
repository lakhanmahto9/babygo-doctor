import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addBankDetailsApi,
  deleteBankApi,
  editBankDetailsApi,
  fetchBankDetailsApi,
} from "../apis/api";

export const AddBankDetails = createAsyncThunk(
  "bank/add",
  async (payload, thunkAPI) => {
    try {
      const data = await addBankDetailsApi(payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Bank added failed" }
      );
    }
  }
);
export const EditBankDetails = createAsyncThunk(
  "bank/edit",
  async (payload, thunkAPI) => {
    try {
      const data = await editBankDetailsApi(payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Bank edited failed" }
      );
    }
  }
);
export const FetchBankDetails = createAsyncThunk(
  "bank/fetch",
  async (_, thunkAPI) => {
    try {
      const data = await fetchBankDetailsApi();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Bank fetch failed" }
      );
    }
  }
);

export const DeleteBankDetails = createAsyncThunk(
  "bank/delete",
  async (id, thunkAPI) => {
    try {
      const data = await deleteBankApi(id);
      return { id, data };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Delete failed" }
      );
    }
  }
);

const multipleBankSlice = createSlice({
  name: "bank",
  initialState: {
    bank: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch
      .addCase(FetchBankDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(FetchBankDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bank = action.payload.data.data;
      })
      .addCase(FetchBankDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // add address
      .addCase(AddBankDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(AddBankDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bank.push(action.payload.data.data);
      })
      .addCase(AddBankDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //edited
      .addCase(EditBankDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(EditBankDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.bank.findIndex(
          (item) => item._id === action.payload.data.data._id
        );

        if (index !== -1) {
          state.bank[index] = action.payload.data.data;
        }
      })
      .addCase(EditBankDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete
      .addCase(DeleteBankDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(DeleteBankDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bank = state.bank.filter((item) => item._id !== action.payload.id);
      })
      .addCase(DeleteBankDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default multipleBankSlice.reducer;
