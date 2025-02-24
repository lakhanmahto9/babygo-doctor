import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { changeStatusApointmentApi, getBookApointmentApi } from "../apis/api";

export const GetBookApointment = createAsyncThunk(
  "apointment/fetch",
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

export const ChangeStatusApointment = createAsyncThunk(
  "apointment/change",
  async (payload, thunkAPI) => {
    try {
      const data = await changeStatusApointmentApi(payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Status change failed" }
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
      })
      //update

      .addCase(ChangeStatusApointment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(ChangeStatusApointment.fulfilled, (state, action) => {
        state.status = "succeeded";

        const updatedAppointment = action.payload.data.result;
        console.log(updatedAppointment)
        const index = state.apointment.findIndex(
          (item) => item._id === updatedAppointment._id
        );

        if (index !== -1) {
          state.apointment[index] = {
            ...state.apointment[index],
            status: updatedAppointment.status,
          };
        }
      })
      .addCase(ChangeStatusApointment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default getBookApointmentSlice.reducer;
