import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookGrid.css";
import BarchartApp from "../components/global_explanation";
import {
  LinechartApp,
  FacetKeywordsComp,
  StoryPaceExplanation,
} from "../components/local_explanation";
import SearchContainer from "../components/search_bar";
import {
  SEARCHBAR_BOOKS,
  DUMMY_BOOKS,
  DEFAULT_LOCAL_EXPLANATION,
  FACET_KEYS,
} from "../components/constants";
import React, { useState, useRef, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import GlobalExplanationSliderGrid from "../components/global_explanation_slider";
import FetchSearchResultsforSearchbarQuery from "../backend_api_calls/FetchSearchResultsforSearchbarQuery";
import FetchSearchResultsForBookGrid from "../backend_api_calls/FetchSearchResultsForBookGrid";
import ExplanationChips from "../components/global_explanation_relevance_feedback";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";

const img_folderpath = "../../comic_book_covers_ui/"; ///process.env.PUBLIC_URL + Users/surajshashidhar/Downloads/comic_book_covers_ui";

const initial_chips = [
  {
    comic_no: 0,
    book_title: "BBlue Bolt",
    genre: "Superhero",
    year: 1950,
    query_book: false,
    explanation_lst: ["No Themes Found"],
  },
];

function HomeLogo() {
  return (
    <div className="home-logo">
      <Link to="/">
        <img
          src="../../logo192.png"
          alt="Home"
          style={{ height: "50px", width: "50px" }}
        />
      </Link>
    </div>
  );
}

function BookGrid(props) {
  const { state } = useLocation();
  let books_from_landing_page = null;
  let q = null;
  let { id } = useParams();
  useEffect(() => {
    console.log("clicked path: ", `/search/${id}`);
  }, [id]);

  const [searchValue, setSearchValue] = useState("");
  const [books, setBooks] = useState(DUMMY_BOOKS);
  const [currentQueryBook, setCurrentQueryBook] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [globalExplanation, setGlobalExplanation] = useState([
    {
      genre_comb: 1.0,
      supersense: 1.0,
      gender: 1.0,
      panel_ratio: 1.0,
      comic_cover_img: 1.0,
      comic_cover_txt: 1.0,
    },
    {
      genre_comb: 1.0,
      supersense: 1.0,
      gender: 1.0,
      panel_ratio: 1.0,
      comic_cover_img: 1.0,
      comic_cover_txt: 1.0,
    },
  ]);
  const [searchBarInput, setSearchBarInput] = useState({
    typedQuery: "",
    clickedQuery: {},
  });
  const [localExplanation, setLocalExplanation] = useState(
    DEFAULT_LOCAL_EXPLANATION
  );

  // new states using hover
  // handle hovering or interested books
  const [hoveredBook, setHoveredBook] = useState(null);
  // for delaying hovering action, delay of 1 second before capturing hover
  const [showOverlay, setShowOverlay] = useState(false);
  const timeoutRef = useRef(null);
  const [hoveredBookList, setHoveredBookList] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [relevanceFeedbackExplanation, setRelevanceFeedbackExplanation] =
    useState(initial_chips);

  const handleMouseEnter = (book) => {
    timeoutRef.current = setTimeout(() => {
      setShowOverlay(true);
      setHoveredBook(book);
      setHoveredBookList((prevList) => [...prevList, book]);
      console.log("hovered book: ", book);
      console.log("hovered book list: ", hoveredBookList.length);
      // get session storage
      sessionStorage.setItem(
        "hoveredBookList",
        JSON.stringify(hoveredBookList)
      );
      // show local explanations
      var localExplanationInfoJSON = {
        selected_book_lst: [{ ...currentQueryBook, query_book: true }, book],
      };
      console.log("localExplanationInfoJSON: ", localExplanationInfoJSON);

      axios
        .post(
          "http://localhost:8000/local_explanation",
          localExplanationInfoJSON,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
              "Access-Control-Allow-Credentials": true,
            },
          }
        )
        .then((response) => {
          console.log("backend response story pace: ", response);
          setLocalExplanation([
            response.data.story_pace[0],
            response.data.story_pace[1],
            response.data.w5_h1_facets[0],
            response.data.w5_h1_facets[1],
            response.data.lrp_genre[0],
            response.data.lrp_genre[1],
          ]);
          console.log("New Local Explanation: ", localExplanation);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setShowOverlay(false);
    setHoveredBook(null);
    setLocalExplanation(DEFAULT_LOCAL_EXPLANATION);
  };

  const handleClick = (book) => {
    // issue for query only if it is not already query book
    if (!book.query_book) {
      // set selected query book as clicked book
      setCurrentQueryBook(book);

      // find uninterested books which were not hovered by user
      var unInterestedBookList = books
        .filter(
          ({ comic_no: id1 }) =>
            !hoveredBookList.some(({ comic_no: id2 }) => id2 === id1)
        )
        .map((e) => {
          e.interested = 0.0;
          return e;
        });

      // remove duplicate clicks
      var allBookInteractionInfoList = [
        ...hoveredBookList.map((e) => {
          e.interested = 1.0;
          return e;
        }),
      ];
      var allBookInteractionInfoUniqList = [
        ...new Map(
          allBookInteractionInfoList.map((v) => [v.comic_no, v])
        ).values(),
      ];

      // add uninterested and interested books
      var allBookInteractionInfoJSON = {
        interested_book_lst: [
          ...allBookInteractionInfoUniqList,
          ...unInterestedBookList,
        ],
      };
      console.log("all interaction info books ", allBookInteractionInfoJSON);
      try {
        let fetchSearchResultsforBookGridPromise =
          FetchSearchResultsForBookGrid(
            book.comic_no,
            isEditable,
            allBookInteractionInfoJSON,
            globalExplanation[1]
          );
        fetchSearchResultsforBookGridPromise
          .then((response) => {
            setHoveredBookList([]); // clear the current window and set clicked list as query book
            setBooks(response.data[0]);
            setFilteredBooks(response.data[0]);
            setGlobalExplanation([globalExplanation[1], response.data[1]]);
            setRelevanceFeedbackExplanation(
              response.data[2].relevance_feedback_explanation
            );
            console.log("New Global Explanation: ", globalExplanation);
            console.log(
              "relevance feedback explanation: ",
              response.data[2].relevance_feedback_explanation
            );

            // adding results to session storage
            sessionStorage.setItem("books", JSON.stringify(response.data[0]));
            sessionStorage.setItem(
              "filteredBooks",
              JSON.stringify(response.data[0])
            );
            sessionStorage.setItem(
              "globalExplanation",
              JSON.stringify([globalExplanation[1], response.data[1]])
            );
            sessionStorage.setItem("hoveredBookList", JSON.stringify([]));
            sessionStorage.setItem("currentQueryBook", JSON.stringify(book));
            sessionStorage.setItem(
              "relevanceFeedbackExplanation",
              JSON.stringify(response.data[2].relevance_feedback_explanation)
            );
          })
          .catch((error) => {
            throw error;
          });
      } catch (error) {
        // handle rejected Promise/error/etc...
        console.log("error during navigation: ", error);
      }
    }
  };

  const handleSearchBarQueryClick = (queryBook) => {
    if (queryBook) {
      var searchBarQuery = { ...queryBook };
      console.log("searchBarQuery: ", searchBarQuery);
      try {
        let fetchSearchResultsforSearchBarPromise =
          FetchSearchResultsforSearchbarQuery(
            { clickedBook: { ...queryBook } },
            isEditable,
            globalExplanation[1]
          );

        fetchSearchResultsforSearchBarPromise
          .then((response) => {
            var defaultHoveredBookList = [
              {
                id: searchBarQuery.id,
                comic_no: searchBarQuery.comic_no,
                book_title: searchBarQuery.book_title,
                genre: "",
                year: 1950,
                genre_comb: 1.0,
                supersense: 1.0,
                gender: 1.0,
                panel_ratio: 1.0,
                comic_cover_img: 1.0,
                comic_cover_txt: 1.0,
              },
            ];
            if (searchBarQuery.type === "book") {
              setHoveredBookList(defaultHoveredBookList); // clear the current window and set clicked list as query book
            }

            // console.log(response);
            // console.log("current clicked book list ", currentWindowClickedBookList);
            setBooks(response.data[0]);
            setFilteredBooks(response.data[0]);
            setGlobalExplanation([
              globalExplanation[1],
              {
                genre_comb: 1.0,
                supersense: 1.0,
                gender: 1.0,
                panel_ratio: 1.0,
                comic_cover_img: 1.0,
                comic_cover_txt: 1.0,
              },
            ]);
            console.log("New Global Explanation: ", globalExplanation);
            console.log(
              "search results for searchbar input: ",
              response.data[0]
            );

            // adding results to session storage
            sessionStorage.setItem("books", JSON.stringify(response.data[0]));
            sessionStorage.setItem(
              "filteredBooks",
              JSON.stringify(response.data[0])
            );
            sessionStorage.setItem(
              "globalExplanation",
              JSON.stringify([globalExplanation[1], response.data[1]])
            );
            sessionStorage.setItem(
              "hoveredBookList",
              JSON.stringify(defaultHoveredBookList)
            );
            sessionStorage.setItem(
              "currentQueryBook",
              JSON.stringify({
                id: searchBarQuery.id,
                comic_no: searchBarQuery.comic_no,
                book_title: searchBarQuery.book_title,
                genre: "",
                year: 1950,
                genre_comb: 1.0,
                supersense: 1.0,
                gender: 1.0,
                panel_ratio: 1.0,
                comic_cover_img: 1.0,
                comic_cover_txt: 1.0,
              })
            );
            sessionStorage.setItem(
              "relevanceFeedbackExplanation",
              JSON.stringify(response.data[2].relevance_feedback_explanation)
            );
          })
          .catch((error) => {
            throw error;
          });
      } catch (error) {
        // handle rejected Promise/error/etc...
        console.log("error during navigation: ", error);
      }
    }

    if (searchBarQuery.type === "book") {
      // set selected query book as clicked book
      setCurrentQueryBook({
        id: searchBarQuery.id,
        comic_no: searchBarQuery.comic_no,
        book_title: searchBarQuery.book_title,
        genre: "",
        year: 1950,
        genre_comb: 1.0,
        supersense: 1.0,
        gender: 1.0,
        panel_ratio: 1.0,
        comic_cover_img: 1.0,
        comic_cover_txt: 1.0,
      });
    }
  };

  const ProcessSearchBarInput = (searchBarSelectedData) => {
    console.log("received form search bar: ", searchBarInput);
    setSearchBarInput(searchBarSelectedData);

    console.log("searchBarInput: ", searchBarInput);
  };

  // handle users changes on slider
  const handleGlobalExplanationSliderSubmit = (data) => {
    if (data.isEditable === true) {
      var newGlobalExplanation = [
        globalExplanation[1],
        data.userChosenFacetWeights,
      ];

      // set state of global explnanation to user provided and set editable flag
      setGlobalExplanation(newGlobalExplanation);
      setIsEditable((previsEditable) => true);
      sessionStorage.setItem(
        "globalExplanation",
        JSON.stringify([globalExplanation[1], data.userChosenFacetWeights])
      );
      console.log("User updated global explanation: ", data);
    } else {
      setIsEditable((previsEditable) => false);
    }
  };

  // added local storage to persist state on refresh
  useEffect(() => {
    if (state && state.books && state.query) {
      books_from_landing_page = state && state.books;
      q = state && state.query;
      console.log(
        "book recieved for landing page query: ",
        books_from_landing_page
      );
      setBooks(() => [...books_from_landing_page]);
      setCurrentQueryBook(() => q);

      // adding results to session storage
      sessionStorage.setItem("books", JSON.stringify(books_from_landing_page));
      sessionStorage.setItem(
        "filteredBooks",
        JSON.stringify(books_from_landing_page)
      );
      sessionStorage.setItem(
        "globalExplanation",
        JSON.stringify([
          globalExplanation[1],
          {
            genre_comb: 1.0,
            supersense: 1.0,
            gender: 1.0,
            panel_ratio: 1.0,
            comic_cover_img: 1.0,
            comic_cover_txt: 1.0,
          },
        ])
      );
      sessionStorage.setItem("hoveredBookList", JSON.stringify([]));
      sessionStorage.setItem("currentQueryBook", JSON.stringify(q));
      sessionStorage.setItem(
        "relevanceFeedbackExplanation",
        JSON.stringify(initial_chips)
      );
    } else {
      console.log("page refreshed");

      // get values from session storage
      //setBooks(() => [...books]);
      setBooks(() => [...JSON.parse(sessionStorage.getItem("books"))]);
      setHoveredBookList(() => [
        ...JSON.parse(sessionStorage.getItem("hoveredBookList")),
      ]);
      setFilteredBooks(() => [
        ...JSON.parse(sessionStorage.getItem("filteredBooks")),
      ]);
      setCurrentQueryBook(() =>
        JSON.parse(sessionStorage.getItem("currentQueryBook"))
      );
      setGlobalExplanation(() =>
        JSON.parse(sessionStorage.getItem("globalExplanation"))
      );
      setSearchBarInput(() =>
        JSON.parse(sessionStorage.getItem("searchBarInput"))
      );
      setRelevanceFeedbackExplanation(() =>
        JSON.parse(sessionStorage.getItem("relevanceFeedbackExplanation"))
      );
      console.log("states refreshed");
    }
    // state = null;
  }, []);

  useEffect(() => {
    if (
      searchBarInput &&
      searchBarInput.typedQuery &&
      searchBarInput.clickedQuery
    ) {
      console.log("useeffect searchBarSelectedData: ", searchBarInput);
      var queryBook = searchBarInput.clickedQuery;
      handleSearchBarQueryClick(queryBook);
      console.log("state of books: ", books);
    }
  }, [searchBarInput]);

  useEffect(() => {
    console.log("state has changed unique, initalized states");
  }, []);

  useEffect(() => {
    console.log(relevanceFeedbackExplanation);
  }, [relevanceFeedbackExplanation]);

  //detect refresh event and alert user
  useEffect(() => {
    window.onbeforeunload = function () {
      console.log(
        "detected page refresh, initiaalizing states from session storage"
      );

      return true;
    };

    return () => {
      console.log("window null setting");
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <div className="app-container">
      {/* <div className="nav-bar">
        <HomeLogo />
        <div className="search-container">
          <SearchContainer getUserInputsFromSearchBar={ProcessSearchBarInput} />
        </div>
      </div> */}
      <div className="main-screen">
        <div className="book-grid">
          {books &&
            books.slice(0, 15).map((book) => (
              <Link
                key={book.id}
                className="link"
                to={{ pathname: `/search/${book.comic_no}` }}
                state={{ book: book }}
                exact="true"
              >
                <div
                  key={book.id}
                  className="book"
                  onMouseEnter={() => handleMouseEnter(book)}
                  onMouseLeave={() => handleMouseLeave()}
                  onClick={() => handleClick(book)}
                  style={
                    currentQueryBook === book.id
                      ? { border: "3px solid blue" }
                      : {}
                  }
                >
                  <img
                    key={book.id}
                    src={
                      img_folderpath + "original_" + book.comic_no + "_1.jpeg"
                    }
                    alt={book.book_title}
                    className="imageLarge"
                    style={
                      book.query_book === true
                        ? { border: "7px solid blue" }
                        : {}
                    }
                  />
                  {hoveredBook === book && showOverlay && (
                    <div className="book-overlay">
                      {/* <p>genre - {book.genre.split("|").join(", ")}</p> */}
                      <p>
                        {Array.from(book.genre.split("|")).map(
                          (genre_str, index) => (
                            <Tooltip
                              key={`${book.comic_no}-${index}`}
                              title="genre"
                            >
                              <Chip
                                key={`${book.comic_no}-${index}`}
                                label={genre_str}
                                color={"default"}
                                style={{
                                  margin: "5px",
                                  flexWrap: "wrap",
                                  fontSize: 18,
                                }}
                              />
                            </Tooltip>
                          )
                        )}
                      </p>
                      <p>
                        {FACET_KEYS.map((key) =>
                          Array.from(localExplanation[3][key]).map(
                            (facet_str, index) => (
                              <Tooltip
                                key={`${book.comic_no}-${index}`}
                                title={key}
                              >
                                <Chip
                                  key={`${book.comic_no}-${index}`}
                                  label={facet_str}
                                  color={"primary"}
                                  style={{ margin: "5px", flexWrap: "wrap" }}
                                />
                              </Tooltip>
                            )
                          )
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
        </div>
        <div className="side-bar-container">
          <div>
            {currentQueryBook && (
              <p style={{ color: "rgb(255, 99, 132)" }}>
                Your Selection: {currentQueryBook.book_title} -{" "}
                {currentQueryBook.id}
              </p>
            )}
            {hoveredBook && (
              <p style={{ color: "rgb(53, 162, 235)" }}>
                Your Interest: {hoveredBook.book_title} - {hoveredBook.id}
              </p>
            )}
          </div>

          {/* <div className="global-explanation-container">
            <BarchartApp global_explanations_lst={globalExplanation} />
          </div> */}

          <div className="global-explanation-container">
            {/* <BarchartApp global_explanations_lst={globalExplanation} /> */}
            <div className="global-explanation-slider">
              <GlobalExplanationSliderGrid
                inputData={globalExplanation[1]}
                onSubmit={handleGlobalExplanationSliderSubmit}
              />
            </div>

            <div className="global-explanation-chips">
              <section className="content">
                <ExplanationChips inputData={relevanceFeedbackExplanation} />
              </section>
            </div>
          </div>

          <div className="local-explanation-container">
            <StoryPaceExplanation story_pace={localExplanation} />
            {/* <div>
              <FacetKeywordsComp facets={localExplanation} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookGrid;
