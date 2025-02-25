import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addAndUpdateCertificateApi, fetchCertificateApi  } from "../apis/api";

export const CertificateUpload = createAsyncThunk(
  "certificate/upload",
  async (payload, thunkAPI) => {
    try {
      const data = await addAndUpdateCertificateApi(payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Upload failed" }
      );
    }
  }
);

export const GetCertificateUpload = createAsyncThunk(
    "certificate/fetch",
    async (_, thunkAPI) => {
      try {
        const data = await fetchCertificateApi();
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data || { message: "Fetch failed" }
        );
      }
    }
  );


const uploadCertificateSlice = createSlice({
  name: "certificate",
  initialState: {
    certificate: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CertificateUpload.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(CertificateUpload.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.certificate = action.payload.data.data;
      })
      .addCase(CertificateUpload.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

    //   fetch
    .addCase(GetCertificateUpload.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(GetCertificateUpload.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.certificate = action.payload.data.data;
      })
      .addCase(GetCertificateUpload.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export default uploadCertificateSlice.reducer;
