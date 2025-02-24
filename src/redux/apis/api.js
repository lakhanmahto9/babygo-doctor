import { BASE_URL } from "../../../baseUrl";
import axios from "axios";

export const doctorRegister = (payload) => {
    return axios.post(`${BASE_URL}/doctor/doctor-register`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  };
  
  export const doctorLogin = (payload) => {
    return axios.post(`${BASE_URL}/doctor/doctor-login`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  };

  export const updateProfileInformationApi = (payload) => {
    return axios.post(`${BASE_URL}/doctor/prodile-update`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  };

  export const addDoctorMultipleAddressApi = (payload) => {
    return axios.post(`${BASE_URL}/doctor/add-doctor-multiple-address`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  };

  export const getDoctorMultipleAddressApi = () => {
    return axios.get(`${BASE_URL}/doctor/get-doctor-apointment-address`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  };

  export const editDoctorMultipleAddressApi = (payload) => {
    return axios.post(`${BASE_URL}/doctor/edit-doctor-apointment-address/${payload.id}`, payload.item, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  };

  export const getBookApointmentApi = () => {
    return axios.get(`${BASE_URL}/doctor/get-book-apointment`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  };

  export const changeStatusApointmentApi = (payload) => {
    return axios.get(`${BASE_URL}/doctor/change-apointment-status/${payload}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  };