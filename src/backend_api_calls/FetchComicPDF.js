import axios from "axios";
import { SYSTEMS_TO_API_ENDPOINT_MAPPING } from "../components/constants";

function FetchComicPDF(viewBook) {
  console.log("viewing book : ", viewBook);
  var pdfUrl = null;
  var system_type = JSON.parse(sessionStorage.getItem("system_type"));
  var endpointAPI = SYSTEMS_TO_API_ENDPOINT_MAPPING[system_type]["view_pdf"];
  return new Promise((resolve, reject) => {
    axios
      .get(`${endpointAPI}/${viewBook.comic_no}`, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log("error in viewing pdf: ", error);
        reject(pdfUrl);
      });
  });
}

export default FetchComicPDF;
