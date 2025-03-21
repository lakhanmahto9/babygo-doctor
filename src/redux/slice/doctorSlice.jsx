import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createDoctorApi,
    // deleteDoctorApi,
    fetchDoctorApi,
    updateDoctorApi,
} from "../apis/api";

export const AddDoctor = createAsyncThunk(
    "doctor/adddoctor",
    async (payload, thunkAPI) => {
        try {
            const data = await createDoctorApi(payload);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Doctor added failed" }
            );
        }
    }
);

export const GetDoctor = createAsyncThunk(
    "doctor/getdoctor",
    async (_, thunkAPI) => {
        try {
            const data = await fetchDoctorApi();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Address fetch failed" }
            );
        }
    }
);

export const EditDoctorInfo = createAsyncThunk(
    "doctor/editdoctor",
    async (payload, thunkAPI) => {
        try {
            const data = await updateDoctorApi(payload);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Doctor update failed" }
            );
        }
    }
);

// export const DeleteDoctorDetails = createAsyncThunk(
//     "doctor/delete",
//     async (id, thunkAPI) => {
//         try {
//             const data = await deleteDoctorApi(id);
//             return { id, data };
//         } catch (error) {
//             return thunkAPI.rejectWithValue(
//                 error.response?.data || { message: "Delete failed" }
//             );
//         }
//     }
// );

const addDoctorSlice = createSlice({
    name: "doctor",
    initialState: {
        doctor: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch doctor
            .addCase(GetDoctor.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(GetDoctor.fulfilled, (state, action) => {
                state.status = "succeeded";
                console.log(action.payload.data.data);
                state.doctor = action.payload.data.data;
            })
            .addCase(GetDoctor.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // add address
            .addCase(AddDoctor.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(AddDoctor.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.doctor.push(action.payload.data.data);
            })
            .addCase(AddDoctor.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            //update
            .addCase(EditDoctorInfo.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(EditDoctorInfo.fulfilled, (state, action) => {
                console.log(action.payload);
                state.status = "succeeded";
                const index = state.doctor.findIndex(
                    (item) => item._id === action.payload.data.data._id
                );

                if (index !== -1) {
                    state.doctor[index] = action.payload.data.data;
                }
            })
            .addCase(EditDoctorInfo.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Delete
            // .addCase(DeleteDoctorDetails.pending, (state) => {
            //     state.status = "loading";
            //     state.error = null;
            // })
            // .addCase(DeleteDoctorDetails.fulfilled, (state, action) => {
            //     state.status = "succeeded";
            //     state.doctor = state.doctor.filter(
            //         (item) => item._id !== action.payload.id
            //     );
            // })
            // .addCase(DeleteDoctorDetails.rejected, (state, action) => {
            //     state.status = "failed";
            //     state.error = action.payload;
            // });
    },
});

export default addDoctorSlice.reducer;
