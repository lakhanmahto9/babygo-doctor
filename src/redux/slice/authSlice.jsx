import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doctorLogin, doctorRegister, updateProfileInformationApi } from "../apis/api";



export const DoctorRegister = createAsyncThunk(
  "signup",
  async (payload, thunkAPI) => {
    try {
      const data = await doctorRegister(payload);
      console.log(data)
      localStorage.setItem("access_token", data.data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

export const DoctorLogin = createAsyncThunk(
  "login",
  async (payload, thunkAPI) => {
    try {
      const data = await doctorLogin(payload);
      localStorage.setItem("access_token", data.data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

export const updateProfileInformation = createAsyncThunk(
  "update",
  async (payload, thunkAPI) => {
    try {
      const data = await updateProfileInformationApi(payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("access_token") || null,
    status: "idle",
    error: null,
    uploadStatus: {
      profilePic: "idle",
      idCard: "idle",
    },
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("access_token");
    },
    updateProfileImage: (state, action) => {
      if (state.user?.data) {
        state.user.data.profile_pic = action.payload.image; // Update the profile picture in state
        // console.log(action.payload)
      }
      // console.log(action.payload)
    },
    updateIdCardImage: (state, action) => {
      console.log(state,action.payload)
      if (state.user?.data) {
        state.user.data.idCard = action.payload.image; 
        // console.log(action.payload)
      }
      // console.log(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(DoctorRegister.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(DoctorRegister.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.data;
      })
      .addCase(DoctorRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(DoctorLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(DoctorLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.data;
      })
      .addCase(DoctorLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // update
      .addCase(updateProfileInformation.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateProfileInformation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = { ...state.user, ...action.payload.data };
      })
      .addCase(updateProfileInformation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

  },
});

export const { logout, updateProfileImage,updateIdCardImage } = authSlice.actions;
export default authSlice.reducer;

