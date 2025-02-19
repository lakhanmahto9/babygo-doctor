import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoctorMultipleAddressApi,
  editDoctorMultipleAddressApi,
  getDoctorMultipleAddressApi,
} from "../apis/api";

export const addApointAddress = createAsyncThunk(
  "postapointmentaddress",
  async (payload, thunkAPI) => {
    try {
      const data = await addDoctorMultipleAddressApi(payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Address added failed" }
      );
    }
  }
);

export const getApointAddress = createAsyncThunk(
  "getapointmentaddress",
  async (_, thunkAPI) => {
    try {
      const data = await getDoctorMultipleAddressApi();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Address fetch failed" }
      );
    }
  }
);

export const editApointAddress = createAsyncThunk(
  "editapointmentaddress",
  async (payload, thunkAPI) => {
    try {
      const data = await editDoctorMultipleAddressApi(payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Address update failed" }
      );
    }
  }
);
const multipleAddressSlice = createSlice({
  name: "apointmentaddress",
  initialState: {
    address: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch
      .addCase(getApointAddress.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getApointAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload.data.data);
        state.address = action.payload.data.data;
      })
      .addCase(getApointAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // add address
      .addCase(addApointAddress.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addApointAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.address.push(action.payload.data.data);
      })
      .addCase(addApointAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //update
      .addCase(editApointAddress.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editApointAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.address.findIndex(
          (item) => item._id === action.payload.data.data._id
        );

        if (index !== -1) {
          state.address[index] = action.payload.data.data;
        }
      })
      .addCase(editApointAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default multipleAddressSlice.reducer;
