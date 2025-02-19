import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import darkModeReducer from "../slice/darkModeSlice";
import authReducer from "../slice/authSlice";
import multipleAddressSlice from "../slice/addMultipleAddressSlice";

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
const store = configureStore({
  reducer: {
    darkmode: persistedDarkModeReducer,
    auth: persistAuth,
    apointmentaddress:persistApointmentAddress
  },
});




const persistor = persistStore(store);

export { store, persistor };
