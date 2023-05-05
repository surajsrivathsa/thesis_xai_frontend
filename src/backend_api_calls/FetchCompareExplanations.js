import axios from "axios";
import { SYSTEMS_TO_API_ENDPOINT_MAPPING } from "../components/constants";

function FetchCompareExplanations(compareBooksCheckedList) {
  console.log("comparision books : ", compareBooksCheckedList);
  var comparedExplanations = null;
  var system_type = JSON.parse(sessionStorage.getItem("system_type"));
  var endpointAPI = SYSTEMS_TO_API_ENDPOINT_MAPPING[system_type]["comparision"];
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${endpointAPI}`,
        {
          selected_book_lst: compareBooksCheckedList,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
              "PUT, POST, GET, DELETE, PATCH, OPTIONS",
          },
        }
      ) // add headers for cors - https://stackoverflow.com/questions/45975135/access-control-origin-header-error-using-axios
      .then((response) => {
        comparedExplanations = response.data;
        console.log("compared explanations : ", comparedExplanations);
        resolve(response);
      })
      .catch((error) => {
        console.log("error in comparing explanations: ", error);
        reject(comparedExplanations);
      });
  });
}

export default FetchCompareExplanations;
