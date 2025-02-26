import React, { useEffect, useRef, useState } from "react";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import {
  CertificateUpload,
  GetCertificateUpload,
} from "../../redux/slice/addAndUpdateCertificateSlice";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useThemeColors } from "../../utils/useThemeColor";

const Degree = () => {
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  const certificate = useSelector((state) => state.certificate?.certificate);
  // console.log(certificate);
  const dispatch = useDispatch();
  const regCertificate = useRef();
  const expCertificate = useRef();
  const degreeCertificate = useRef();
  const [degree, setDegree] = useState({
    regNo: certificate?.regNo || "",
    experienceNo: certificate?.experienceNo || "",
    degreeCetificateNo: certificate?.degreeCetificateNo || "",
    regCertificate: certificate?.regCertificate || null,
    regCertificatePrev: certificate?.regCertificate || null,
    expCertificate: certificate?.expCertificate || null,
    expCertificatePrev: certificate?.expCertificate || null,
    degreeCertificate: certificate.degreeCertificate || null,
    degreeCertificatePrev: certificate.degreeCertificate || null,
  });

  const [spin, setSpin] = useState(false);

  const handleRegCertificateClick = () => {
    regCertificate.current.click();
  };

  const handleExpCertificateClick = () => {
    expCertificate.current.click();
  };

  const handleDegCertificateClick = () => {
    degreeCertificate.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDegree((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeRegCertificate = (e) => {
    const file = e.target.files[0];
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (file && validTypes.includes(file.type)) {
      setDegree({
        ...degree,
        regCertificate: file,
        regCertificatePrev: URL.createObjectURL(file),
      });
    } else {
      alert("Please upload a valid image (JPG, JPEG, PNG).");
      e.target.value = "";
    }
  };

  const handleRemoveRegCertificate = () => {
    setDegree({
      ...degree,
      regCertificate: null,
      regCertificatePrev: null,
    });
    regCertificate.current.value = "";
  };

  const handleChangeExpCertificate = (e) => {
    const file = e.target.files[0];
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (file && validTypes.includes(file.type)) {
      setDegree({
        ...degree,
        expCertificate: file,
        expCertificatePrev: URL.createObjectURL(file),
      });
    } else {
      alert("Please upload a valid image (JPG, JPEG, PNG).");
      e.target.value = "";
    }
  };
  const handleRemoveExpCertificate = () => {
    setDegree({
      ...degree,
      expCertificate: null,
      expCertificatePrev: null,
    });
    expCertificate.current.value = "";
  };

  const handleChangeDegCertificate = (e) => {
    const file = e.target.files[0];
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (file && validTypes.includes(file.type)) {
      setDegree({
        ...degree,
        degreeCertificate: file,
        degreeCertificatePrev: URL.createObjectURL(file),
      });
    } else {
      alert("Please upload a valid image (JPG, JPEG, PNG).");
      e.target.value = "";
    }
  };
  const handleRemoveDegCertificate = () => {
    setDegree({
      ...degree,
      degreeCertificate: null,
      degreeCertificatePrev: null,
    });
    degreeCertificate.current.value = "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpin(true);
    try {
      const form = new FormData();
      form.append("regNo", degree.regNo);
      form.append("experienceNo", degree.experienceNo);
      form.append("degreeCetificateNo", degree.degreeCetificateNo);
      if (degree.regCertificate) {
        form.append("regCertificate", degree.regCertificate);
      }
      if (degree.expCertificate) {
        form.append("expCertificate", degree.expCertificate);
      }
      if (degree.degreeCertificate) {
        form.append("degreeCertificate", degree.degreeCertificate);
      }
      const result = await dispatch(CertificateUpload(form));
      console.log(result.payload);
      if (result.payload?.data?.success) {
        toast.success(result.payload.data.message);
        setSpin(false);
      } else {
        toast.warning(result.payload.message);
        setSpin(false);
      }
    } catch (error) {
      setSpin(false);
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(GetCertificateUpload());
  }, []);
  return (
    <Profile>
      <div className={`w-full rounded-md border ${isDarkEnabled ? "border-gray-600" : ""}`} style={{ background: colors.background }}>
        <div className="p-4">
          <p className="text-sm font-semibold">
            {" "}
            Add your Experience and Certificate here
          </p>
        </div>
        {/* <hr /> */}
        <div className={`border ${isDarkEnabled ? "border-gray-600" : ""}`}></div>
        <div className="p-4 w-full">
          <div className={`border p-4 w-full ${isDarkEnabled ? "border-gray-600" : " "}`}>
            <form
              onSubmit={handleSubmit}
              className="w-full lg:w-2/3 flex flex-col gap-4"
            >
              <div className="w-full flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-1 w-full sm:w-1/2">
                  <label htmlFor="registration">Registration Number</label>
                  <input
                    name="regNo"
                    value={degree.regNo}
                    onChange={handleInputChange}
                    type="text"
                    required
                    placeholder="Registration Number"
                    className={`outline-blue-700 border h-12 rounded-md px-4 ${isDarkEnabled ? "border-gray-600" : ""}`}
                    style={{ background: colors.secondbackground }}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full sm:w-1/2">
                  <label htmlFor="registration">Experience</label>
                  <select
                    name="experienceNo"
                    value={degree.experienceNo}
                    onChange={handleInputChange}
                    id=""
                    required
                    className={`h-12 border outline-blue-700 rounded-md ${isDarkEnabled ? "border-gray-600" : ""}`}
                    style={{ background: colors.secondbackground }}
                  >
                    <option value="">Select Experience</option>
                    <option value="1 To 3 Years">1 To 3 Years</option>
                    <option value="3 To 6 Years">3 To 6 Years</option>
                    <option value="6 To 10 Years">6 To 10 Years</option>
                    <option value="10+ Years">10+ Years</option>
                  </select>
                </div>
              </div>
              <div className="w-full flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                  <label htmlFor="regcer">
                    Upload Registration Certificate
                  </label>
                  {degree.regCertificatePrev && (
                    <div className="mt-4 border mb-2 rounded-md overflow-hidden h-72">
                      <img
                        src={degree.regCertificatePrev}
                        alt=""
                        className="w-full h-full object-fill"
                      />
                    </div>
                  )}
                  {!degree.regCertificate ? (
                    <button
                      type="button"
                      onClick={handleRegCertificateClick}
                      className="h-12 border w-full bg-blue-600 text-white rounded-md"
                    >
                      Upload Registration Certificate
                    </button>
                  ) : (
                    <div className={`flex gap-2 p-1 bg-blue-600 rounded-md ${isDarkEnabled ? "" : "border"}`}>
                      <button
                        type="button"
                        onClick={handleRegCertificateClick}
                        className={`h-12 w-full bg-green-600 text-white rounded-md ${isDarkEnabled ? "" : "border"}`}
                      >
                        Change
                      </button>
                      <button
                        onClick={handleRemoveRegCertificate}
                        className={`h-12 w-full bg-red-600 text-white rounded-md ${isDarkEnabled ? "" : "border"}`}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  <input
                    ref={regCertificate}
                    type="file"
                    name=""
                    id=""
                    hidden
                    accept="image/jpeg, image/jpg, image/png"
                    onChange={handleChangeRegCertificate}
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <label htmlFor="regcer">Upload Experience Certificate</label>
                  {degree.expCertificatePrev && (
                    <div className="mt-4 border  mb-2 rounded-md h-72 overflow-hidden">
                      <img
                        src={degree.expCertificatePrev}
                        alt=""
                        className="w-full h-full object-fill"
                      />
                    </div>
                  )}
                  {!degree.expCertificate ? (
                    <button
                      type="button"
                      onClick={handleExpCertificateClick}
                      className={`h-12 w-full bg-blue-600 text-white rounded-md ${isDarkEnabled ? "" : " border"}`}
                    >
                      Upload Registration Certificate
                    </button>
                  ) : (
                    <div className={`flex gap-2  p-1 bg-blue-600 rounded-md ${isDarkEnabled ? "" : "border"}`}>
                      <button
                        type="button"
                        onClick={handleExpCertificateClick}
                        className={`h-12  w-full bg-green-600 text-white rounded-md ${isDarkEnabled ? "" : "border"}`}
                      >
                        Change
                      </button>
                      <button
                        onClick={handleRemoveExpCertificate}
                        className={`h-12  w-full bg-red-600 text-white rounded-md ${isDarkEnabled ? "" : "border"}`}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  <input
                    ref={expCertificate}
                    type="file"
                    name=""
                    id=""
                    hidden
                    accept="image/jpeg, image/jpg, image/png"
                    onChange={handleChangeExpCertificate}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-1 w-full sm:w-1/2">
                  <label htmlFor="registration">
                    Degree Certificate Number
                  </label>
                  <input
                    type="text"
                    required
                    name="degreeCetificateNo"
                    value={degree.degreeCetificateNo}
                    onChange={handleInputChange}
                    placeholder="Degree Certificate Number"
                    className={`outline-blue-700 border h-12 rounded-md px-4 ${isDarkEnabled ? "border-gray-600" : ""}`}
                    style={{ background: colors.secondbackground }}
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="w-full sm:w-1/2">
                  <label htmlFor="regcer">Upload Degree Certificate</label>
                  {degree.degreeCertificatePrev && (
                    <div className="mt-4 border mb-2 rounded-md h-72 overflow-hidden">
                      <img
                        src={degree.degreeCertificatePrev}
                        alt=""
                        className="w-full h-full object-fill"
                      />
                    </div>
                  )}
                  {!degree.degreeCertificate ? (
                    <button
                      type="button"
                      onClick={handleDegCertificateClick}
                      className="h-12 border  w-full bg-blue-600 text-white rounded-md"
                    >
                      Upload Degree Certificate
                    </button>
                  ) : (
                    <div className={`flex gap-2 p-1 bg-blue-600 rounded-md ${isDarkEnabled ? " " : "border"}`}>
                      <button
                        type="button"
                        onClick={handleDegCertificateClick}
                        className={`h-12 w-full bg-green-600 text-white rounded-md ${isDarkEnabled ? "" : "border"}`}
                      >
                        Change
                      </button>
                      <button
                        onClick={handleRemoveDegCertificate}
                        className={`h-12 w-full bg-red-600 text-white rounded-md ${isDarkEnabled ? "" : "border"}`}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  <input
                    ref={degreeCertificate}
                    type="file"
                    name=""
                    id=""
                    hidden
                    accept="image/jpeg, image/jpg, image/png"
                    onChange={handleChangeDegCertificate}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full sm:w-1/2 py-2 bg-blue-600 text-white rounded-md"
              >
                {spin ? <CircularProgress size={18} color="white" /> : "SUBMIT"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Profile>
  );
};

export default Degree;
