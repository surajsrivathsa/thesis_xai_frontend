import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import BarchartApp from "./components/global_explanation";
import LinechartApp from "./components/local_explanation";
import SearchContainer from "./components/search_bar";
import { SEARCHBAR_BOOKS, DUMMY_BOOKS } from "./components/constants";

// const DUMMY_BOOKS = [
//   {
//     id: 0,
//     comic_no: 1665,
//     book_title: "X-Men",
//     year: 1964,
//     genre: "Superhero",
//     genre_comb: 1.0,
//     supersense: 1.0,
//     gender: 1.0,
//     panel_ratio: 1.0,
//     comic_cover_img: 1.0,
//     comic_cover_txt: 1.0,
//   },
//   {
//     id: 1,
//     comic_no: 637,
//     book_title: "BatMan",
//     year: 1943,
//     genre: "Superhero|Detective",
//     genre_comb: 1.0,
//     supersense: 1.0,
//     gender: 1.0,
//     panel_ratio: 1.0,
//     comic_cover_img: 1.0,
//     comic_cover_txt: 1.0,
//   },
//   {
//     id: 2,
//     comic_no: 1661,
//     book_title: "Wonder woman",
//     year: 1955,
//     genre: "Superhero|Action",
//     genre_comb: 1.0,
//     supersense: 1.0,
//     gender: 1.0,
//     panel_ratio: 1.0,
//     comic_cover_img: 1.0,
//     comic_cover_txt: 1.0,
//   },
//   {
//     id: 3,
//     comic_no: 1640,
//     book_title: "Tin-Tin",
//     year: 1922,
//     genre: "Adventure|Detective|Action",
//     genre_comb: 1.0,
//     supersense: 1.0,
//     gender: 1.0,
//     panel_ratio: 1.0,
//     comic_cover_img: 1.0,
//     comic_cover_txt: 1.0,
//   },
// ];

const img_folderpath = "../comic_book_covers_ui/"; ///process.env.PUBLIC_URL + Users/surajshashidhar/Downloads/comic_book_covers_ui";

const Book = ({ book, onClick, handleQuerySeedClick }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const retrieveImage = async (book) => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?query=${book.book_title}&client_id=CGhIP6DeLSlR_gRf5_RBQdxTQOzV_tzZOC0A95KFcFU`
        );
        const imageUrl = response.data.results[0].urls.regular;
        setImage(imageUrl);
      } catch (error) {
        console.error(error);
      }
    };

    const retrieveImageFromLocal = async (book) => {
      try {
        setImage(img_folderpath + "original_" + book.comic_no + "_1.jpeg");
      } catch (error) {
        retrieveImage(book);
        console.error(image, error);
      }
    };
    // console.log("image: ", image);
    retrieveImageFromLocal(book);
    // console.log("image: ", image);
  }, [book]);

  return (
    <div>
      <div className="book-object" onClick={onClick}>
        {image ? (
          <img src={image} alt={book.book_title} className="book-object" />
        ) : null}
        <button
          onClick={() => handleQuerySeedClick(book)}
          className="query-seed-button"
        >
          Query
        </button>{" "}
      </div>
    </div>
  );
};

function MainPage() {
  const [searchValue, setSearchValue] = useState("");
  const [books, setBooks] = useState(DUMMY_BOOKS);
  const [clickedBook, setClickedBook] = useState({});
  const [currentWindowClickedBookList, setCurrentWindowClickedBookList] =
    useState([]);
  const [currentQueryBook, setCurrentQueryBook] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [globalExplanation, setGlobalExplanation] = useState([
    {
      genre_comb: 1.0,
      supersense: 1.0,
      gender: 1.0,
      panel_ratio: 1.0,
    },
    {
      genre_comb: 1.0,
      supersense: 1.0,
      gender: 1.0,
      panel_ratio: 1.0,
    },
  ]);
  const [searchBarInput, setSearchBarInput] = useState({
    typedQuery: "",
    clickedQuery: {},
  });
  const [localExplanation, setLocalExplanation] = useState([
    [3, 5, 3, 2, 8],
    [1, 2, 5, 4, 3, 8, 2],
    {
      Who: [""],
      What: [""],
      When: [""],
      Why: [""],
      Where: [""],
      How: [""],
    },
    {
      Who: [""],
      What: [""],
      When: [""],
      Why: [""],
      Where: [""],
      How: [""],
    },
    ["Comic Book Cover"],
    ["Comic Book Cover"],
  ]);

  const history = useNavigate();

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const handleBookClick = (book) => {
    setClickedBook(book);
    const clicked_book = { ...book };
    clicked_book.clicked = 1.0;
    setCurrentWindowClickedBookList([
      ...currentWindowClickedBookList,
      clicked_book,
    ]); // add clicked books in current window to list, to be used for machine learning in backend

    var localExplanationInfoJSON = {
      selected_book_lst: [currentQueryBook, clicked_book],
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
  };

  const handleQuerySeedClick = (book) => {
    setCurrentQueryBook(book);

    // find uninterested books which were not clicked by user
    var unInterestedBookList = books
      .filter(
        ({ comic_no: id1 }) =>
          !currentWindowClickedBookList.some(({ comic_no: id2 }) => id2 === id1)
      )
      .map((e) => {
        e.clicked = 0.0;
        return e;
      });

    // remove duplicate clicks
    var allBookInteractionInfoList = [...currentWindowClickedBookList];
    var allBookInteractionInfoUniqList = [
      ...new Map(
        allBookInteractionInfoList.map((v) => [v.comic_no, v])
      ).values(),
    ];

    // add unlicked and clicked books
    var allBookInteractionInfoJSON = {
      clicked_book_lst: [
        ...allBookInteractionInfoUniqList,
        ...unInterestedBookList,
      ],
    };
    console.log("all interaction info books ", allBookInteractionInfoJSON);
    axios
      .post(
        "http://localhost:8000/book_search?b_id=" +
          book.comic_no +
          "&generate_fake_clicks=false",
        allBookInteractionInfoJSON,
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
        // console.log(
        //   "clicked books in previous window ",
        //   currentWindowClickedBookList
        // );
        setCurrentWindowClickedBookList([book]); // clear the current window and set clicked list as query book
        // console.log(response);
        // console.log("current clicked book list ", currentWindowClickedBookList);
        setBooks(response.data[0]);
        setFilteredBooks(response.data[0]);
        setGlobalExplanation([globalExplanation[1], response.data[1]]);
        console.log("New Global Explanation: ", globalExplanation);
      })
      .catch((error) => {
        console.log(error);
      });

    // set selected query book as clicked book
    handleBookClick(book);
  };

  const handleSearchBarQueryClick = (clickedQuery) => {
    var searchBarQuery = { ...clickedQuery };
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
        if (searchBarQuery.type === "book") {
          setCurrentWindowClickedBookList([
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
            },
          ]); // clear the current window and set clicked list as query book
        }

        // console.log(response);
        // console.log("current clicked book list ", currentWindowClickedBookList);
        setBooks(response.data[0]);
        setFilteredBooks(response.data[0]);
        setGlobalExplanation([globalExplanation[1], response.data[1]]);
        console.log("New Global Explanation: ", globalExplanation);
      })
      .catch((error) => {
        console.log(error);
      });

    if (searchBarQuery.type === "book") {
      // set selected query book as clicked book
      handleBookClick({
        id: searchBarQuery.id,
        comic_no: searchBarQuery.comic_no,
        book_title: searchBarQuery.book_title,
        genre: "",
        year: 1950,
        genre_comb: 1.0,
        supersense: 1.0,
        gender: 1.0,
        panel_ratio: 1.0,
      });
    }
  };

  useEffect(() => {
    console.log("useeffect searchBarSelectedData: ", searchBarInput);
    var queryBook = searchBarInput.clickedQuery;
    handleSearchBarQueryClick(searchBarInput.clickedQuery);
  }, [searchBarInput]);

  useEffect(() => {
    console.log("state has changed unique, initalized states");
  }, []);

  const ProcessSearchBarInput = (searchBarSelectedData) => {
    console.log("received form search bar: ", searchBarInput);
    setSearchBarInput(searchBarSelectedData);

    console.log("searchBarInput: ", searchBarInput);
  };

  return (
    <div className="app-container">
      <div className="nav-bar">
        <div className="search-container">
          <SearchContainer getUserInputsFromSearchBar={ProcessSearchBarInput} />
        </div>
      </div>

      {/* 
        <div className="global-explanation-container">
        <p>Lorem Ipsum</p> }
        <BarchartApp global_explanations_lst={globalExplanation} />
      </div>
      */}
      <div className="main-screen">
        <div className="grid-container">
          {books
            .filter((book) => {
              return (
                book.book_title
                  .toLowerCase()
                  .includes(searchValue.toLowerCase()) ||
                book.genre.toLowerCase().includes(searchValue.toLowerCase())
              );
            })
            .map((book, index) => (
              <Book
                className="book-container"
                style={{ border: "1px solid black" }}
                key={index}
                onClick={() => handleBookClick(book)}
                book={book}
                handleQuerySeedClick={handleQuerySeedClick}
              />
            ))}
        </div>
        <div className="side-bar-container">
          <div>
            {currentQueryBook && (
              <p>
                Current Query Seed: {currentQueryBook.book_title} -{" "}
                {currentQueryBook.genre}
              </p>
            )}
            {clickedBook && (
              <p>
                Clicked Book: {clickedBook.book_title} - {clickedBook.genre}
              </p>
            )}
          </div>

          <div className="global-explanation-container">
            <BarchartApp global_explanations_lst={globalExplanation} />
          </div>

          <div className="local-explanation-container">
            <LinechartApp story_pace={localExplanation} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
