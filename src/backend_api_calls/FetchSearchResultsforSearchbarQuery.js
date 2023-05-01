import axios from "axios";
import {
  SEARCHBAR_BOOKS,
  DUMMY_BOOKS,
  DEFAULT_LOCAL_EXPLANATION,
  FACET_KEYS,
  SYSTEMS_TO_API_ENDPOINT_MAPPING,
} from "../components/constants";

function FetchSearchResultsforSearchbarQuery(
  clickedQuery,
  isEditable,
  userFacetWeights
) {
  var searchBarQuery = { ...clickedQuery.clickedBook };
  console.log("clicked query inside fetch: ", searchBarQuery);
  var searchResults = DUMMY_BOOKS;

  var system_type = JSON.parse(sessionStorage.getItem("system_type"));
  var endpointAPI = SYSTEMS_TO_API_ENDPOINT_MAPPING[system_type]["search_bar"];

  return new Promise((resolve, reject) => {
    axios
      .post(
        `${endpointAPI}`,
        {
          searchbar_query: searchBarQuery,
          generate_fake_clicks: isEditable,
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
        console.log("response SERP from api: ", searchResults);
        console.log("all response: ", response);
        resolve(response);
      })
      .catch((error) => {
        console.log("error in landing page to grid search: ", error);
        reject(searchResults);
      });
  });
}

export default FetchSearchResultsforSearchbarQuery;
