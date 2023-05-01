import axios from "axios";
import {
  SEARCHBAR_BOOKS,
  DUMMY_BOOKS,
  DEFAULT_LOCAL_EXPLANATION,
  FACET_KEYS,
  SYSTEMS_TO_API_ENDPOINT_MAPPING,
} from "../components/constants";

function FetchSearchResultsforBookGrid(
  comic_no,
  generate_fake_clicks,
  allBookInteractionInfoJSON,
  userFacetWeights
) {
  console.log(
    "input parameters: ",
    comic_no,
    generate_fake_clicks,
    allBookInteractionInfoJSON,
    userFacetWeights
  );
  console.log(
    "possible link : http://localhost:8000/book_search?b_id=" +
      comic_no +
      "&generate_fake_clicks=" +
      generate_fake_clicks
  );
  console.log("here");
  var searchResults = DUMMY_BOOKS;

  var system_type = JSON.parse(sessionStorage.getItem("system_type"));
  var endpointAPI = SYSTEMS_TO_API_ENDPOINT_MAPPING[system_type]["book_grid"];

  return new Promise((resolve, reject) => {
    axios
      .post(
        `${endpointAPI}` +
          parseInt(comic_no) +
          "&generate_fake_clicks=" +
          generate_fake_clicks,
        {
          cbl: allBookInteractionInfoJSON,
          input_feature_importance_dict: userFacetWeights,
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
        searchResults = [...response.data[0]];
        console.log("response from api: ", searchResults);
        resolve(response);
      })
      .catch((error) => {
        console.log("error in landing page to grid search: ", error);
        reject(searchResults);
      });
  });
}

export default FetchSearchResultsforBookGrid;
