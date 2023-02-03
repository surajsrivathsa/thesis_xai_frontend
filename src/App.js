import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import BarchartApp from "./components/global_explanation";

const DUMMY_BOOKS = [
  {
    id: 0,
    comic_no: 1,
    book_title: "X-Men",
    year: 1964,
    genre: "Superhero",
    genre_comb: 0.1,
    supersense: 0.1,
    gender: 0.1,
    panel_ratio: 0.1,
  },
  {
    id: 1,
    comic_no: 2,
    book_title: "BatMan",
    year: 1943,
    genre: "Superhero|Detective",
    genre_comb: 0.1,
    supersense: 0.1,
    gender: 0.1,
    panel_ratio: 0.1,
  },
  {
    id: 2,
    comic_no: 3,
    book_title: "Wonder woman",
    year: 1955,
    genre: "Superhero|Action",
    genre_comb: 0.1,
    supersense: 0.1,
    gender: 0.1,
    panel_ratio: 0.1,
  },
  {
    id: 3,
    comic_no: 4,
    book_title: "Tin-Tin",
    year: 1922,
    genre: "Adventure|Detective|Action",
    genre_comb: 0.1,
    supersense: 0.1,
    gender: 0.1,
    panel_ratio: 0.1,
  },
];

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

    retrieveImage(book.book_title);
  }, [book.book_title]);

  return (
    <div
      // style={{
      //   border: "1px solid black",
      //   padding: "10px",
      //   cursor: "pointer",
      //   margin: "10px",
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "center",
      // }}
      className="book-object"
      onClick={onClick}
    >
      {image ? <img src={image} alt={book.book_title} /> : null}
      <div>Name: {book.book_title}</div>
      <div>Genre: {book.genre}</div>
      <button onClick={() => handleQuerySeedClick(book)}>
        Query Seed
      </button>{" "}
      {/* <button
        style={{ marginTop: "10px" }}
        onClick={() => {
          axios
            .get(
              `http://localhost:8000/book?b_id=${book.comic_no}&generate_fake_clicks=true`
            )
            .then((res) => {
              console.log(res.data);
            });
        }}
      >
        Query Seed
      </button> */}
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
      genre_comb: 0.1,
      supersense: 0.1,
      gender: 0.1,
      panel_ratio: 0.1,
    },
    {
      genre_comb: 0.1,
      supersense: 0.1,
      gender: 0.1,
      panel_ratio: 0.1,
    },
  ]);
  const history = useNavigate();

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const handleBookClick = (book) => {
    setClickedBook(book);
    setCurrentWindowClickedBookList([...currentWindowClickedBookList, book]); // add clicked books in current window to list, to be used for machine learning in backend
  };

  const handleQuerySeedClick = (book) => {
    setCurrentQueryBook(book);
    console.log("clicked comic ", book.comic_no);
    axios
      .get(
        "http://localhost:8000/book?b_id=" +
          book.comic_no +
          "&generate_fake_clicks=true"
      )
      .then((response) => {
        console.log(
          "clicked books in previous window ",
          currentWindowClickedBookList
        );
        setCurrentWindowClickedBookList([book]); // clear the current window and set clicked list as query book
        console.log(response);
        console.log("current clicked book list ", currentWindowClickedBookList);
        setBooks(response.data[0]);
        setFilteredBooks(response.data[0]);
        setGlobalExplanation([globalExplanation[1], response.data[1]]);
        console.log("New Global Explanation: ", globalExplanation);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="app-container">
      <div className="nav-bar">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for books by name or genre"
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="global-explanation-container">
        <p>Lorem Ipsum</p>
        <BarchartApp global_explanations_lst={globalExplanation} />
      </div>
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
            >
              {/* <p>{book.book_title}</p>
              <p>{book.genre}</p>
              <button onClick={() => handleQuerySeedClick(book)}>
                Query Seed
              </button> */}
            </Book>
          ))}
      </div>
      <div className="side-bar-container">
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
    </div>
  );
}

export default MainPage;
