import jsPDF from "jspdf";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { DocumentIcon } from "../../assets/icons/Icons";
import moment from "moment";
import { useSelector } from "react-redux";
import { useThemeColors } from "../../utils/useThemeColor";

const ApointmentDetails = ({ apointmentdata }) => {
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  // console.log(apointmentdata);
  const contentRef = useRef();
  const generatePdf = async () => {
    const element = contentRef.current;
    const scale = 2;
    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.text(`Dr. ${apointmentdata.name}`, pdfWidth - 60, pageHeight - 20);

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("apointmentletter.pdf");
  };

  return (
    <div>
      <div
        ref={contentRef}
        style={{
          width: "600px",
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          padding: 20,
        }}
      >
        <div className="w-full">
          <div className="w-full flex justify-center items-center">
            <p className="text-sm font-semibold">APPOINTMENT FOR PETS</p>
          </div>
          <hr className="h-0.5 w-full my-2 bg-black border-none" />
          <div className="flex justify-between">
            <div className="">
              <p className="text-sm font-semibold">
                #{apointmentdata.apointmentNumber}
              </p>
              <p className="text-xs">
                Appointment Date :-{" "}
                {moment(apointmentdata.apointmentDate).format("MMM, DD-YYYY")}
              </p>
              <p className="text-xs">
                Clinic Name :- {apointmentdata.clinicName}
              </p>
              <p className="text-xs">
                Visiting Time :- {apointmentdata.startTime} TO{" "}
                {apointmentdata.endTime}
              </p>
              <p className="text-xs">
                Clinic Address :- {apointmentdata.address},{" "}
                {apointmentdata.locality}, {apointmentdata.city}
              </p>
              <p className="text-xs">
                {apointmentdata.state} - {apointmentdata.zipCode}
              </p>
            </div>
            <div className="">
              <p className="text-xs">GSTIN :- 22AAAAA0000A1Z5</p>
              <p className="text-xs">
                Registration Fees :- {apointmentdata.amount}
              </p>
              <p className="text-xs">Order ID :- {apointmentdata.orderId}</p>
              <p className="text-xs">
                Owner Name :- {apointmentdata.petOwnerName}
              </p>
              <p className="text-xs">
                Contact No :- {apointmentdata.petOwnerPhoneNumber}
              </p>
              <p className="text-xs">
                Address :- {apointmentdata.petOwnerAddress}
              </p>
            </div>
          </div>
          <hr className="h-0.5 w-full my-2 bg-black border-none" />
          <div className="w-full flex flex-col">
            <div className="w-2/3 flex gap-8">
              <p className="w-1/3 text-xs font-mono">Sr no</p>
              <p className="w-1/3 text-xs font-mono">Breed Type</p>
              <p className="w-1/3 text-xs font-mono">Age</p>
            </div>
            <div className="w-2/3 flex gap-8">
              <p className="w-1/3 text-xs">1</p>
              <p className="w-1/3 text-xs">{apointmentdata.breedType}</p>
              <p className="w-1/3 text-xs">{apointmentdata.breedAge}</p>
            </div>
          </div>
          <hr className="h-0.5 w-full my-2 bg-black border-none" />
        </div>
      </div>
      <div>
        <button
          onClick={generatePdf}
          className={`h-10 border my-2 w-32 flex justify-center items-center rounded-md gap-2 ${isDarkEnabled ? "bg-[#040836] border-gray-600" : " border-[#006afe] "}`}
        >
          <DocumentIcon color={colors.text} width="18" height="18" />{" "}
          <p className={`${isDarkEnabled ? "text-[#D3D3D3]" : "text-[#006afe]"}`}>Download</p>
        </button>
      </div>
    </div>
  );
};

export default ApointmentDetails;
