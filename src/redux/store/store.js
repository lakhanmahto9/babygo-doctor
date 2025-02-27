import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import darkModeReducer from "../slice/darkModeSlice";
import authReducer from "../slice/authSlice";
import multipleAddressSlice from "../slice/addMultipleAddressSlice";
import getBookApointmentSlice from "../slice/getBookApointmentSlice";
import uploadCertificateSlice from "../slice/addAndUpdateCertificateSlice";
import multipleBankSlice from "../slice/addBankDetailSlice";
import multipleUpiSlice from "../slice/addUpiDetailSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedDarkModeReducer = persistReducer(persistConfig, darkModeReducer);
const persistAuth = persistReducer(
  { ...persistConfig, key: "auth" },
  authReducer
);
const persistApointmentAddress = persistReducer(
  { ...persistConfig, key: "apointmentaddress" },
  multipleAddressSlice
);
const persistBookApointment = persistReducer(
  { ...persistConfig, key: "apointment" },
  getBookApointmentSlice
);
const persistCertificate = persistReducer(
  { ...persistConfig, key: "certificate" },
  uploadCertificateSlice
);
const persistBankDetails = persistReducer(
  { ...persistConfig, key: "bank" },
  multipleBankSlice
);
const persistUpiDetails = persistReducer(
  { ...persistConfig, key: "upi" },
  multipleUpiSlice
);
const store = configureStore({
  reducer: {
    darkmode: persistedDarkModeReducer,
    auth: persistAuth,
    apointmentaddress: persistApointmentAddress,
    apointment: persistBookApointment,
    certificate: persistCertificate,
    bank: persistBankDetails,
    upi: persistUpiDetails,
  },
});

const persistor = persistStore(store);

export { store, persistor };
