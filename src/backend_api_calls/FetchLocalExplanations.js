import axios from "axios";
import { SYSTEMS_TO_API_ENDPOINT_MAPPING } from "../components/constants";

function FetchLocalExplanations(localExplanationInfoJSON) {
  console.log("localExplanationInfoJSON: ", localExplanationInfoJSON);
  var localExplanation = [];
  var system_type = JSON.parse(sessionStorage.getItem("system_type"));
  var endpointAPI =
    SYSTEMS_TO_API_ENDPOINT_MAPPING[system_type]["local_explanation"];
  return new Promise((resolve, reject) => {
    axios
      .post(`${endpointAPI}`, localExplanationInfoJSON, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((response) => {
        console.log("backend response story pace: ", response);
        localExplanation = [
          response.data.story_pace[0],
          response.data.story_pace[1],
          response.data.w5_h1_facets[0],
          response.data.w5_h1_facets[1],
          response.data.lrp_genre[0],
          response.data.lrp_genre[1],
        ];
        console.log("New Local Explanation: ", localExplanation);
        resolve(localExplanation);
      })
      .catch((error) => {
        console.log(error);
        reject(localExplanation);
      });
  });
}

export default FetchLocalExplanations;
