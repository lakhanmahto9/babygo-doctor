import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addUpiDetailsApi,
  deleteUpiApi,
  editUpiDetailsApi,
  fetchUpiDetailsApi,
} from "../apis/api";

export const AddUpiDetails = createAsyncThunk(
  "upi/add",
  async (payload, thunkAPI) => {
    try {
      const data = await addUpiDetailsApi(payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Bank added failed" }
      );
    }
  }
);

export const EditUpiDetails = createAsyncThunk(
  "upi/edit",
  async (payload, thunkAPI) => {
    try {
      const data = await editUpiDetailsApi(payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "UPI edited failed" }
      );
    }
  }
);

export const DeleteUpiDetails = createAsyncThunk(
  "upi/delete",
  async (id, thunkAPI) => {
    try {
      const data = await deleteUpiApi(id);
      return { id, data };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Delete failed" }
      );
    }
  }
);

export const FetchUPIDetails = createAsyncThunk(
  "upi/fetch",
  async (_, thunkAPI) => {
    try {
      const data = await fetchUpiDetailsApi();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "UPI fetch failed" }
      );
    }
  }
);

const multipleUpiSlice = createSlice({
  name: "upi",
  initialState: {
    upi: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch
      .addCase(FetchUPIDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(FetchUPIDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.upi = action.payload.data.data;
      })
      .addCase(FetchUPIDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // add upi
      .addCase(AddUpiDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(AddUpiDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.upi.push(action.payload.data.data);
      })
      .addCase(AddUpiDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //edited
      .addCase(EditUpiDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(EditUpiDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.upi.findIndex(
          (item) => item._id === action.payload.data.data._id
        );

        if (index !== -1) {
          state.upi[index] = action.payload.data.data;
        }
      })
      .addCase(EditUpiDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete
      .addCase(DeleteUpiDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(DeleteUpiDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.upi = state.upi.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(DeleteUpiDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default multipleUpiSlice.reducer;
