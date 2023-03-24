import axios from "axios";
import {
  SEARCHBAR_BOOKS,
  DUMMY_BOOKS,
  DEFAULT_LOCAL_EXPLANATION,
  FACET_KEYS,
} from "../components/constants";

function FetchSearchResultsforSearchbarQuery(clickedQuery) {
  var searchBarQuery = { ...clickedQuery.clickedBook };
  console.log("clicked query inside fetch: ", searchBarQuery);
  var searchResults = DUMMY_BOOKS;
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://localhost:8000/book_search_with_searchbar_inputs",
        searchBarQuery,
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
        resolve(searchResults);
      })
      .catch((error) => {
        console.log("error in landing page to grid search: ", error);
        reject(searchResults);
      });
  });
}

export default FetchSearchResultsforSearchbarQuery;
